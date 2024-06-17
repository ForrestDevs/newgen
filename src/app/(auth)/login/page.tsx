import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth/validate-request";
import { APP_NAME, Paths } from "@/config/constants";
import { LoginForm } from "./login-form";
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
  title: "Login",
  description: "Login Page",
};

export default async function LoginPage() {
  // const { session } = await validateRequest();
  // if (session) redirect(Paths.Dashboard);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>{APP_NAME}</CardTitle>
        <CardDescription>
          Log in to your account to access your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<SkeletonCard />}>
          <LoginForm />
        </Suspense>
      </CardContent>
    </Card>
  );
}
