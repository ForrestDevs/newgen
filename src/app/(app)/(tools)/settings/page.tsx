import { validateRequest } from "@/lib/auth/validate-request";
import { PageShell } from "@/components/layout/app/app-page-shell";
import { Component } from "./component";

export default async function Settings() {
  return (
    <PageShell>
      <Component />
    </PageShell>
  );
}
