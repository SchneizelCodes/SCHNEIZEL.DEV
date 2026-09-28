"use client";

import { useState } from "react";
import { Play, ArrowRight, Bot, Database, Mail, Webhook } from "lucide-react";

interface LogEntry {
  timestamp: string;
  node: string;
  message: string;
  duration: string;
}

export function WorkflowInspector() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      timestamp: "12:00:01.042",
      node: "WEBHOOK",
      message: "Listening on POST /api/v1/event-relay",
      duration: "0ms",
    },
  ]);

  const runPipeline = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(0);

    const steps = [
      { node: "WEBHOOK_INGEST", msg: "Payload verified & parsed from Stripe relay", dur: "12ms" },
      { node: "GEMINI_AI_REASONING", msg: "Dispatched prompt to Gemini 1.5 Flash: Extracted metadata & structured JSON", dur: "148ms" },
      { node: "SUPABASE_RLS_WRITE", msg: "Record inserted into orders table with Row-Level Security", dur: "34ms" },
      { node: "RESEND_SMTP_RELAY", msg: "Delivered transactional email dispatch to client inbox", dur: "82ms" },
    ];

    for (let i = 0; i < steps.length; i++) {
      setActiveStep(i);
      await new Promise((r) => setTimeout(r, 650));
      const s = steps[i];
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`;
      setLogs((prev) => [
        ...prev,
        {
          timestamp: timeStr,
          node: s.node,
          message: s.msg,
          duration: s.dur,
        },
      ]);
    }

    setActiveStep(4);
    await new Promise((r) => setTimeout(r, 500));
    setIsRunning(false);
  };

  const NODES = [
    { title: "Webhook Ingest", icon: Webhook, desc: "HMAC Signed" },
    { title: "Gemini AI Node", icon: Bot, desc: "JSON Structuring" },
    { title: "Supabase DB", icon: Database, desc: "RLS Protection" },
    { title: "Resend SMTP", icon: Mail, desc: "Delivery < 100ms" },
  ];

  return (
    <div className="space-y-6">
      
      {/* Node Graph Visualization: Luxury Frosted Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {NODES.map((node, i) => {
            const Icon = node.icon;
            const isCurrent = activeStep === i;
            const isCompleted = activeStep > i;

            return (
              <div key={i} className="flex items-center gap-3 w-full md:w-auto">
                <div
                  className={`flex-1 md:flex-initial p-5 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center min-w-[150px] ${
                    isCurrent
                      ? "bg-white text-slate-950 border-white shadow-[0_0_30px_rgba(255,255,255,0.4)] scale-105"
                      : isCompleted
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : "bg-white/[0.02] border-white/10 text-white/50"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 mb-2.5 transition-colors ${
                      isCurrent
                        ? "text-slate-950"
                        : isCompleted
                        ? "text-emerald-400"
                        : "text-white/40"
                    }`}
                  />
                  <span className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isCurrent ? "text-slate-950" : "text-white"}`}>
                    {node.title}
                  </span>
                  <span className={`text-[10px] tracking-wide ${isCurrent ? "text-slate-600" : "text-white/40"}`}>
                    {node.desc}
                  </span>
                </div>

                {i < NODES.length - 1 && (
                  <ArrowRight
                    className={`hidden md:block w-4 h-4 transition-colors ${
                      activeStep > i ? "text-emerald-400" : "text-white/20"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Trigger Button & Status: WayWild Solid Pill Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={runPipeline}
          disabled={isRunning}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.2)] ${
            isRunning
              ? "bg-white/20 text-white/50 cursor-not-allowed border border-white/10"
              : "bg-white text-slate-950 hover:bg-slate-200"
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isRunning ? "PIPELINE EXECUTING..." : "DISPATCH SIMULATED PAYLOAD"}</span>
        </button>

        <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-white/50">
          FLOW ENGINE • EVENT DRIVEN ASYNC
        </span>
      </div>

      {/* Execution Telemetry Log Box: Frosted Glass Panel */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl space-y-2.5 max-h-[190px] overflow-y-auto">
        <div className="text-[10px] font-sans tracking-[0.2em] uppercase text-white/40 mb-3">
          EXECUTION DIAGNOSTICS STREAM
        </div>
        {logs.map((log, idx) => (
          <div key={idx} className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="text-white/30 text-[10px]">{log.timestamp}</span>
            <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-white text-[10px] font-bold">
              {log.node}
            </span>
            <span className="text-white/70 flex-1">{log.message}</span>
            <span className="text-emerald-400 font-semibold">{log.duration}</span>
          </div>
        ))}
      </div>

    </div>
  );
}