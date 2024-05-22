import { validateRequest } from "@/lib/auth";
import { checkAuth } from "@/lib/auth/actions";
import { getUserSubscriptionPlan } from "@/lib/stripe/subscription";

export default async function Account() {
  await checkAuth();
  const { session } = await validateRequest();
  const subscriptionPlan = await getUserSubscriptionPlan();

  return (
    <main>
      <h1 className="text-2xl font-semibold my-4">Account</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">User Information</h2>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Subscription Plan</h2>
          <pre>{JSON.stringify(subscriptionPlan, null, 2)}</pre>
        </div>
      </div>
    </main>
  );
}
