import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { ReactNode } from "react";

import { Header } from "@/components/header";
import { cn } from "@/utils/cn";

import "@/styles/globals.css";
import { AppWrapper } from "./app-wrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Control 361 Test - Kauan Santos",
  description: "A simple test to test the knowledge of Kauan Santos",
};

interface IRootLayoutProps {
  children: Readonly<ReactNode>;
}

export default function RootLayout({ children }: IRootLayoutProps) {
  return (
    <html lang="en" className="custom-scrollbar">
      <body
        suppressHydrationWarning
        className={cn(
          inter.variable,
          poppins.variable,
          "antialiased font-sans bg-primary-10",
        )}
      >
        <AppWrapper>
          <Header />
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}
