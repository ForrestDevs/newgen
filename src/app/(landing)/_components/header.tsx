import Link from "next/link";
import Nav from "./nav";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="w-full py-4 pt-6">
      <div className="container flex items-center justify-between px-4 md:px-6">
        <p className="text-4xl">🧬</p>
        <Nav />

        <Link href="/login" className={cn(buttonVariants({variant: "default"}))}>Login</Link>
      </div>
    </header>
  );
}
