"use client";

import { toast } from "sonner";
import { useState } from "react";

import { api } from "@/lib/trpc/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@/components/ui/loading-button";
import { ProfileInput, profileSchema } from "@/lib/validations/auth";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

export function CreateProfileForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      birthday: undefined,
      location: "",
      hockeyLevel: "",
    },
  });

  const createProfileMutation = api.auth.createProfile.useMutation({
    onMutate: () => {
      toast.info("Creating profile...");
      setLoading(true);
    },
    onSuccess: (data) => {
      setLoading(false);
      toast.success("Profile created!");
      router.push(data.redirect);
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err.message);
    },
  });

  function onSubmit(values: ProfileInput) {
    createProfileMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Connor"
                    autoComplete="given-name"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="McDavid"
                    autoComplete="family-name"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full ">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        " pl-3 text-left font-normal w-full ",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        <span>
                          {new Date(field.value).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    onSelect={field.onChange}
                    captionLayout="dropdown-buttons"
                    fromYear={1970}
                    toYear={new Date(
                      new Date().setFullYear(new Date().getFullYear() - 3)
                    ).getFullYear()}
                    showOutsideDays={false}
                    selected={new Date(field.value)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Enter your location"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hockeyLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hockey Level</FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Enter your hockey level"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loading={loading} type="submit" className="w-full">
          Create Profile
        </LoadingButton>
      </form>
    </Form>
  );
}
