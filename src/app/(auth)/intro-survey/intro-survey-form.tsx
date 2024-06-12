"use client";

import { toast } from "sonner";
import { useState } from "react";
import { api } from "@/lib/trpc/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@/components/ui/loading-button";
import { IntroSurveyInput, introSurveySchema } from "@/lib/validations/auth";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

export default function SurveyForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<IntroSurveyInput>({
    resolver: zodResolver(introSurveySchema),
    defaultValues: {
      goal: "",
      performance: "",
    },
  });

  const submitSurveyMutation = api.auth.submitIntroSurvey.useMutation({
    onMutate: () => {
      toast.info("Submitting survey...");
      setLoading(true);
    },
    onSuccess: (data) => {
      setLoading(false);
      router.push(data.redirect);
      toast.success("Survey submitted!");
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err.message);
    },
  });

  function onSubmit(values: IntroSurveyInput) {
    submitSurveyMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What's your ultimate goal for hockey?</FormLabel>
              <FormControl>
                <Textarea
                  required
                  placeholder="I want to make it to the NHL"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="performance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                What part of performance do you think is the most important for
                your growth?
              </FormLabel>
              <FormControl>
                <Textarea
                  required
                  placeholder="Fitness levels, skating faster"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loading={loading} type="submit" className="w-full">
          Sign up
        </LoadingButton>
      </form>
    </Form>
  );
}
