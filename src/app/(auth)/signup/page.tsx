import { redirect } from "next/navigation";
import { SignupForm } from "./signup-form";
import { validateRequest } from "@/lib/auth/validate-request";
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
  const { user } = await validateRequest();

  if (user) redirect(Paths.Dashboard);

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
