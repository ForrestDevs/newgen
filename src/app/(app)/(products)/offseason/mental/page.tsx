import { ContentLayout } from "@/components/admin-panel/content-layout";
import BackButton from "@/components/back-button";
import Link from "next/link"

export default function MentalPage() {
  return (
    <ContentLayout title="Off Season Questions">
      <BackButton />
      <Component />
    </ContentLayout>
  );
}



function Component() {
  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container grid gap-12 px-4 md:px-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Mental Excellence</h2>
          <p className="mt-2 text-lg text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Unlock your full potential with these tips and techniques for enhancing mental focus and performance.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-md border bg-background p-4 shadow-sm">
              <h3 className="text-lg font-semibold">Mindfulness</h3>
              <p className="mt-2 text-muted-foreground">
                Practice mindfulness techniques like meditation and deep breathing to improve concentration and reduce
                stress.
              </p>
            </div>
            <div className="rounded-md border bg-background p-4 shadow-sm">
              <h3 className="text-lg font-semibold">Exercise</h3>
              <p className="mt-2 text-muted-foreground">
                Regular exercise has been shown to boost cognitive function and mental clarity.
              </p>
            </div>
            <div className="rounded-md border bg-background p-4 shadow-sm">
              <h3 className="text-lg font-semibold">Brain Training</h3>
              <p className="mt-2 text-muted-foreground">
                Engage in brain training activities like puzzles and memory games to keep your mind sharp.
              </p>
            </div>
            <div className="rounded-md border bg-background p-4 shadow-sm">
              <h3 className="text-lg font-semibold">Sleep</h3>
              <p className="mt-2 text-muted-foreground">
                Getting enough quality sleep is crucial for optimal brain function and cognitive performance.
              </p>
            </div>
            <div className="rounded-md border bg-background p-4 shadow-sm">
              <h3 className="text-lg font-semibold">Nutrition</h3>
              <p className="mt-2 text-muted-foreground">
                A balanced diet rich in brain-boosting nutrients can enhance mental clarity and focus.
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Pre-Season Manuscripts</h2>
          <p className="mt-2 text-lg text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Explore our collection of pre-season manuscripts and create your own.
          </p>
          <div className="mt-8 grid gap-4">
            <div className="rounded-md border bg-background p-4 shadow-sm">
              <h3 className="text-lg font-semibold">Example Manuscript</h3>
              <p className="mt-2 text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, magna vel convallis bibendum, urna
                augue bibendum nisi, vel consectetur elit magna vel velit.
              </p>
            </div>
            <div className="rounded-md border bg-background p-4 shadow-sm">
              <h3 className="text-lg font-semibold">Another Manuscript</h3>
              <p className="mt-2 text-muted-foreground">
                Nullam quis risus eget urna mollis ornare vel eu leo. Cras mattis consectetur purus sit amet fermentum.
              </p>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Create Your Own
            </Link>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold">User Submissions</h3>
            <div className="mt-4 grid gap-4">
              <div className="rounded-md border bg-background p-4 shadow-sm">
                <h4 className="text-lg font-semibold">My Manuscript</h4>
                <p className="mt-2 text-muted-foreground">
                  Vestibulum id ligula porta felis euismod semper. Duis mollis, est non commodo luctus, nisi erat
                  porttitor ligula, eget lacinia odio sem nec elit.
                </p>
              </div>
              <div className="rounded-md border bg-background p-4 shadow-sm">
                <h4 className="text-lg font-semibold">Another User's Work</h4>
                <p className="mt-2 text-muted-foreground">
                  Cras mattis consectetur purus sit amet fermentum. Donec sed odio dui.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
