"use client";

import { PropsWithChildren } from "react";
import { PageNav } from "@/components/layout/app/app-page-nav";

export function PageShell(props: PropsWithChildren) {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <PageNav />
      <PageContent>{props.children}</PageContent>
    </div>
  );
}

function PageContent(props: PropsWithChildren) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      {props.children}
    </main>
  );
}
