import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stock Control",
  description: "Stock Control app for stock management",
  applicationName: "Stock Control",
  appleWebApp: {
    capable: true,
    title: "Stock Control",
    statusBarStyle: "default"
  },
  formatDetection: {
    telephone: false
  },
  icons: {
    icon: "/icons/icon-512x512.png",
    apple: "/icons/icon-512x512.png"
  },
  manifest: "/manifest.json",
  twitter: {
    card: "summary_large_image",
    site: "@site",
    creator: "@creator",
    "images": "https://example.com/og.png"
  },
  openGraph: {
    type: "website",
    url: "https://example.com",
    title: "Stock Control",
    description: "Stock Control app for stock management",
    siteName: "Stock Control",
    images: [
      {
        url: "https://example.com/og.png",
      }
    ]
  }
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head/>
      <body className={cn(inter.className, "min-h-dvh flex flex-col bg-gradient-to-br dark:from-background dark:to-secondary from-primary-foreground")}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <Header /> */}
            {children}
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

