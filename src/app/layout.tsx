import "@/lib/styles/globals.css";

import React from "react";
import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/fonts";
import TrpcProvider from "@/lib/trpc/react";
import type { Metadata, Viewport } from "next";
import { APP_NAME } from "@/config/constants";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/react";
import { TailwindIndicator } from "@/components/tailwind-size";

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: "Take your performance to the next level with our tools",
  icons: [{ rel: "icon", url: "/icon.png" }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TrpcProvider cookies={cookies().toString()}>{children}</TrpcProvider>
          <Toaster richColors />
          <TailwindIndicator />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
