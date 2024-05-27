import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container flex flex-col gap-y-24 w-full">{children}</div>
    </div>
  );
}
