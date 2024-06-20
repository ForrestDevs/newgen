import { ContentLayout } from "@/components/admin-panel/content-layout";
import BackButton from "@/components/back-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { CheckIcon, DownloadIcon, FilePenIcon, TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
export default function GeneratePage() {
  return (
    <ContentLayout title="Off Season Questions">
      <BackButton />
      <Component />
    </ContentLayout>
  );
}

function Component() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Off-Season Development Plan
          </h1>
          <p className="text-muted-foreground">
            Create a comprehensive plan to guide your off-season training and
            development.
          </p>
        </header>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Key Ideas</h2>
          <ul className="grid gap-4">
            <li className="flex items-start gap-2">
              <CheckIcon className="w-5 h-5 mt-1 text-primary" />
              <p className="text-muted-foreground">
                Identify areas for improvement
              </p>
            </li>
            <li className="flex items-start gap-2">
              <CheckIcon className="w-5 h-5 mt-1 text-primary" />
              <p className="text-muted-foreground">
                Set specific goals and targets
              </p>
            </li>
            <li className="flex items-start gap-2">
              <CheckIcon className="w-5 h-5 mt-1 text-primary" />
              <p className="text-muted-foreground">
                Develop a structured training schedule
              </p>
            </li>
            <li className="flex items-start gap-2">
              <CheckIcon className="w-5 h-5 mt-1 text-primary" />
              <p className="text-muted-foreground">
                Monitor progress and adjust as needed
              </p>
            </li>
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Previous Plans</h2>
          <div className="grid gap-4">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>2023 Off-Season Plan</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <FilePenIcon className="w-4 h-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <DownloadIcon className="w-4 h-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Created on: 2023-04-15</p>
                <p className="text-muted-foreground">
                  Last updated: 2023-06-01
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>2022 Off-Season Plan</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <FilePenIcon className="w-4 h-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <DownloadIcon className="w-4 h-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Created on: 2022-05-01</p>
                <p className="text-muted-foreground">
                  Last updated: 2022-08-15
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex justify-center">
          <Link
            href="/offseason/generate/entryform"
            className={cn(buttonVariants({ size: "lg" }))}
          >
            Create New Plan
          </Link>
        </div>
      </div>
    </div>
  );
}


