import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ForgotPasswordForm } from "./forgot-password-form";
import { validateRequest } from "@/lib/auth/validate-request";
import { Paths } from "@/config/constants";

export const metadata = {
  title: "Forgot Password",
  description: "Forgot Password Page",
};

export default async function ForgotPasswordPage() {
  const { user } = await validateRequest();
  if (user) redirect(Paths.Dashboard);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Forgot password?</CardTitle>
        <CardDescription>
          Password reset link will be sent to your email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
    </Card>
  );
}
