import { ContentLayout } from "@/components/admin-panel/content-layout";
import BackButton from "@/components/back-button";
import { Textarea } from "@/components/ui/textarea";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function QuestionsPage() {
  return (
    <ContentLayout title="Off Season Questions">
      <BackButton />
      <Component />
    </ContentLayout>
  );
}

function Component() {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="rounded-md border p-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">About Self-Reflection</h3>
            <p className="text-sm text-muted-foreground">
              This section is designed to help you reflect on your personal
              growth and development. It provides a space for you to document
              your thoughts, feelings, and experiences on a daily basis. By
              regularly engaging in self-reflection, you can gain valuable
              insights into your strengths, weaknesses, and areas for
              improvement.
            </p>
            <p className="text-sm text-muted-foreground">
              To make the most of this section, we recommend setting aside a
              dedicated time each day to write your reflections. Be honest and
              open with yourself, as this is a private space for your personal
              growth. Consider reflecting on your accomplishments, challenges,
              lessons learned, and areas you'd like to focus on moving forward.
            </p>
          </div>
        </div>

        <Link className={cn(buttonVariants({ size: "lg"}))}href="/offseason/questions/entryform">
          <PlusIcon className="mr-2 h-5 w-5" />
          New Entry
        </Link>

        <div className="rounded-md border p-4">
          <div className="space-y-2 rounded-md border bg-muted p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">How was your day today?</p>
                <p className="text-xs text-muted-foreground">June 20, 2023</p>
              </div>
              <Link
                href="#"
                className="text-xs font-medium text-primary underline underline-offset-4"
                prefetch={false}
              >
                View
              </Link>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              It was a productive day overall. I accomplished most of my tasks
              and felt a sense of accomplishment. However, I did struggle
              with...
            </p>
          </div>
          <div className="space-y-2 rounded-md border bg-muted p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">What did you learn today?</p>
                <p className="text-xs text-muted-foreground">June 19, 2023</p>
              </div>
              <Link
                href="#"
                className="text-xs font-medium text-primary underline underline-offset-4"
                prefetch={false}
              >
                View
              </Link>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              Today, I learned about the importance of active listening. During
              a meeting, I made a conscious effort to...
            </p>
          </div>
          <div className="space-y-2 rounded-md border bg-muted p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">
                  What are you grateful for today?
                </p>
                <p className="text-xs text-muted-foreground">June 18, 2023</p>
              </div>
              <Link
                href="#"
                className="text-xs font-medium text-primary underline underline-offset-4"
                prefetch={false}
              >
                View
              </Link>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              I'm grateful for the support of my family and friends. They have
              been there for me through thick and thin, and...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



