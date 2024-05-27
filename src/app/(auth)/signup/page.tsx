import { redirect } from "next/navigation";
import { Signup } from "./sign-up";
import { validateRequest } from "@/lib/auth/validate-request";
import { Paths } from "@/config/constants";

export const metadata = {
  title: "Sign Up",
  description: "Signup Page",
};

export default async function SignupPage() {
  const { user } = await validateRequest();

  if (user) redirect(Paths.Dashboard);

  return <Signup />;
}
