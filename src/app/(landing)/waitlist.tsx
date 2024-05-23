"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client";
import { useState } from "react";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const waitlistSchema = z.object({
  email: z.string().email(),
});

export function WaitlistForm({ message }: { message: string }) {
  const form = useForm<z.infer<typeof waitlistSchema>>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync: joinWaitlist } = trpc.auth.waitlist.useMutation({});

  async function onSubmit(values: z.infer<typeof waitlistSchema>) {
    console.log("values", values);
    const res = await joinWaitlist(
      {
        email: values.email,
      },
      {
        onError: (error) => {
          toast.error(error.message);
        },
        onSuccess: () => {
          toast.success("Joined waitlist");
        },
      }
    );
    console.log("res", res);
  }

  return (
    <div className="container space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-4 md:flex-row md:justify-center"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="max-w-lg bg-gray-200 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-50 dark:placeholder:text-gray-400 dark:focus:ring-purple-500 dark:focus:ring-offset-gray-800"
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="max-w-lg bg-blue-500 hover:bg-blue-600 text-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-500 dark:focus:ring-offset-gray-800"
          >
            {form.formState.isSubmitting ? (
              <span className="animate-spin">Joining...</span>
            ) : (
              "Join Waitlist"
            )}
          </Button>
        </form>
      </Form>

      <p className="text-xs text-gray-700 dark:text-gray-200">
        {message}
      </p>
    </div>
  );
}
