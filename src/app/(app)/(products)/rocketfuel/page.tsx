import React from "react";
import { Dynamic } from "./dynamic";
import { ContentLayout } from "@/components/admin-panel/content-layout";


export default async function RocketFuel() {
  return (
    <ContentLayout title="Rocket Fuel Speed Kit">
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-8">
        <Dynamic />
      </div>
    </ContentLayout>
  );
}

const links = [
  {
    title: "The Split",
    description: "What to do, when to do it, and why it works.",
    href: "/rocketfuel/split",
  },
  {
    title: "Movements",
    description: "A catalog of movements with video demonstrations.",
    href: "/rocketfuel/movements",
  },
  {
    title: "Methods",
    description: "The Methods of Speed Training.",
    href: "/rocketfuel/methods",
  },
  {
    title: "Science",
    description: "Learn the science behind speed training.",
    href: "/rocketfuel/science",
  },
];

const pillars = [
  {
    title: "Strength",
    description:
      "Developing the physical capacity to generate force and power.",
  },
  {
    title: "Speed",
    description: "Improving the ability to move quickly and efficiently.",
  },
  {
    title: "Agility",
    description:
      "Enhancing the ability to change direction and move with precision.",
  },
];

const keyPoints = [
  {
    title: "Periodization",
    description:
      "Structured training phases to optimize performance and prevent injury.",
  },
  {
    title: "Dynamic Effort",
    description:
      "Explosive movements to develop power and speed for on-ice performance.",
  },
  {
    title: "Rate of Force Production",
    description:
      "Improving the ability to generate force quickly and efficiently.",
  },
];
