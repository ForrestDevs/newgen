import { validateRequest } from "@/lib/auth/validate-request";
import { PageShell } from "@/components/layout/app/app-page-shell";

export default async function Home() {
  const session = await validateRequest();
  return (
    <PageShell>
      <h1 className="text-2xl font-bold">Profile</h1>
      <pre className="bg-secondary p-4 rounded-lg my-2">
        {JSON.stringify(session, null, 2)}
      </pre>
    </PageShell>
  );
}

