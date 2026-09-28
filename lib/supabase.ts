import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Export client only if configured, otherwise null to prevent runtime crashes
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Helper to log telemetry visitor hits to Supabase
export async function logVisitorTelemetry(section: string) {
  if (!supabase) return;
  try {
    await supabase.from("telemetry_logs").insert([
      {
        section,
        user_agent: typeof window !== "undefined" ? window.navigator.userAgent : "server",
        timestamp: new Date().toISOString(),
      },
    ]);
  } catch {
    // Fail silently in development
  }
}