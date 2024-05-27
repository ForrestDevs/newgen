import { validateRequest } from "@/lib/auth/validate-request";

export default async function Home() {
  const { session } = await validateRequest();
  return (
    <main className="">
      <h1 className="text-2xl font-bold my-2">Profile</h1>
      <pre className="bg-secondary p-4 rounded-lg my-2">
        {JSON.stringify(session, null, 2)}
      </pre>
    </main>
  );
}
