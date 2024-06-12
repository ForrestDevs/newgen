"use client";

import { toast } from "sonner";
import { useState } from "react";
import { api } from "@/lib/trpc/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from "@/lib/validations/auth";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Paths } from "@/config/constants";
import { PasswordInput } from "@/components/password-input";

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token,
      password: "",
    },
  });

  const resetPasswordMutation = api.auth.resetPassword.useMutation({
    onMutate: () => {
      toast.info("Resetting password...");
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      toast.success("Password reset, signing in...");
      router.push(Paths.Dashboard);
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err.message);
    },
  });

  function onSubmit(values: ResetPasswordInput) {
    resetPasswordMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput
                  required
                  autoComplete="new-password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <LoadingButton loading={loading} type="submit" className="w-full">
          Reset Password
        </LoadingButton>
      </form>
    </Form>
  );
}
