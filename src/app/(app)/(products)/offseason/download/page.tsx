import { ContentLayout } from "@/components/admin-panel/content-layout";
import BackButton from "@/components/back-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DownloadPage() {
  return (
    <ContentLayout title="Off Season Questions">
      <BackButton />
      <Component />
    </ContentLayout>
  );
}

function Component() {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Download Our Resources
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed">
              Get access to our comprehensive guides and reports to help you
              succeed.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4 rounded-lg border bg-background p-6">
              <h3 className="text-xl font-semibold">
                The Ultimate Guide to Web Development
              </h3>
              <p className="text-muted-foreground">
                This comprehensive guide covers everything you need to know
                about web development, from HTML and CSS to JavaScript and
                React.
              </p>
              <Button>
                <Link href="#" download prefetch={false}>
                  Download PDF
                </Link>
              </Button>
            </div>
            <div className="space-y-4 rounded-lg border bg-background p-6">
              <h3 className="text-xl font-semibold">
                The Future of AI and Machine Learning
              </h3>
              <p className="text-muted-foreground">
                Explore the latest trends and advancements in AI and machine
                learning, and learn how they can benefit your business.
              </p>
              <Button>
                <Link href="#" download prefetch={false}>
                  Download PDF
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
