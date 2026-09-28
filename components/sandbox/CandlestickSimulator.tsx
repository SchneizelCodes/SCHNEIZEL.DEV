"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, RefreshCw, Zap, TrendingUp } from "lucide-react";

interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export function CandlestickSimulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const [isRunning, setIsRunning] = useState(true);
  const [volatility, setVolatility] = useState(1.8);
  const [speed, setSpeed] = useState(30); // ms per tick
  const [price, setPrice] = useState(64250.0);
  const [trend, setTrend] = useState<"up" | "down">("up");

  // Keep internal simulation state
  const candlesRef = useRef<Candle[]>([]);
  const currentCandleRef = useRef<Candle>({
    time: Date.now(),
    open: 64250,
    high: 64250,
    low: 64250,
    close: 64250,
    volume: 10,
  });

  // Initialize seed candles
  useEffect(() => {
    let p = 64000;
    const initialCandles: Candle[] = [];
    for (let i = 0; i < 40; i++) {
      const open = p;
      const change = (Math.random() - 0.49) * 45;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * 20;
      const low = Math.min(open, close) - Math.random() * 20;
      initialCandles.push({
        time: i,
        open,
        high,
        low,
        close,
        volume: Math.floor(Math.random() * 80) + 15,
      });
      p = close;
    }
    candlesRef.current = initialCandles;
    currentCandleRef.current = {
      time: 40,
      open: p,
      high: p,
      low: p,
      close: p,
      volume: 10,
    };
    setPrice(p);
  }, []);

  // Tick simulation loop
  useEffect(() => {
    if (!isRunning) return;

    let tickCount = 0;
    const interval = setInterval(() => {
      tickCount++;
      const delta = (Math.random() - 0.49) * volatility * 8;
      const cur = currentCandleRef.current;
      const newClose = cur.close + delta;

      cur.close = newClose;
      cur.high = Math.max(cur.high, newClose);
      cur.low = Math.min(cur.low, newClose);
      cur.volume += Math.floor(Math.random() * 5) + 1;

      setPrice(Number(newClose.toFixed(2)));
      setTrend(newClose >= cur.open ? "up" : "down");

      // Complete candle every 14 ticks
      if (tickCount % 14 === 0) {
        candlesRef.current.push({ ...cur });
        if (candlesRef.current.length > 50) {
          candlesRef.current.shift();
        }
        currentCandleRef.current = {
          time: Date.now(),
          open: newClose,
          high: newClose,
          low: newClose,
          close: newClose,
          volume: 5,
        };
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isRunning, volatility, speed]);

  // High-DPI 60fps Canvas Render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Clear dark industrial background
      ctx.fillStyle = "#05080f";
      ctx.fillRect(0, 0, width, height);

      const allCandles = [...candlesRef.current, currentCandleRef.current];
      if (allCandles.length === 0) return;

      // Compute dynamic min/max price range for auto-scaling
      let minPrice = Infinity;
      let maxPrice = -Infinity;
      allCandles.forEach((c) => {
        if (c.low < minPrice) minPrice = c.low;
        if (c.high > maxPrice) maxPrice = c.high;
      });

      const padding = (maxPrice - minPrice) * 0.15 || 10;
      minPrice -= padding;
      maxPrice += padding;
      const priceRange = maxPrice - minPrice;

      const candleWidth = width / 55;
      const getY = (p: number) => height - ((p - minPrice) / priceRange) * height;

      // Draw subtle horizontal price gridlines
      ctx.strokeStyle = "rgba(30, 41, 59, 0.5)";
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        const y = (height / 5) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Render each Candlestick & Wick
      allCandles.forEach((c, idx) => {
        const x = idx * (candleWidth + 3) + 15;
        const openY = getY(c.open);
        const closeY = getY(c.close);
        const highY = getY(c.high);
        const lowY = getY(c.low);
        const isBullish = c.close >= c.open;

        const color = isBullish ? "#10b981" : "#ef4444";

        // Draw Wick
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(x + candleWidth / 2, highY);
        ctx.lineTo(x + candleWidth / 2, lowY);
        ctx.stroke();

        // Draw Body
        ctx.fillStyle = color;
        const bodyHeight = Math.max(Math.abs(closeY - openY), 2);
        const bodyY = Math.min(openY, closeY);
        ctx.fillRect(x, bodyY, candleWidth, bodyHeight);
      });

      // Draw pulsating current price line
      const curY = getY(currentCandleRef.current.close);
      ctx.strokeStyle = "rgba(0, 240, 255, 0.75)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, curY);
      ctx.lineTo(width, curY);
      ctx.stroke();
      ctx.setLineDash([]);

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const injectShock = (direction: "buy" | "sell") => {
    const shockAmount = direction === "buy" ? 85 : -85;
    currentCandleRef.current.close += shockAmount;
    currentCandleRef.current.high = Math.max(currentCandleRef.current.high, currentCandleRef.current.close);
    currentCandleRef.current.low = Math.min(currentCandleRef.current.low, currentCandleRef.current.close);
    currentCandleRef.current.volume += 350;
  };

  return (
    <div className="space-y-4">
      {/* Telemetry Bar: WayWild Luxury Glass Container */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:px-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
        <div className="flex items-baseline gap-3">
          <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-white/50">
            BTC/USD SIM
          </span>
          <span
            className={`text-2xl sm:text-3xl font-display font-semibold tracking-tight transition-colors duration-300 ${
              trend === "up" ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            ${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => injectShock("buy")}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500 hover:text-slate-950 transition-all cursor-pointer shadow-sm"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>+ BUY SHOCK</span>
          </button>
          <button
            onClick={() => injectShock("sell")}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500 hover:text-slate-950 transition-all cursor-pointer shadow-sm"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>- SELL SHOCK</span>
          </button>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/15 text-white/80 hover:bg-white hover:text-slate-950 transition-all flex items-center justify-center cursor-pointer shadow-sm"
            title={isRunning ? "Pause" : "Play"}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>
        </div>
      </div>

      {/* 60fps Hardware Accelerated HTML5 Canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl">
        <canvas
          ref={canvasRef}
          width={800}
          height={320}
          className="w-full h-[280px] block"
        />
        <div className="absolute top-3 left-3 text-[10px] text-white/60 tracking-widest uppercase bg-white/5 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 font-sans">
          TICK ENGINE • 60 FPS CLAMPED
        </div>
      </div>

      {/* Interactive Controls: Frosted Pill Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-white/[0.02] rounded-2xl border border-white/10 text-xs font-sans">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/50">
            VOLATILITY BURST
          </span>
          <input
            type="range"
            min="0.5"
            max="4.5"
            step="0.1"
            value={volatility}
            onChange={(e) => setVolatility(Number(e.target.value))}
            className="w-32 accent-white cursor-pointer"
          />
          <span className="text-white font-semibold w-8 text-right font-mono">{volatility}x</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/50">
            TICK FREQUENCY
          </span>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-32 accent-white cursor-pointer"
          />
          <span className="text-white font-semibold w-12 text-right font-mono">{speed}ms</span>
        </div>
      </div>
    </div>
  );
}