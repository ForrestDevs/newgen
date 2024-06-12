import BackButton from "@/components/back-button";
// import { PageShell } from "@/components/layout/app/app-page-shell";
import { Card } from "@/components/ui/card";
import { KeyIcon } from "lucide-react";
import { keyInsights } from "@/config/rocketfuel";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Image from "next/image";
const methods = [
  {
    title: "Strength Method",
    img: "/strengthImg.webp",
    lines: [
      {
        content:
          "Heavy Lifting: Lifting heavy weights (typically 75-85% of one's maximum lift) for fewer repetitions can stimulate Type II muscle fibers.",
      },
      {
        content:
          "Explosive Lifting: Movements like power cleans, snatch, and push press activate fast-twitch fibers due to the rapid acceleration required.",
      },
    ],
  },
  {
    title: "Velocity-Acceleration Method",
    img: "/velocityImg.webp",
    lines: [
      {
        content:
          "Max-Effort Sprints: Short, intense bursts of running at full effort.",
      },
      {
        content:
          "Vertical Jumps: Jumping as high as possible from a standing position.",
      },
      {
        content:
          "Broad Jumps: Jumping as far as possible from a standing position.",
      },
      {
        content:
          "Bounds: Repeated jumps focusing on a fast and smooth transition between each jump.",
      },
      {
        content:
          "Jumps with a Countermovement: Utilizing a quick squat motion before jumping to maximize ground force reaction.",
      },
      {
        content:
          "Sprint Training: Short sprints up to 10 seconds to maximize recruitment of Type IIb muscle fibers, which are crucial for explosive movements.",
      },
      {
        content:
          "Plyometrics: Includes exercises like jump squats, box jumps, and bounds. Aims to improve explosive power and speed by activating fast-twitch muscle fibers.",
      },
    ],
  },
  {
    title: "Power (speed-strength) Method",
    img: "/powerImg.webp",
    lines: [
      {
        content:
          "Apply Resistance to Speed Movements: Enhances fast movements combined with high force output. Forces the athlete to exert significant force. Encourages rapid reproduction of strength and force during the movement.",
      },
      {
        content:
          "Use lower percentages of your 1RM (55-70%) and try and move them as fast as possible",
      },
      {
        content: "MedBall, Barbell",
      },
    ],
  },
  {
    title: "Hip Joint Isometrics",
    img: "/hipImg.webp",
    lines: [
      {
        content:
          "Engines of Body and Hockey: Critical for powering movements specific to hockey.",
      },
      {
        content:
          "Tendon Stiffness: Increases the ability of tendons to absorb and release energy efficiently.",
      },
      {
        content:
          "Neuromuscular Control: Enhances the coordination and control of muscle actions.",
      },
      {
        content:
          "Joint Stability: Improves the stability of hip joints, reducing the risk of injury.",
      },
      {
        content:
          "Force Development in End Ranges of Motion: Strengthens the muscles' ability to generate force at the limits of joint movement.",
      },
    ],
  },
  {
    title: "Warmup / Elasticity Method",
    img: "/elasticityImg.webp",
    lines: [
      {
        content: "",
      },
    ],
  },
];

export default function Applications() {
  return (
    <ContentLayout title="Methods">
      <BackButton />
      <div className="space-y-24">
        <section
          id="title"
          className="w-full rounded-lg bg-white py-12 md:py-24 lg:py-32 space-y-10"
        >
          <div className="container space-y-6 px-4 md:px-6">
            <div className="space-y-3 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                The 5 Methodologies of Our Speed Program
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Unlock your full potential with our comprehensive speed program,
                designed to help you achieve your goals faster and more
                efficiently.
              </p>
            </div>
          </div>
        </section>

        <section id="methods" className="space-y-10">
          {methods.map((method, i) => (
            <div
              className={`w-full p-4 rounded-lg ${
                i % 2 === 0 ? "bg-gray-100" : "bg-white"
              } ${i % 2 === 0 ? "dark:bg-black/50" : ""}`}
              key={i}
            >
              <div className="space-y-8 p-8">
                <h3 className="text-2xl font-bold tracking-tighter md:text-3xl/tight">
                  Methodology {i + 1}: {method.title}
                </h3>
                <div className="flex flex-col justify-center lg:flex-row gap-4">
                  <ul className="space-y-4 list-disc">
                    {method.lines.map((line, i) => (
                      <li key={i}>{line.content}</li>
                    ))}
                  </ul>
                  <Image
                    src={method.img}
                    alt={method.title}
                    width={400}
                    height={400}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </section>

        <section id="insights" className="space-y-10">
          {keyInsights.map((insight, i) => (
            <Card
              key={i}
              className="bg-gray-100 dark:bg-black/50 p-8 flex justify-start" // Change justify-center to justify-start
            >
              <div className="flex items-start">
                <div className="h-full border-l-4 border-gray-900 dark:border-gray-100 mr-4" />
                <blockquote className="text-lg font-medium text-gray-900 dark:text-white/75">
                  {insight.lines.map((line, i) => (
                    <p key={i} className="text-gray-600 dark:text-gray-400">
                      {line}
                    </p>
                  ))}
                </blockquote>
              </div>
            </Card>
          ))}
        </section>
      </div>
    </ContentLayout>
  );
}

function Insights() {
  return (
    <aside className="bg-gray-100 p-6 rounded-lg shadow-sm dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-4">Sports Training Insights</h3>
      <div className="space-y-6"></div>
    </aside>
  );
}

function Insite() {
  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        <Card className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex flex-col items-start gap-4 transition-transform hover:scale-105 hover:shadow-lg">
          <div className="flex items-center gap-2">
            <KeyIcon className="w-4 h-4 text-yellow-500" />
            <h3 className="text-lg font-semibold">Key Insight</h3>
          </div>
          <blockquote>
            Embrace simplicity. Simplicity in design and execution allows humans
            to perform at their best, reducing cognitive load and increasing
            efficiency.
          </blockquote>
        </Card>
        <Card className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex flex-col items-start gap-4 transition-transform hover:scale-105 hover:shadow-lg">
          <div className="flex items-center gap-2">
            <KeyIcon className="w-4 h-4 text-yellow-500" />
            <h3 className="text-lg font-semibold">Key Insight</h3>
          </div>
          <blockquote>
            Design for humans. Human-centered design principles ensure that
            products and services are tailored to the needs, capabilities, and
            limitations of the people who will use them, optimizing performance
            and user experience.
          </blockquote>
        </Card>
        <Card className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex flex-col items-start gap-4 transition-transform hover:scale-105 hover:shadow-lg">
          <div className="flex items-center gap-2">
            <KeyIcon className="w-4 h-4 text-yellow-500" />
            <h3 className="text-lg font-semibold">Key Insight</h3>
          </div>
          <blockquote>
            Consistency is key. Consistent design patterns and interactions
            reduce the cognitive load on users, allowing them to focus their
            mental resources on the task at hand and perform more efficiently.
          </blockquote>
        </Card>
        <Card className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex flex-col items-start gap-4 transition-transform hover:scale-105 hover:shadow-lg">
          <div className="flex items-center gap-2">
            <KeyIcon className="w-4 h-4 text-yellow-500" />
            <h3 className="text-lg font-semibold">Key Insight</h3>
          </div>
          <blockquote>
            Embrace white space. Proper use of white space in design creates
            visual breathing room, reducing clutter and improving focus, which
            can enhance human performance and comprehension.
          </blockquote>
        </Card>
        <Card className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex flex-col items-start gap-4 transition-transform hover:scale-105 hover:shadow-lg">
          <div className="flex items-center gap-2">
            <KeyIcon className="w-4 h-4 text-yellow-500" />
            <h3 className="text-lg font-semibold">Key Insight</h3>
          </div>
          <blockquote>
            Accessibility matters. Designing for accessibility ensures that
            products and services are usable by people with diverse abilities,
            enabling them to perform tasks effectively and participate fully.
          </blockquote>
        </Card>
        <Card className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex flex-col items-start gap-4 transition-transform hover:scale-105 hover:shadow-lg">
          <div className="flex items-center gap-2">
            <KeyIcon className="w-4 h-4 text-yellow-500" />
            <h3 className="text-lg font-semibold">Key Insight</h3>
          </div>
          <blockquote>
            Iterate and improve. Continuous iteration and improvement based on
            user feedback and performance data can lead to more effective and
            efficient designs that better support human performance and
            productivity.
          </blockquote>
        </Card>
        <Card className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex flex-col items-start gap-4 transition-transform hover:scale-105 hover:shadow-lg">
          <div className="flex items-center gap-2">
            <KeyIcon className="w-4 h-4 text-yellow-500" />
            <h3 className="text-lg font-semibold">Key Insight</h3>
          </div>
          <blockquote>
            Respect conventions. Adhering to established design conventions and
            patterns can reduce the cognitive load on users, allowing them to
            focus on their tasks and perform more efficiently.
          </blockquote>
        </Card>
        <Card className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex flex-col items-start gap-4 transition-transform hover:scale-105 hover:shadow-lg">
          <div className="flex items-center gap-2">
            <KeyIcon className="w-4 h-4 text-yellow-500" />
            <h3 className="text-lg font-semibold">Key Insight</h3>
          </div>
          <blockquote>
            Prioritize usability. Designing for optimal usability ensures that
            products and services are intuitive, efficient, and effective,
            enabling users to perform tasks with minimal effort and cognitive
            load.
          </blockquote>
        </Card>
        <Card className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex flex-col items-start gap-4 transition-transform hover:scale-105 hover:shadow-lg">
          <div className="flex items-center gap-2">
            <KeyIcon className="w-4 h-4 text-yellow-500" />
            <h3 className="text-lg font-semibold">Key Insight</h3>
          </div>
          <blockquote>
            Embrace constraints. Constraints in design can foster creativity and
            lead to more focused and efficient solutions that better support
            human performance and productivity.
          </blockquote>
        </Card>
        <Card className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex flex-col items-start gap-4 transition-transform hover:scale-105 hover:shadow-lg">
          <div className="flex items-center gap-2">
            <KeyIcon className="w-4 h-4 text-yellow-500" />
            <h3 className="text-lg font-semibold">Key Insight</h3>
          </div>
          <blockquote>
            Seek inspiration. Drawing inspiration from diverse sources can lead
            to innovative designs that better support human performance and
            productivity by addressing unique needs and challenges.
          </blockquote>
        </Card>
        <Card className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex flex-col items-start gap-4 transition-transform hover:scale-105 hover:shadow-lg">
          <div className="flex items-center gap-2">
            <KeyIcon className="w-4 h-4 text-yellow-500" />
            <h3 className="text-lg font-semibold">Key Insight</h3>
          </div>
          <blockquote>
            Stay curious. Maintaining a curious mindset and continuously
            learning about human behavior, cognition, and performance can lead
            to more effective and user-centered designs that optimize human
            productivity.
          </blockquote>
        </Card>
      </div>
    </div>
  );
}
