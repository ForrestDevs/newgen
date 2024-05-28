"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { logout } from "@/lib/auth/actions";

export default function SignOutBtn() {
  return (
    <form action={logout} className="w-full text-left m-auto">
      <Btn />
    </form>
  );
}

const Btn = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} variant={"destructive"} className="w-full m-auto">
      Sign{pending ? "ing" : ""} out
    </Button>
  );
};
