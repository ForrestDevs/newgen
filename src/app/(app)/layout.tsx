import { validateRequest } from "@/lib/auth/validate-request";
import { AppShell } from "@/components/layout/app/app-shell";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();
  if (!user) return null;

  return (
    <AdminPanelLayout>
      <div>{children}</div>
    </AdminPanelLayout>
  );
}
