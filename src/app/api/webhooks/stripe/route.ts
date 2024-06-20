import { z } from "zod";
import { db } from "@/lib/db";
import type Stripe from "stripe";
import { generateId } from "lucia";
import { env } from "@/lib/env.mjs";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { userPurchases } from "@/lib/db/schema/user"
import { courseAccess } from "@/lib/db/schema/product";

const metadataSchema = z.object({
  userId: z.string(),
  productId: z.string(),
  stripeCustomerId: z.string(),
  stripePriceId: z.string(),
  courseId: z.string(),
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown error."}`,
      { status: 400 }
    );
  }

  switch (event.type) {
    case "payment_intent.created": {
      const paymentIntent = event.data.object;
      console.log("Payment Intent Created");
      break;
    }
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      console.log("Payment Succeeded");
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      console.log("Payment Failed");
      break;
    }
    case "charge.succeeded": {
      const chargeSucceeded = event.data.object;
      console.log("Charge Succeeded");
      break;
    }
    case "checkout.session.completed": {
      const checkoutSessionCompleted = event.data.object;
      const metadata = checkoutSessionCompleted?.metadata;
      console.log("Checkout Session Completed, with metadata:", metadata);

      if (!metadata) {
        return new Response("Metadata not found in checkout session.", {
          status: 404,
        });
      }

      try {
        //log purchase
        // Validate the metadata object
        const validatedMetadata = metadataSchema.parse(metadata);

        // Access the validated fields
        const { userId, productId, stripeCustomerId, stripePriceId, courseId } =
          validatedMetadata;

        console.log("Validated Metadata", validatedMetadata);

        const logPurchase = await db.insert(userPurchases).values({
          id: generateId(21),
          userId: userId,
          productId: productId,
          stripeCustomerId: stripeCustomerId,
          priceId: stripePriceId,
        });

        if (!logPurchase) {
          return new Response("Failed to log purchase", { status: 400 });
        }

        const courseUserId = generateId(21);

        const grantAccess = await db.insert(courseAccess).values({
          id: courseUserId,
          courseId: courseId,
          userId: userId,
        });

        if (!grantAccess) {
          return new Response("Failed to grant course access", {
            status: 400,
          });
        }

        console.log("Course Access Granted");

        return new Response("Purchase logged and course access granted", {
          status: 200,
        });
      } catch (error) {
        return new Response(
          `Webhook Error: ${
            error instanceof Error ? error.message : "Unknown error."
          }`,
          { status: 400 }
        );
      }
    }
    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  return new Response(null, { status: 200 });
}
