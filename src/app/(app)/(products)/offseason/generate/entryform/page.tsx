import { ContentLayout } from "@/components/admin-panel/content-layout";
import BackButton from "@/components/back-button";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function TemplateEntryPage() {
  return (
    <ContentLayout title="Generate your off season template">
      <BackButton />
      <Component />
    </ContentLayout>
  );
}

function Component() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Guided Self-Reflection</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Take a moment to reflect on your personal growth and journey. Answer the following questions to gain deeper
            self-awareness.
          </p>
        </div>
        <div className="grid gap-6 mt-10">
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold">What are your core values?</h3>
            <p className="text-muted-foreground mt-2">
              Example: Honesty, integrity, and compassion are core values that guide my decisions and actions.
            </p>
            <div className="mt-4">
              <Textarea
                placeholder="Write your answer here..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold">What are your biggest strengths?</h3>
            <p className="text-muted-foreground mt-2">
              Example: I am a quick learner, adaptable, and have strong problem-solving skills.
            </p>
            <div className="mt-4">
              <Textarea
                placeholder="Write your answer here..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold">What are your personal goals?</h3>
            <p className="text-muted-foreground mt-2">
              Example: I want to improve my public speaking skills, learn a new language, and save enough money to buy a
              house in the next 5 years.
            </p>
            <div className="mt-4">
              <Textarea
                placeholder="Write your answer here..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <Button variant="outline">Back</Button>
          <Button>Save</Button>
        </div>
      </div>
    </section>
  )
}
