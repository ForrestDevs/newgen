"use client";

import { toast } from "sonner";
import { useState } from "react";
import { api } from "@/lib/trpc/react";
import { useForm } from "react-hook-form";
import { Paths } from "@/config/constants";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  type VerifyEmailInput,
  verifyEmailSchema,
} from "@/lib/validations/auth";
import {
  Form,
  FormField,
  FormMessage,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

export function VerifyCode() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<VerifyEmailInput>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      code: "",
    },
  });

  const verifyEmailMutation = api.auth.verifyEmail.useMutation({
    onMutate: () => {
      toast.info("Verifying email...");
      setLoading(true);
    },
    onSuccess: (data) => {
      setLoading(false);
      toast.success("Email verified, signing in...");
      router.push(data.redirect);
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err.message);
    },
  });

  const resendMutation = api.auth.resendVerificationEmail.useMutation({
    onMutate: () => {
      toast.info("Resending verification email...");
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      toast.success("Resent verification email");
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err.message);
    },
  });

  const logoutMutation = api.auth.logout.useMutation({
    onMutate: () => {
      toast.info("Logging out...");
      setLoading(true);
    },
    onSuccess: (data) => {
      setLoading(false);
      toast.success("Logged out");
      router.push(Paths.Login);
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err.message);
    },
  });

  function onSubmit(values: VerifyEmailInput) {
    verifyEmailMutation.mutate(values);
  }

  return (
    <div className="flex flex-col gap-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification code</FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="123456"
                    autoComplete="one-time-code"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton loading={loading} type="submit" className="w-full">
            Verify
          </LoadingButton>
        </form>
      </Form>
      <LoadingButton
        loading={loading}
        onClick={() => resendMutation.mutate}
        className="w-full"
        variant={"secondary"}
      >
        Resend Code
      </LoadingButton>

      <LoadingButton
        loading={loading}
        onClick={() => logoutMutation.mutate}
        className="p-0 font-normal"
        variant={"link"}
      >
        want to use another email? Log out now.
      </LoadingButton>
    </div>
  );
}
