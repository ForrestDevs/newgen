"use client";

import { PropsWithChildren } from "react";
import { PageNav } from "@/components/layout/app/app-page-nav";

export function PageShell(props: PropsWithChildren) {
  return (
    <main className="bg-primary-foreground flex flex-col items-start h-screen">
      <PageNav />
      <PageContent>{props.children}</PageContent>
    </main>
  );
}

function PageContent(props: PropsWithChildren) {
  return <div className="mx-2">{props.children}</div>;
}
