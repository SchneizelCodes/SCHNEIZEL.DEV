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
    <div className="space-y-4 font-mono">
      {/* Telemetry Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 rounded-sm bg-slate-950/80 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-slate-400">BTC/USD SIM:</span>
          </div>
          <span
            className={`text-lg font-bold ${
              trend === "up" ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            ${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => injectShock("buy")}
            className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-sm bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/60 transition-colors cursor-pointer"
          >
            <Zap className="w-3 h-3" />
            <span>+ BUY SHOCK</span>
          </button>
          <button
            onClick={() => injectShock("sell")}
            className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-sm bg-rose-950/60 border border-rose-500/40 text-rose-400 hover:bg-rose-900/60 transition-colors cursor-pointer"
          >
            <Zap className="w-3 h-3" />
            <span>- SELL SHOCK</span>
          </button>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-1.5 rounded-sm bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={isRunning ? "Pause" : "Play"}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 60fps Hardware Accelerated HTML5 Canvas */}
      <div className="relative rounded-sm overflow-hidden border border-cyan-500/20 shadow-inner">
        <canvas
          ref={canvasRef}
          width={800}
          height={320}
          className="w-full h-[280px] block"
        />
        <div className="absolute top-2 left-2 text-[10px] text-slate-500 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
          TICK_ENGINE // 60 FPS CLAMPED
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-slate-950/60 rounded-sm border border-slate-800 text-xs">
        <div className="flex items-center justify-between gap-3">
          <span className="text-slate-400">VOLATILITY BURST:</span>
          <input
            type="range"
            min="0.5"
            max="4.5"
            step="0.1"
            value={volatility}
            onChange={(e) => setVolatility(Number(e.target.value))}
            className="w-32 accent-cyan-400 cursor-pointer"
          />
          <span className="text-cyan-400 font-bold w-8 text-right">{volatility}x</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-slate-400">TICK FREQUENCY:</span>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-32 accent-cyan-400 cursor-pointer"
          />
          <span className="text-cyan-400 font-bold w-12 text-right">{speed}ms</span>
        </div>
      </div>
    </div>
  );
}