import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import "../styles/globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";
import { getServerAuthSession } from "@/lib/auth";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "MyWallet",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerAuthSession();
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={cn(
          "min-h-screen bg-background font-sans antialiased dark",
          fontSans.variable
        )}
      >
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
