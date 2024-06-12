import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-screen flex flex-col items-center justify-center mx-4">
      {children}
    </div>
  );
}
