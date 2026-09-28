import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, email, objective, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message payload are required." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    // 1. If Resend API Key is configured, dispatch real email
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      const toEmail = process.env.CONTACT_DELIVERY_EMAIL || "joshua@schneizel.webdev";

      const data = await resend.emails.send({
        from: "Schneizel Command Center <onboarding@resend.dev>",
        to: [toEmail],
        replyTo: email,
        subject: `[INQUIRY] ${objective} — from ${name || "Anonymous Recruiter"}`,
        html: `
          <div style="font-family: monospace; background: #05070a; color: #e1e7ec; padding: 24px; border-radius: 4px;">
            <h2 style="color: #00f0ff; border-bottom: 1px solid #1e293b; padding-bottom: 8px;">
              SECURE TRANSMISSION RECEIVED
            </h2>
            <p><strong>Sender:</strong> ${name || "Unspecified"} (${email})</p>
            <p><strong>Objective:</strong> ${objective}</p>
            <div style="background: #080d16; padding: 16px; border-left: 3px solid #00f0ff; margin-top: 16px;">
              <p style="white-space: pre-wrap; margin: 0;">${message}</p>
            </div>
            <p style="color: #64748b; font-size: 11px; margin-top: 24px;">
              Dispatched from Joshua Camacho Portfolio Command Center
            </p>
          </div>
        `,
      });

      return NextResponse.json({ success: true, mode: "live_resend", id: data.data?.id });
    }

    // 2. Graceful development fallback when API key is not yet set
    return NextResponse.json({
      success: true,
      mode: "simulated_local",
      message: "Transmission received and verified locally. Set RESEND_API_KEY to send real emails.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal transmission error" },
      { status: 500 }
    );
  }
}