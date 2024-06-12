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
import { LoginInput, loginSchema } from "@/lib/validations/auth";
import {
  Form,
  FormField,
  FormMessage,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = api.auth.login.useMutation({
    onMutate: () => {
      toast.info("Logging in...");
      setLoading(true);
    },
    onSuccess: (data) => {
      setLoading(false);
      router.push(data.redirect);
      toast.success("Logged in");
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err.message);
    },
  });

  function onSubmit(values: LoginInput) {
    loginMutation.mutate(values);
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
                  autoComplete="current-password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-wrap justify-between">
          <Button variant={"link"} size={"sm"} className="p-0" asChild>
            <Link href={"/signup"}>Not signed up? Sign up now.</Link>
          </Button>
          <Button variant={"link"} size={"sm"} className="p-0" asChild>
            <Link href={"/reset-password"}>Forgot password?</Link>
          </Button>
        </div>
        <LoadingButton loading={loading} type="submit" className="w-full">
          Log in
        </LoadingButton>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/">Cancel</Link>
        </Button>
      </form>
    </Form>
  );
}
