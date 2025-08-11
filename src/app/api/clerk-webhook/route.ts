import { Webhook, WebhookRequiredHeaders } from "svix";
import { headers } from "next/headers";
import prisma from "@/config/prisma";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error("Missing CLERK_WEBHOOK_SECRET env variable");
  }

  // Verify the request came from Clerk
  const payload = await req.text();
  const headers = req.headers as unknown as WebhookRequiredHeaders;
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;
  try {
    evt = wh.verify(payload, headers) as any;
  } catch (err) {
    return new Response("Invalid signature", { status: 400 });
  }
  console.log("Event Received : ", evt);
  const { id, type, data } = evt;

  if (type === "user.created" || type === "user.updated") {
    await prisma.user.upsert({
      where: { clerkId: data.id },
      update: {
        name: data.first_name,
        email: data.email_addresses[0].email_address,
      },
      create: {
        clerkId: data.id,
        name: data.first_name,
        email: data.email_addresses[0].email_address,
      },
    });
  }

  if (type === "user.deleted") {
    await prisma.user.delete({ where: { clerkId: data.id } });
  }

  return new Response("Webhook received", { status: 200 });
}
