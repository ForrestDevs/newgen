import { ContentLayout } from "@/components/admin-panel/content-layout";
import { stripe } from "@/lib/stripe";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

async function getSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId!);
    return session;
  } catch (error) {
    return null;
  }
}

export default async function CheckoutReturnPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const sessionId = searchParams?.session_id;
  if (!sessionId || typeof sessionId !== "string") {
    return <p>Error: Something wrong!</p>;
  }
  const session = await getSession(sessionId);

  if (!session) {
    return <p>Error: Something wrong!</p>;
  }

  if (session?.status === "open") {
    return <p>Payment did not work.</p>;
  }

  if (session?.status === "complete") {
    // toast.success("Payment complete!");
    // * upgrade the membership or do something to make change to the database to mark this payment complete
    // * this can be making the user a PRO member or add items ... etc.
    return (
      <ContentLayout title="Purchase Complete">
        <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-12">
          <div className="max-w-xl w-full space-y-6 text-center">
            <div className="flex justify-center">
              <Image
                src="/rocketfuellogo.png"
                width={300}
                height={300}
                alt="Rocket Fuel Speed Kit"
                className="max-w-[300px] w-full"
              />
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Thank you for your purchase!
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl">
                You&apos;ve successfully purchased the Rocket Fuel Speed Kit. Get
                ready to take your website to new heights!
              </p>
            </div>
            <div className="flex justify-center">
              <Link
                href="/rocketfuel"
                className="inline-flex h-12 items-center justify-center rounded-md bg-gray-900 px-8 py-3 text-base font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </ContentLayout>
    );
  }

  return null;
}
