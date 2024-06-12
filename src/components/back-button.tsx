"use client";

import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant={"outline"}
      size="sm"
      className="max-w-20"
      onClick={router.back}
    >
      <ArrowLeftIcon className="h-4 w-4" />
      Back
    </Button>
  );
}
