import { customAlphabet } from "nanoid";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import va from "@vercel/analytics"
import { z } from "zod"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");

export function absoluteUrl(path: string) {
  return `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  }${path}`;
}

export const base64Regex = /^data:image\/[a-zA-Z+]*;base64,[a-zA-Z0-9+/]*={0,2}$/;


export const timestamps: { createdAt: true; updatedAt: true } = {
  createdAt: true,
  updatedAt: true,
};

export const formatDate = (createdAt: Date): string => {
  const contractAge = Math.floor(
    (new Date().getTime() - new Date(createdAt).getTime()) /
      1000 /
      60 /
      60 /
      24,
  );
  const suffix = contractAge > 1 ? "s" : "";
  if (contractAge < 1) {
    return "<1 day";
  } else if (contractAge < 7) {
    return `${contractAge} day${suffix}`;
  } else if (contractAge < 30) {
    const weeks = Math.floor(contractAge / 7);
    return `${weeks} week${suffix}`;
  } else if (contractAge < 365) {
    const months = Math.floor(contractAge / 30);
    return `${months} month${suffix}`;
  } else {
    const years = Math.floor(contractAge / 365);
    return `${years} year${suffix}`;
  }
};

export function formatPrice(
  price: number | string,
  options: Intl.NumberFormatOptions = {},
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: options.currency ?? "USD",
    notation: options.notation ?? "compact",
    ...options,
  }).format(Number(price));
}

export const redirects = {
  toLogin: "/login",
  toSignup: "/signup",
  afterLogin: "/dashboard",
  afterLogout: "/",
  toVerify: "/verify-email",
  afterVerify: "/dashboard",
} as const;

const eventSchema = z.object({
  name: z.enum([
    "copy_npm_command",
    "copy_usage_import_code",
    "copy_usage_code",
    "copy_primitive_code",
    "copy_theme_code",
    "copy_block_code",
  ]),
  // declare type AllowedPropertyValues = string | number | boolean | null
  properties: z
    .record(z.union([z.string(), z.number(), z.boolean(), z.null()]))
    .optional(),
})

export type Event = z.infer<typeof eventSchema>

export function trackEvent(input: Event): void {
  const event = eventSchema.parse(input)
  if (event) {
    va.track(event.name, event.properties)
  }
}
