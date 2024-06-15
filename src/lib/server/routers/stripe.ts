import { z } from "zod";
import { env } from "@/lib/env.mjs";
import { stripe } from "@/lib/stripe";
import { TRPCError } from "@trpc/server";
import {
  CreateCheckoutSessionInput,
  createCheckoutSessionSchema,
} from "@/lib/validations/stripe";
import {
  createTRPCRouter,
  protectedProcedure,
  ProtectedTRPCContext,
} from "@/lib/server/trpc";
import { courses, products, userPurchases } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { api } from "@/lib/trpc/server";

export const stripeRouter = createTRPCRouter({
  createCheckoutSession: protectedProcedure
    // .input(createCheckoutSessionSchema)
    .output(z.object({ success: z.boolean(), clientSecret: z.string() }))
    .mutation((ctx) => createCheckoutSession(ctx)),
});

async function createCheckoutSession({
  ctx
}: {
  ctx: ProtectedTRPCContext;
}) {
  const user = ctx.user;

  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to create a checkout session.",
    });
  }

  const userProfile = await api.user.getUserProfile.query();

  console.log("Creating checkout session");

  try {
    const product = await ctx.db
      .select()
      .from(products)
      .where(eq(products.stripePriceId, env.STRIPE_ROCKET_FUEL_PRICE_ID));

    if (product.length === 0) {
      console.error("Product not found");
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Product not found.",
      });
    }

    const course = await ctx.db
      .select()
      .from(courses)
      .where(eq(courses.productId, product[0].id));

    if (course.length === 0) {
      console.error("Course not found");
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Course not found.",
      });
    }

    var existingStripeCustomer = false;
    var stripeCustomerId = "";

    try {
      const previousPurchase = await ctx.db
        .select()
        .from(userPurchases)
        .where(eq(userPurchases.userId, user.id));

      if (previousPurchase.length > 0) {
        console.log(
          "Existing stripe customer",
          previousPurchase[0].stripeCustomerId
        );
        existingStripeCustomer = true;
        stripeCustomerId = previousPurchase[0].stripeCustomerId;
      }
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to check for existing stripe customer.",
      });
    }

    if (!existingStripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: userProfile.firstName + " " + userProfile.lastName,
      });
      console.log("New stripe Customer", customer);
      stripeCustomerId = customer.id;
    }

    console.log("Creating checkout session for user", user.id);
    const checkoutSession = await stripe.checkout.sessions.create({
      metadata: {
        userId: user.id,
        productId: product[0].id,
        courseId: course[0].id,
        stripePriceId: env.STRIPE_ROCKET_FUEL_PRICE_ID,
        stripeCustomerId: stripeCustomerId,
      },
      allow_promotion_codes: true,
      customer_update: {
        address: "auto",
        shipping: "auto",
      },
      customer: stripeCustomerId,
      ui_mode: "embedded",
      line_items: [
        {
          price: env.STRIPE_ROCKET_FUEL_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${env.NEXT_PUBLIC_APP_URL}/rocketfuel/purchase-complete/?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: { enabled: true },
    });

    const clientSecret = checkoutSession.client_secret;

    if (!clientSecret) {
      console.error("Failed to create checkout session, no client secret");
      throw new Error("Failed to create checkout session.");
    }

    return {
      success: true,
      clientSecret: clientSecret,
    };
  } catch (err) {
    console.error(err);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Failed to create checkout session ${err}`,
    });
  }
}
