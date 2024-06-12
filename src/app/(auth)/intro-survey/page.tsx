import SurveyForm from "./intro-survey-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import { SkeletonCard } from "@/components/ui/skeleton-card";

export default function SurveyPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Survey</CardTitle>
        <CardDescription>
          Please fill out the survey below to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<SkeletonCard />}>
          <SurveyForm />
        </Suspense>
      </CardContent>
    </Card>
  );
}
