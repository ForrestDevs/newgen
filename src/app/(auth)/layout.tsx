import { ReactNode } from "react";
import { validateRequest } from "@/lib/auth/validate-request";
import { redirect } from "next/navigation";
import { Paths } from "@/config/constants";

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const { session } = await validateRequest();
  if (session) return redirect(Paths.Dashboard);

  return <div className="h-screen flex flex-col items-center justify-center mx-4">{children}</div>;
}
