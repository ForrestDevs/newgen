"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { api } from "@/lib/trpc/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  type ForgotPasswordInput,
  forgotPasswordSchema,
} from "@/lib/validations/auth";
import {
  Form,
  FormField,
  FormMessage,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Paths } from "@/config/constants";

export function ForgotPasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const forgotPasswordMutation = api.auth.sendPasswordResetLink.useMutation({
    onMutate: () => {
      toast.info("Sending reset email...");
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      toast.success("Reset email sent");
      router.push(Paths.Dashboard);
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err.message);
    },
  });

  function onSubmit(values: ForgotPasswordInput) {
    forgotPasswordMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="joe@gmail.com"
                  autoComplete="email"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage {...field} />
            </FormItem>
          )}
        />
        <div className="flex flex-wrap justify-between">
          <Link href={Paths.Signup}>
            <Button variant={"link"} size={"sm"} className="p-0">
              Not signed up? Sign up now
            </Button>
          </Link>
        </div>
        <LoadingButton loading={loading} type="submit" className="w-full">
          Submit
        </LoadingButton>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/">Cancel</Link>
        </Button>
      </form>
    </Form>
  );
}
