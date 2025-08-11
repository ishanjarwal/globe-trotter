import prisma from "@/config/prisma";
import { Webhook } from "svix";

export async function POST(req: Request) {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET env variable");
    }

    const payload = await req.text();

    const svix_id = req.headers.get("svix-id");
    const svix_timestamp = req.headers.get("svix-timestamp");
    const svix_signature = req.headers.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Missing required Svix headers", { status: 400 });
    }

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: any;
    try {
      evt = wh.verify(payload, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
      console.log("Event Verified");
    } catch (err) {
      console.error("Event Verification Error:", err);
      return new Response("Invalid signature", { status: 400 });
    }

    console.log("Event Received:", evt);

    const { type, data } = evt;

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
  } catch (error) {
    console.error(error);
    return new Response(`Something went wrong: ${error}`, { status: 500 });
  }
}
