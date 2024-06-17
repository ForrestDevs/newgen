
import { SignupForm } from "./signup-form";
import { APP_NAME, Paths } from "@/config/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import { SkeletonCard } from "@/components/ui/skeleton-card";

export const metadata = {
  title: "Sign Up",
  description: "Signup Page",
};

export default async function SignupPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>{APP_NAME}</CardTitle>
        <CardDescription>Sign up to start using the app</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<SkeletonCard />}>
          <SignupForm />
        </Suspense>
      </CardContent>
    </Card>
  );
}
