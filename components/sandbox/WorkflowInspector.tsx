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
    <div className="space-y-6 font-mono text-xs">
      
      {/* Node Graph Visualization */}
      <div className="p-6 rounded-sm bg-slate-950/80 border border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {NODES.map((node, i) => {
            const Icon = node.icon;
            const isCurrent = activeStep === i;
            const isCompleted = activeStep > i;

            return (
              <div key={i} className="flex items-center gap-3 w-full md:w-auto">
                <div
                  className={`flex-1 md:flex-initial p-4 rounded-sm border transition-all duration-300 flex flex-col items-center text-center min-w-[140px] ${
                    isCurrent
                      ? "bg-cyan-950/80 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-105"
                      : isCompleted
                      ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                      : "bg-slate-900/60 border-slate-800 text-slate-400"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 mb-2 ${
                      isCurrent
                        ? "text-cyan-400 animate-bounce"
                        : isCompleted
                        ? "text-emerald-400"
                        : "text-slate-500"
                    }`}
                  />
                  <span className="font-bold text-white mb-0.5">{node.title}</span>
                  <span className="text-[10px] text-slate-400">{node.desc}</span>
                </div>

                {i < NODES.length - 1 && (
                  <ArrowRight
                    className={`hidden md:block w-4 h-4 transition-colors ${
                      activeStep > i ? "text-emerald-400" : "text-slate-700"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Trigger Button & Status */}
      <div className="flex items-center justify-between">
        <button
          onClick={runPipeline}
          disabled={isRunning}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-sm font-bold text-xs transition-all cursor-pointer ${
            isRunning
              ? "bg-slate-800 text-slate-500 cursor-not-allowed"
              : "bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isRunning ? "PIPELINE EXECUTING..." : "DISPATCH SIMULATED PAYLOAD"}</span>
        </button>

        <span className="text-slate-500 text-[11px]">
          FLOW_ENGINE: EVENT_DRIVEN // ASYNC
        </span>
      </div>

      {/* Execution Telemetry Log Box */}
      <div className="p-4 rounded-sm bg-[#05080f] border border-slate-800 space-y-2 max-h-[180px] overflow-y-auto">
        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">
          Execution Diagnostics Stream:
        </div>
        {logs.map((log, idx) => (
          <div key={idx} className="flex items-center gap-3 text-[11px]">
            <span className="text-slate-600">{log.timestamp}</span>
            <span className="text-cyan-400 font-bold">[{log.node}]</span>
            <span className="text-slate-300 flex-1">{log.message}</span>
            <span className="text-emerald-400 font-bold">{log.duration}</span>
          </div>
        ))}
      </div>

    </div>
  );
}