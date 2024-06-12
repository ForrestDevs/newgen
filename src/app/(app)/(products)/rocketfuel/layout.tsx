import { ContentLayout } from "@/components/admin-panel/content-layout";

import { validateRequest } from "@/lib/auth/validate-request";
import { AppShell } from "@/components/layout/app/app-shell";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

export default async function RocketFuelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
//   const { user } = await validateRequest();
//   if (!user) return null;

  return <div>{children}</div>;
}
