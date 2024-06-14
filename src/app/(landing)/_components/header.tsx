import Link from "next/link";
import Nav from "./nav";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Header() {
  return (
    <header className="w-full py-4 pt-6">
      <div className="container flex items-center justify-between px-4 md:px-6">
        <Link href="/">
          <p className="text-4xl">🧬</p>
        </Link>

        <Nav />
        <div className="flex flex-row gap-4 items-center">
          <ThemeToggle />
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
