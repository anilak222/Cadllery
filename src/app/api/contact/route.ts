import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
  type?: string;
};

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Missing fields" },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Invalid email" },
      { status: 400 }
    );
  }
  if (message.length > 5000) {
    return NextResponse.json(
      { ok: false, error: "Message too long" },
      { status: 400 }
    );
  }

  // Studio's own delivery hook — wire to whatever you like:
  //   - your own SMTP server
  //   - a self-hosted webhook
  //   - a database insert
  // Configure CADLLERY_CONTACT_WEBHOOK in your environment, or replace this
  // block with a direct integration.
  const webhook = process.env.CADLLERY_CONTACT_WEBHOOK;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          company: body.company ?? "",
          type: body.type ?? "",
          receivedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        console.error("Contact webhook failed", res.status);
        return NextResponse.json(
          { ok: false, error: "Delivery failed" },
          { status: 502 }
        );
      }
    } catch (err) {
      console.error("Contact webhook error", err);
      return NextResponse.json(
        { ok: false, error: "Delivery failed" },
        { status: 502 }
      );
    }
  } else {
    // No delivery configured yet — log to server output so the studio still
    // sees the message during development.
    console.log("[contact] inbound brief", {
      name,
      email,
      company: body.company ?? "",
      type: body.type ?? "",
      message,
    });
  }

  return NextResponse.json({ ok: true });
}
