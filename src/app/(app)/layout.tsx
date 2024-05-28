import { checkAuth } from "@/lib/auth/actions";
import { AppShell } from "@/components/layout/app/app-shell";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();

  return (
    <AppShell>
      <div>{children}</div>
    </AppShell>
  );
}




