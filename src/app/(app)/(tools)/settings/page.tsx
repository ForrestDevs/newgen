import { Component } from "./component";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default async function Settings() {
  return (
    <ContentLayout title="Settings">
      <Component />
    </ContentLayout>
  );
}
