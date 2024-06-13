"use client";

import { Button } from "@/components/ui/button";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import getStripe from "@/lib/stripe/get-stripe";
import { api } from "@/lib/trpc/react";
import { Loader } from "lucide-react";
import ShineBorder from "@/components/ui/shine-button";
import { env } from "@/lib/env.mjs";

export default function ProButton() {
  const stripePromise = getStripe();
  const clientMutation = api.stripe.createCheckoutSession.useMutation();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const handleCheckout = async (): Promise<void> => {
    const res = await clientMutation.mutateAsync();

    if (!res.success) {
      console.error("Failed to get checkout id");
      return;
    }

    console.log(res.clientSecret);
    setClientSecret(res.clientSecret);
  };

  const [dialogTriggerClicked, setDialogTriggerClicked] = useState(false);

  useEffect(() => {
    if (dialogTriggerClicked) {
      handleCheckout();
    }
  }, [dialogTriggerClicked]);

  const options = { clientSecret };

  return (
    <Dialog>
      <DialogTrigger asChild onClick={() => setDialogTriggerClicked(true)}>
        <Button type="submit" formMethod="post" variant={"blank"}>
          <ShineBorder
            className="text-center text-2xl font-bold capitalize bg-gradient-to-br from-amber-300/80 via-orange-500/80 to-red-700/80"
            color={["#b91c1c", "#b91c1c", "#b91c1c"]}
          >
            Purchase
          </ShineBorder>
        </Button>
      </DialogTrigger>
      <DialogContent className="my-4 py-12 xl:max-w-screen-xl">
        <DialogTitle className="text-xl font-semibold">
          Purchase Rocket Fuel Speed Kit
        </DialogTitle>
        {clientSecret ? (
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout className="max-h-[80dvh]" />
          </EmbeddedCheckoutProvider>
        ) : (
          <Loader />
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel Payment
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
