import { ContentLayout } from "@/components/admin-panel/content-layout";
import { dashboardLinks } from "@/config/offseason";
import Image from "next/image";
import Link from "next/link";
export default async function OffSeason() {
  return (
    <ContentLayout title="Off Season">
      Coming Soon!
      {/* <Dashboard /> */}
    </ContentLayout>
  );
}

function Purchase() {
  return (
    <div>
      <h1>Off Season Blueprint</h1>
      <p>Coming Soon!</p>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="flex flex-col space-y-8">
      <section id="hero" className="flex flex-col items-center space-y-4">
        <div className="flex flex-col items-center text-center">
          <Image
            src={"/offSeasonlogo.png"}
            width={350}
            height={350}
            alt="Off Season Blueprint Logo"
            className="rounded-full"
          />
        </div>
      </section>

      <section id="Welcome">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">
            Welcome Aboard!
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            We reccomend starting by referencing Mateo&apos;s Off Season
            Blueprint, then review the questions to prepare to create your
            custom plan via the off season template generator.
          </p>
        </div>
      </section>

      <section id="Links" className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {dashboardLinks.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            className="group relative block overflow-hidden rounded-lg bg-gradient-to-br p-6 hover:scale-[1.03] transition-all"
          >
            <div
              className={
                "absolute inset-0 bg-gradient-to-bl from-amber-400 via-blue-400 to-blue-900 opacity-90 transition-opacity group-hover:opacity-100"
              }
            />
            <div className="relative space-y-2">
              <h3 className="text-2xl font-bold text-white">{link.title}</h3>
              <p className="text-white/80">{link.description}</p>
            </div>
          </Link>
        ))}
      </section>

      <section id="Request">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">
            Request a 1-on-1 Custom Blueprint
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Recieve a custom off season development plan, beginning with a 1
            hour zoom call with Mateo to discuss your goals and unique
            requirements.
          </p>
          {/* <RequestForm /> */}
        </div>
      </section>
    </div>
  );
}
