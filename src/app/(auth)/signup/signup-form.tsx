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
import { PasswordInput } from "@/components/password-input";
import { LoadingButton } from "@/components/ui/loading-button";
import { type SignupInput, signupSchema } from "@/lib/validations/auth";
import {
  Form,
  FormField,
  FormMessage,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

export function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupMutation = api.auth.signup.useMutation({
    onMutate: () => {
      toast.info("Signing up...");
      setLoading(true);
    },
    onSuccess: (data) => {
      setLoading(false);
      router.push(data.redirect);
      toast.success("Signed up");
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err.message);
    },
  });

  function onSubmit(values: SignupInput) {
    signupMutation.mutate(values);
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  required
                  placeholder="********"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Link href={"/login"}>
            <span className="p-0 text-xs font-medium hover:underline underline-offset-4">
              Already signed up? Login instead.
            </span>
          </Link>
        </div>

        <LoadingButton loading={loading} type="submit" className="w-full">
          Sign up
        </LoadingButton>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/">Cancel</Link>
        </Button>
      </form>
    </Form>
  );
}
