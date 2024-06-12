import { ContentLayout } from "@/components/admin-panel/content-layout";
import { stripe } from "@/lib/stripe";
import { toast } from "sonner";

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
        <h1 className="text-4xl font-bold">Thank you for your purchase!</h1>
        <h3 className="text-xl font-semibold">You are now a pro user!</h3>
        <p className="m-4">Session ID {sessionId}</p>

        <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
          {JSON.stringify(session, null, 2)}
        </pre>
      </ContentLayout>
    );
  }

  return null;
}
