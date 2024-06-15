"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";
import { api } from "@/lib/trpc/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  RequestOneonOneInput,
  requestOneonOneInputSchema,
} from "@/lib/validations/user";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function RequestForm() {
  const [loading, setLoading] = useState(false);
  const [dialogTriggerClicked, setDialogTriggerClicked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<RequestOneonOneInput>({
    resolver: zodResolver(requestOneonOneInputSchema),
    defaultValues: {
      notes: "",
      preferredTime1: "",
      preferredTime2: "",
      preferredTime3: "",
      preferredDate1: "",
      preferredDate2: "",
      preferredDate3: "",
    },
  });

  const submitRequestMutation = api.user.requestOneonOne.useMutation({
    onMutate: () => {
      toast.info("Requesting one-on-one");
      setLoading(true);
    },
    onSuccess: (data) => {
      setLoading(false);
      toast.success("Request submitted!");
      setDialogOpen(false);
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err.message);
    },
  });

  function onSubmit(values: RequestOneonOneInput) {
    submitRequestMutation.mutate(values);
  }

  const dialogTrigger = () => {
    setDialogTriggerClicked(true);
    setDialogOpen(true);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild onClick={dialogTrigger}>
        <Button variant={"default"} size={"lg"}>
          Request Custom Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="my-4 py-12">
        <DialogTitle className="text-xl font-semibold">
          Request a 1-on-1 Custom Plan
        </DialogTitle>
        <DialogDescription>
          The price of this custom plan and consult is $199.99 (serious
          inquiries only).
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <Label>Preferred Time 1</Label>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="preferredDate1"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Day" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monday">Monday</SelectItem>
                          <SelectItem value="tuesday">Tuesday</SelectItem>
                          <SelectItem value="wednesday">Wednesday</SelectItem>
                          <SelectItem value="thursday">Thursday</SelectItem>
                          <SelectItem value="friday">Friday</SelectItem>
                          <SelectItem value="saturday">Saturday</SelectItem>
                          <SelectItem value="sunday">Sunday</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredTime1"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="9am-10am">9am - 10am</SelectItem>
                          <SelectItem value="10am-11am">10am - 11am</SelectItem>
                          <SelectItem value="11am-12pm">11am - 12pm</SelectItem>
                          <SelectItem value="12pm-1pm">12pm - 1pm</SelectItem>
                          <SelectItem value="1pm-2pm">1pm - 2pm</SelectItem>
                          <SelectItem value="2pm-3pm">2pm - 3pm</SelectItem>
                          <SelectItem value="3pm-4pm">3pm - 4pm</SelectItem>
                          <SelectItem value="4pm-5pm">4pm - 5pm</SelectItem>
                          <SelectItem value="5pm-6pm">5pm - 6pm</SelectItem>
                          <SelectItem value="6pm-7pm">6pm - 7pm</SelectItem>
                          <SelectItem value="7pm-8pm">7pm - 8pm</SelectItem>
                          <SelectItem value="8pm-9pm">8pm - 9pm</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Preferred Time 2</Label>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="preferredDate2"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Day" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monday">Monday</SelectItem>
                          <SelectItem value="tuesday">Tuesday</SelectItem>
                          <SelectItem value="wednesday">Wednesday</SelectItem>
                          <SelectItem value="thursday">Thursday</SelectItem>
                          <SelectItem value="friday">Friday</SelectItem>
                          <SelectItem value="saturday">Saturday</SelectItem>
                          <SelectItem value="sunday">Sunday</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredTime2"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="9am-10am">9am - 10am</SelectItem>
                          <SelectItem value="10am-11am">10am - 11am</SelectItem>
                          <SelectItem value="11am-12pm">11am - 12pm</SelectItem>
                          <SelectItem value="12pm-1pm">12pm - 1pm</SelectItem>
                          <SelectItem value="1pm-2pm">1pm - 2pm</SelectItem>
                          <SelectItem value="2pm-3pm">2pm - 3pm</SelectItem>
                          <SelectItem value="3pm-4pm">3pm - 4pm</SelectItem>
                          <SelectItem value="4pm-5pm">4pm - 5pm</SelectItem>
                          <SelectItem value="5pm-6pm">5pm - 6pm</SelectItem>
                          <SelectItem value="6pm-7pm">6pm - 7pm</SelectItem>
                          <SelectItem value="7pm-8pm">7pm - 8pm</SelectItem>
                          <SelectItem value="8pm-9pm">8pm - 9pm</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Preferred Time 3</Label>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="preferredDate3"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Day" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monday">Monday</SelectItem>
                          <SelectItem value="tuesday">Tuesday</SelectItem>
                          <SelectItem value="wednesday">Wednesday</SelectItem>
                          <SelectItem value="thursday">Thursday</SelectItem>
                          <SelectItem value="friday">Friday</SelectItem>
                          <SelectItem value="saturday">Saturday</SelectItem>
                          <SelectItem value="sunday">Sunday</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredTime3"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="9am-10am">9am - 10am</SelectItem>
                          <SelectItem value="10am-11am">10am - 11am</SelectItem>
                          <SelectItem value="11am-12pm">11am - 12pm</SelectItem>
                          <SelectItem value="12pm-1pm">12pm - 1pm</SelectItem>
                          <SelectItem value="1pm-2pm">1pm - 2pm</SelectItem>
                          <SelectItem value="2pm-3pm">2pm - 3pm</SelectItem>
                          <SelectItem value="3pm-4pm">3pm - 4pm</SelectItem>
                          <SelectItem value="4pm-5pm">4pm - 5pm</SelectItem>
                          <SelectItem value="5pm-6pm">5pm - 6pm</SelectItem>
                          <SelectItem value="6pm-7pm">6pm - 7pm</SelectItem>
                          <SelectItem value="7pm-8pm">7pm - 8pm</SelectItem>
                          <SelectItem value="8pm-9pm">8pm - 9pm</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel>Additional details</FormLabel>
                  <FormControl>
                    <Textarea
                      required
                      placeholder="Let us know any additional details"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <div className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <LoadingButton
                  loading={loading}
                  type="submit"
                  className="w-full"
                >
                  Send
                </LoadingButton>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
