import type { Metadata, Viewport } from "next";
import { ThemeProvider, ThemeToggle } from "@/components/theme";
import { Button } from "@/components/ui/button";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import NavBar from "~/components/NavBar";
import { cn } from "~/utils/cn";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://activeaces.com"
      : "http://localhost:3000",
  ),
  title: "Active Aces",
  description: "A fitness and gym tracking platform",
  openGraph: {
    title: "Active Aces",
    description: "A fitness and gym tracking platform",
    url: "https://activeaces.com",
    siteName: "Active Aces",
  },
  twitter: {
    card: "summary_large_image",
    site: "@activeaces",
    creator: "@activeaces",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "flex min-h-screen flex-col bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ClerkProvider
          afterSignInUrl="/dashboard"
          afterSignUpUrl="/dashboard"
          appearance={{
            baseTheme: dark,
            variables: {
              colorPrimary: "#22c55e",
              colorTextOnPrimaryBackground: "#054016",
            },
          }}
          publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <TRPCReactProvider>
              {/* <NavBar /> */}
              {props.children}
            </TRPCReactProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
