import BackButton from "@/components/back-button";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { PiGaugeBold } from "react-icons/pi";
import { TbStretching } from "react-icons/tb";
import { PiBarbellBold } from "react-icons/pi";
import { ArrowDownIcon, DumbbellIcon } from "lucide-react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { phases, splitTable, woVariations } from "@/config/rocketfuel";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function Split() {
  return (
    <ContentLayout title="The split">
      <BackButton />
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col space-y-20">
          <section id="Intro" className="space-y-10">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              The Exercise Split
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Embrace a science-based approach to enhance your speed and
              explosive power. This plan includes comprehensive workouts,
              essential principles, key insights, and instructional videos. The
              split consists of 5 daily workouts, each with a 10-minute, 2 phase
              plan.
            </p>
          </section>

          <section id="variations" className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                Workout Variations
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Each workout is part of an integrated approach, focusing on
                conditioning, strength, and speed in varying amounts. Recommend
                resting at least 2-3 days between each workout phase.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {woVariations.map((wo, i) => (
                <Card
                  key={i}
                  className="border border-orange-500 bg-gradient-to-br from-orange-100/50 to-orange-200/50"
                >
                  <CardHeader className="flex items-center justify-center mb-2">
                    <div className="h-10 w-10 rounded-full bg-orange-500 text-white flex items-center justify-center">
                      <span className="text-xl font-bold">{wo.title}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center font-bold text-lg text-orange-600 dark:text-orange-300">
                      {wo.description}
                    </p>
                    <div className="mt-8 flex flex-col items-center space-y-4">
                      {wo.points.map((point, i) => (
                        <>
                          <div
                            key={i}
                            className="rounded-full bg-orange-200 p-3 dark:bg-orange-700"
                          >
                            <span className="text-orange-600 dark:text-white">
                              {point.point}
                            </span>
                          </div>
                          {i !== wo.points.length - 1 && (
                            <ArrowDownIcon className="h-6 w-6 font-bold text-orange-400" />
                          )}
                        </>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="workouts" className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                What to Do and How much?
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Learn exactly how many exercises, sets, and reps to perform in
                each workout category.
              </p>
            </div>
            <Table className="border rounded-lg">
              <TableHeader>
                <TableRow>
                  <TableHead className="border-r border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span>Movement Category</span>
                      <div className="h-full border-r border-gray-200 dark:border-gray-700" />
                    </div>
                  </TableHead>
                  <TableHead>Exercises</TableHead>
                  <TableHead>Sets</TableHead>
                  <TableHead>Reps</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {splitTable.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="border-r border-gray-200 dark:border-gray-700">
                      <div className="grid gap-1">
                        <span className="font-bold">{row.category}</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {row.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{row.exercises}</TableCell>
                    <TableCell>{row.sets}</TableCell>
                    <TableCell>{row.reps}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Click
              {" "}
              <Link
                href="/rocketfuel/movements"
                className="text-lg text-blue-500 dark:text-blue-400"
              >
                here
              </Link>
              {" "}
              to visit the movement catelog and see all recommended exercises
              plus video demonstrations.
            </p>
          </section>

          {phases.map((section, i) => (
            <div
              id={section.title.toLowerCase()}
              key={i}
              className="space-y-10"
            >
              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                  {section.title}: {section.duration}
                </h2>
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  {section.description}
                </p>
              </section>

              <section id={section.title + "exercise split"}>
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      Weekly Exercise Split
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                      <PiGaugeBold className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-lg font-medium">Speed</p>
                        <p className="text-base text-gray-500 dark:text-gray-400">
                          2 workouts per week (only workout 1)
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                      <TbStretching className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-lg font-medium">
                          Hip Isometrics, Ankle
                        </p>
                        <p className="text-base text-gray-500 dark:text-gray-400">
                          3-4 workouts per week
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                      <PiBarbellBold className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-lg font-medium">Max Strength</p>
                        <p className="text-base text-gray-500 dark:text-gray-400">
                          2-3 workouts per week
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section id={section.title + "messages"} className="space-y-4">
                {section.messages.map((message, i) => (
                  <p
                    key={i}
                    className="text-lg text-gray-500 dark:text-gray-400"
                  >
                    {message.content}
                  </p>
                ))}
              </section>

              <section id={section.title + "key points"}>
                <Card className="bg-gray-100 dark:bg-gray-800 p-6">
                  <h3 className="text-2xl font-bold">Key Points 🔑</h3>
                  <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-400 list-disc pl-4">
                    {section.keyElements.map((element, i) => (
                      <li key={i}>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {element.point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </section>

              <section
                id={section.title + "exampleSplit"}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold">Example Weekly Split</h3>
                <Table className="border rounded-lg">
                  <TableHeader>
                    <TableRow className="rounded-xl">
                      <TableHead className="border-r border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <span>Day</span>
                          <div className="h-full border-r border-gray-200 dark:border-gray-700" />
                        </div>
                      </TableHead>
                      <TableHead>Workout</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {section.exampleWeekly.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell className="border-r border-gray-200 dark:border-gray-700">
                          <div className="grid gap-1">
                            <span className="font-bold">{row.day}</span>
                          </div>
                        </TableCell>
                        <TableCell>{row.workout}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </section>

              {section.disclaimers.length > 0 && (
                <section
                  id={section.title + "disclaimers"}
                  className="space-y-4"
                >
                  <div className="flex flex-col justify-start rounded-md border-2 border-yellow-500 bg-yellow-100 p-4">
                    <h3 className="text-xl font-semibold text-yellow-600 dark:text-yellow-300">
                      Disclaimer ⚠️
                    </h3>

                    {section.disclaimers.map((disclaimer, i) => (
                      <p
                        key={i}
                        className="text-lg text-gray-500 dark:text-gray-400 my-4"
                      >
                        {disclaimer.content}
                      </p>
                    ))}
                  </div>
                </section>
              )}
            </div>
          ))}
        </div>
      </div>
    </ContentLayout>
  );
}
