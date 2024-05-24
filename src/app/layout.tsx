import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import TrpcProvider from "@/lib/trpc/Provider";
import { cookies } from "next/headers";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "New Gen Performance",
  description: "The next generation of performance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🧬</text></svg>"
        ></link>
      </head>
      <body className={cn(inter.className, "w-full h-screen")}>
        <TrpcProvider cookies={cookies().toString()}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </TrpcProvider>
        <Toaster richColors />
        <Analytics />
      </body>
    </html>
  );
}
