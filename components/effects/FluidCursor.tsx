"use client";

import React, { useEffect, useRef } from "react";
import { useCommandCenterStore, CoreTheme } from "@/store/useCommandCenterStore";

interface FluidCursorProps {
  className?: string;
  intensity?: number;
  lifetimeSeconds?: number;
  curl?: number;
  radius?: number;
}

export function FluidCursor({
  className = "pointer-events-none fixed inset-0 z-10 w-full h-full",
  intensity = 1.0,
  lifetimeSeconds = 1.0, // Exactly 1.0s lifespan before fully evaporating to background
  curl = 30.0, // Tight swirling fluid eddies
  radius = 0.009, // Razor-thin, matched directly to cursor scale
}: FluidCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const coreTheme = useCommandCenterStore((state) => state.coreTheme);
  const atmosphere = useCommandCenterStore((state) => state.atmosphere);
  const mode = useCommandCenterStore((state) => state.mode);

  // Keep theme colors synchronized to the fluid engine in a ref
  const themeRef = useRef({ coreTheme, atmosphere, mode });
  useEffect(() => {
    themeRef.current = { coreTheme, atmosphere, mode };
  }, [coreTheme, atmosphere, mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // WebGL 2 context preferred for native float FBOs, with WebGL 1 fallback
    const gl = (canvas.getContext("webgl2", {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
    }) ||
      canvas.getContext("webgl", {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
      })) as WebGLRenderingContext | WebGL2RenderingContext | null;

    if (!gl) {
      console.warn("WebGL not supported for FluidCursor");
      return;
    }

    const isWebGL2 = "WebGL2RenderingContext" in window && gl instanceof WebGL2RenderingContext;

    // Enable floating point textures
    let halfFloatExt: any = null;
    let supportLinearFiltering: any = null;

    if (isWebGL2) {
      const gl2 = gl as WebGL2RenderingContext;
      gl2.getExtension("EXT_color_buffer_float");
      supportLinearFiltering = gl2.getExtension("OES_texture_float_linear");
    } else {
      halfFloatExt = gl.getExtension("OES_texture_half_float");
      gl.getExtension("OES_texture_half_float_linear");
      supportLinearFiltering = gl.getExtension("OES_texture_float_linear");
    }

    const halfFloatType = isWebGL2
      ? (gl as WebGL2RenderingContext).HALF_FLOAT
      : halfFloatExt
      ? halfFloatExt.HALF_FLOAT_OES
      : gl.UNSIGNED_BYTE;

    const rgbaInternalFormat = isWebGL2 ? (gl as WebGL2RenderingContext).RGBA16F : gl.RGBA;
    const rgInternalFormat = isWebGL2 ? (gl as WebGL2RenderingContext).RG16F : gl.RGBA;
    const rInternalFormat = isWebGL2 ? (gl as WebGL2RenderingContext).R16F : gl.RGBA;
    const rgFormat = isWebGL2 ? (gl as WebGL2RenderingContext).RG : gl.RGBA;
    const rFormat = isWebGL2 ? (gl as WebGL2RenderingContext).RED : gl.RGBA;

    // Shader compiler helper
    function createShader(type: number, source: string): WebGLShader {
      const shader = gl!.createShader(type)!;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
      }
      return shader;
    }

    function createProgram(vertexSource: string, fragmentSource: string): WebGLProgram {
      const program = gl!.createProgram()!;
      const vs = createShader(gl!.VERTEX_SHADER, vertexSource);
      const fs = createShader(gl!.FRAGMENT_SHADER, fragmentSource);
      gl!.attachShader(program, vs);
      gl!.attachShader(program, fs);
      gl!.linkProgram(program);
      if (!gl!.getProgramParameter(program, gl!.LINK_STATUS)) {
        console.error("Program link error:", gl!.getProgramInfoLog(program));
      }
      return program;
    }

    // Fullscreen Quad Geometry
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
      gl.STATIC_DRAW
    );

    const baseVertexShader = `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 uTexelSize;

      void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(uTexelSize.x, 0.0);
        vR = vUv + vec2(uTexelSize.x, 0.0);
        vT = vUv + vec2(0.0, uTexelSize.y);
        vB = vUv - vec2(0.0, uTexelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const splatShader = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float uAspectRatio;
      uniform vec3 uColor;
      uniform vec2 uPoint;
      uniform float uRadius;

      void main () {
        vec2 p = vUv - uPoint.xy;
        p.x *= uAspectRatio;
        vec3 splat = exp(-dot(p, p) / uRadius) * uColor;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
      }
    `;

    const advectionShader = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 uTexelSize;
      uniform float uDt;
      uniform float uDissipation;
      uniform float uBurnoff;

      void main () {
        vec2 coord = vUv - uDt * texture2D(uVelocity, vUv).xy * uTexelSize;
        vec4 val = texture2D(uSource, coord);
        // Linear burnoff prevents mathematical asymptotic haze so fluid clears completely to 0
        gl_FragColor = max(vec4(0.0), val * uDissipation - uBurnoff);
      }
    `;

    const curlShader = `
      precision highp float;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;

      void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
      }
    `;

    const vorticityShader = `
      precision highp float;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform float uCurlValue;
      uniform float uDt;

      void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;

        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= uCurlValue * C;
        force.y *= -1.0;

        vec2 vel = texture2D(uVelocity, vUv).xy;
        gl_FragColor = vec4(vel + force * uDt, 0.0, 1.0);
      }
    `;

    const divergenceShader = `
      precision highp float;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;

      void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;
        vec2 C = texture2D(uVelocity, vUv).xy;

        if (vL.x < 0.0) { L = -C.x; }
        if (vR.x > 1.0) { R = -C.x; }
        if (vT.y > 1.0) { T = -C.y; }
        if (vB.y < 0.0) { B = -C.y; }

        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `;

    const pressureShader = `
      precision highp float;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;

      void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `;

    const gradientSubtractShader = `
      precision highp float;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;

      void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `;

    const displayShader = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float uBloomIntensity;

      void main () {
        vec4 color = texture2D(uTexture, vUv);
        float luminance = max(color.r, max(color.g, color.b));
        
        // Strict cutoff threshold: guaranteed pure transparency when faded
        if (luminance <= 0.005) {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
          return;
        }

        float alpha = smoothstep(0.005, 0.35, luminance);
        vec3 finalColor = color.rgb * (1.0 + luminance * uBloomIntensity);
        gl_FragColor = vec4(finalColor * alpha, alpha);
      }
    `;

    // Compile programs
    const splatProg = createProgram(baseVertexShader, splatShader);
    const advectionProg = createProgram(baseVertexShader, advectionShader);
    const curlProg = createProgram(baseVertexShader, curlShader);
    const vorticityProg = createProgram(baseVertexShader, vorticityShader);
    const divergenceProg = createProgram(baseVertexShader, divergenceShader);
    const pressureProg = createProgram(baseVertexShader, pressureShader);
    const gradSubtractProg = createProgram(baseVertexShader, gradientSubtractShader);
    const displayProg = createProgram(baseVertexShader, displayShader);

    // Framebuffer Helper
    interface FBO {
      texture: WebGLTexture;
      fbo: WebGLFramebuffer;
      width: number;
      height: number;
      texelSizeX: number;
      texelSizeY: number;
      attach: (id: number) => number;
    }

    interface DoubleFBO {
      width: number;
      height: number;
      texelSizeX: number;
      texelSizeY: number;
      read: FBO;
      write: FBO;
      swap: () => void;
    }

    function createFBO(
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      filter: number
    ): FBO {
      gl!.activeTexture(gl!.TEXTURE0);
      const texture = gl!.createTexture()!;
      gl!.bindTexture(gl!.TEXTURE_2D, texture);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, filter);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, filter);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

      const fbo = gl!.createFramebuffer()!;
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
      gl!.framebufferTexture2D(
        gl!.FRAMEBUFFER,
        gl!.COLOR_ATTACHMENT0,
        gl!.TEXTURE_2D,
        texture,
        0
      );
      gl!.viewport(0, 0, w, h);
      gl!.clear(gl!.COLOR_BUFFER_BIT);

      return {
        texture,
        fbo,
        width: w,
        height: h,
        texelSizeX: 1.0 / w,
        texelSizeY: 1.0 / h,
        attach(id: number) {
          gl!.activeTexture(gl!.TEXTURE0 + id);
          gl!.bindTexture(gl!.TEXTURE_2D, texture);
          return id;
        },
      };
    }

    function createDoubleFBO(
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      filter: number
    ): DoubleFBO {
      let fbo1 = createFBO(w, h, internalFormat, format, type, filter);
      let fbo2 = createFBO(w, h, internalFormat, format, type, filter);

      return {
        width: w,
        height: h,
        texelSizeX: 1.0 / w,
        texelSizeY: 1.0 / h,
        get read() {
          return fbo1;
        },
        set read(val) {
          fbo1 = val;
        },
        get write() {
          return fbo2;
        },
        set write(val) {
          fbo2 = val;
        },
        swap() {
          const temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        },
      };
    }

    const simRes = 256;
    const dyeRes = 512;

    let density = createDoubleFBO(
      dyeRes,
      dyeRes,
      rgbaInternalFormat,
      gl.RGBA,
      halfFloatType,
      supportLinearFiltering ? gl.LINEAR : gl.NEAREST
    );

    let velocity = createDoubleFBO(
      simRes,
      simRes,
      rgInternalFormat,
      rgFormat,
      halfFloatType,
      supportLinearFiltering ? gl.LINEAR : gl.NEAREST
    );

    let divergence = createFBO(
      simRes,
      simRes,
      rInternalFormat,
      rFormat,
      halfFloatType,
      gl.NEAREST
    );

    let curlFBO = createFBO(
      simRes,
      simRes,
      rInternalFormat,
      rFormat,
      halfFloatType,
      gl.NEAREST
    );

    let pressure = createDoubleFBO(
      simRes,
      simRes,
      rInternalFormat,
      rFormat,
      halfFloatType,
      gl.NEAREST
    );

    // Blit helper
    function blit(target: FBO | null) {
      if (target === null) {
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
        gl!.viewport(0, 0, gl!.drawingBufferWidth, gl!.drawingBufferHeight);
      } else {
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, target.fbo);
        gl!.viewport(0, 0, target.width, target.height);
      }
      const positionAttr = 0;
      gl!.bindBuffer(gl!.ARRAY_BUFFER, quadBuffer);
      gl!.vertexAttribPointer(positionAttr, 2, gl!.FLOAT, false, 0, 0);
      gl!.enableVertexAttribArray(positionAttr);
      gl!.drawArrays(gl!.TRIANGLE_FAN, 0, 4);
    }

    // Splat injection function
    function splat(x: number, y: number, dx: number, dy: number, color: [number, number, number]) {
      const uRadius = radius * radius;

      // Inject Velocity
      gl!.useProgram(splatProg);
      gl!.uniform1i(gl!.getUniformLocation(splatProg, "uTarget"), velocity.read.attach(0));
      gl!.uniform1f(
        gl!.getUniformLocation(splatProg, "uAspectRatio"),
        canvas!.width / canvas!.height
      );
      gl!.uniform2f(gl!.getUniformLocation(splatProg, "uPoint"), x, y);
      gl!.uniform3f(gl!.getUniformLocation(splatProg, "uColor"), dx, dy, 0.0);
      gl!.uniform1f(gl!.getUniformLocation(splatProg, "uRadius"), uRadius * 1.5);
      blit(velocity.write);
      velocity.swap();

      // Inject Dye Density (Color)
      gl!.uniform1i(gl!.getUniformLocation(splatProg, "uTarget"), density.read.attach(0));
      gl!.uniform3f(
        gl!.getUniformLocation(splatProg, "uColor"),
        color[0] * intensity,
        color[1] * intensity,
        color[2] * intensity
      );
      gl!.uniform1f(gl!.getUniformLocation(splatProg, "uRadius"), uRadius);
      blit(density.write);
      density.swap();
    }

    // Pointer tracker
    let lastX = 0;
    let lastY = 0;
    let hasMoved = false;
    let colorCycle = 0;

    function getThemeColor(): [number, number, number] {
      const { coreTheme, atmosphere } = themeRef.current;
      colorCycle += 0.05;
      const wave = Math.sin(colorCycle) * 0.5 + 0.5;

      if (coreTheme === "amber" || atmosphere === "solarGold") {
        return [
          1.0,
          0.45 + wave * 0.4,
          0.05 + wave * 0.15,
        ];
      } else if (coreTheme === "emerald" || atmosphere === "matrixEmerald") {
        return [
          0.05 + wave * 0.2,
          1.0,
          0.4 + wave * 0.4,
        ];
      } else {
        return [
          0.0 + wave * 0.25,
          0.75 + wave * 0.25,
          1.0,
        ];
      }
    }

    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;

      if (!hasMoved) {
        lastX = x;
        lastY = y;
        hasMoved = true;
        return;
      }

      const dx = (x - lastX) * 12.0;
      const dy = (y - lastY) * 12.0;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 0.0005) {
        const color = getThemeColor();
        splat(x, y, dx * 16.0, dy * 16.0, color);
      }

      lastX = x;
      lastY = y;
    };

    const handlePointerDown = (e: PointerEvent | MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      const color = getThemeColor();
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4.0) * Math.PI * 2.0;
        const force = 12.0;
        splat(x, y, Math.cos(angle) * force, Math.sin(angle) * force, color);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    // Handle Window Resize
    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.floor(window.innerWidth * dpr);
      const height = Math.floor(window.innerHeight * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    }
    resize();
    window.addEventListener("resize", resize);

    // Main 60 FPS Fluid Simulation Loop
    let animationId: number;
    let lastTime = performance.now();

    // Calculate exact exponential decay coefficient for target lifetime in seconds:
    // After lifetimeSeconds, intensity reaches cutoff threshold and vanishes completely
    const dyeDecayRate = 4.8 / Math.max(lifetimeSeconds, 0.3);
    const velDecayRate = 4.0 / Math.max(lifetimeSeconds, 0.3);

    function step() {
      animationId = requestAnimationFrame(step);

      const now = performance.now();
      let dt = (now - lastTime) / 1000.0;
      lastTime = now;
      dt = Math.min(dt, 0.033);

      // 1. Curl & Vorticity Confinement
      gl!.useProgram(curlProg);
      gl!.uniform2f(gl!.getUniformLocation(curlProg, "uTexelSize"), velocity.read.texelSizeX, velocity.read.texelSizeY);
      gl!.uniform1i(gl!.getUniformLocation(curlProg, "uVelocity"), velocity.read.attach(0));
      blit(curlFBO);

      gl!.useProgram(vorticityProg);
      gl!.uniform2f(gl!.getUniformLocation(vorticityProg, "uTexelSize"), velocity.read.texelSizeX, velocity.read.texelSizeY);
      gl!.uniform1i(gl!.getUniformLocation(vorticityProg, "uVelocity"), velocity.read.attach(0));
      gl!.uniform1i(gl!.getUniformLocation(vorticityProg, "uCurl"), curlFBO.attach(1));
      gl!.uniform1f(gl!.getUniformLocation(vorticityProg, "uCurlValue"), curl);
      gl!.uniform1f(gl!.getUniformLocation(vorticityProg, "uDt"), dt);
      blit(velocity.write);
      velocity.swap();

      // 2. Divergence of Velocity
      gl!.useProgram(divergenceProg);
      gl!.uniform2f(gl!.getUniformLocation(divergenceProg, "uTexelSize"), velocity.read.texelSizeX, velocity.read.texelSizeY);
      gl!.uniform1i(gl!.getUniformLocation(divergenceProg, "uVelocity"), velocity.read.attach(0));
      blit(divergence);

      // 3. Pressure Poisson Solve (Jacobi Iteration)
      gl!.useProgram(pressureProg);
      gl!.uniform2f(gl!.getUniformLocation(pressureProg, "uTexelSize"), velocity.read.texelSizeX, velocity.read.texelSizeY);
      gl!.uniform1i(gl!.getUniformLocation(pressureProg, "uDivergence"), divergence.attach(1));

      for (let i = 0; i < 16; i++) {
        gl!.uniform1i(gl!.getUniformLocation(pressureProg, "uPressure"), pressure.read.attach(0));
        blit(pressure.write);
        pressure.swap();
      }

      // 4. Gradient Subtraction
      gl!.useProgram(gradSubtractProg);
      gl!.uniform2f(gl!.getUniformLocation(gradSubtractProg, "uTexelSize"), velocity.read.texelSizeX, velocity.read.texelSizeY);
      gl!.uniform1i(gl!.getUniformLocation(gradSubtractProg, "uPressure"), pressure.read.attach(0));
      gl!.uniform1i(gl!.getUniformLocation(gradSubtractProg, "uVelocity"), velocity.read.attach(1));
      blit(velocity.write);
      velocity.swap();

      // 5. Advection with Time-Accurate Decay & Tail Burnoff
      gl!.useProgram(advectionProg);
      gl!.uniform2f(gl!.getUniformLocation(advectionProg, "uTexelSize"), velocity.read.texelSizeX, velocity.read.texelSizeY);
      gl!.uniform1i(gl!.getUniformLocation(advectionProg, "uVelocity"), velocity.read.attach(0));
      gl!.uniform1i(gl!.getUniformLocation(advectionProg, "uSource"), velocity.read.attach(0));
      gl!.uniform1f(gl!.getUniformLocation(advectionProg, "uDt"), dt);
      gl!.uniform1f(gl!.getUniformLocation(advectionProg, "uDissipation"), Math.exp(-dt * velDecayRate));
      gl!.uniform1f(gl!.getUniformLocation(advectionProg, "uBurnoff"), 0.0);
      blit(velocity.write);
      velocity.swap();

      // Advect Dye Density with exact ~1s evaporation
      gl!.uniform2f(gl!.getUniformLocation(advectionProg, "uTexelSize"), density.read.texelSizeX, density.read.texelSizeY);
      gl!.uniform1i(gl!.getUniformLocation(advectionProg, "uVelocity"), velocity.read.attach(0));
      gl!.uniform1i(gl!.getUniformLocation(advectionProg, "uSource"), density.read.attach(1));
      gl!.uniform1f(gl!.getUniformLocation(advectionProg, "uDissipation"), Math.exp(-dt * 4.8));
      gl!.uniform1f(gl!.getUniformLocation(advectionProg, "uBurnoff"), dt * 0.12);
      blit(density.write);
      density.swap();

      // 6. Display Render to Screen with direct buffer clearing
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
      gl!.viewport(0, 0, gl!.drawingBufferWidth, gl!.drawingBufferHeight);
      gl!.clearColor(0.0, 0.0, 0.0, 0.0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.disable(gl!.BLEND); // Direct overwrite completely eliminates ghosting

      gl!.useProgram(displayProg);
      gl!.uniform1i(gl!.getUniformLocation(displayProg, "uTexture"), density.read.attach(0));
      gl!.uniform1f(gl!.getUniformLocation(displayProg, "uBloomIntensity"), 0.45);

      const positionAttr = 0;
      gl!.bindBuffer(gl!.ARRAY_BUFFER, quadBuffer);
      gl!.vertexAttribPointer(positionAttr, 2, gl!.FLOAT, false, 0, 0);
      gl!.enableVertexAttribArray(positionAttr);
      gl!.drawArrays(gl!.TRIANGLE_FAN, 0, 4);
    }

    step();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("resize", resize);
    };
  }, [intensity, lifetimeSeconds, curl, radius]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        mixBlendMode: "screen",
        filter: "none",
      }}
    />
  );
}
