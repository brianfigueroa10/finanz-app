import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import React from "react";

import "./globals.css"

import {Alumni_Sans as Fonts } from "next/font/google"
import { Toaster } from "@/components/ui/sonner";

const alumniSans = Fonts({ subsets: ["latin"], weight: ["400"] },)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="es" suppressHydrationWarning>
        <body className={`${alumniSans.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors position="bottom-right" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
