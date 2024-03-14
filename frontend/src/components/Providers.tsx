"use client";

import { Session } from "next-auth";
import { SessionProvider, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { Toaster } from "./ui/toaster";
import { isTokenExpired, getTokenExpiryTime } from "../lib/utils";
import { ThemeProvider } from "./ThemeProvider";

type Props = {
  children: React.ReactNode;
  session: Session | null;
};

const Providers = ({ children, session }: Props) => {
  const [interval, setInterval] = useState<number>(0);

  useEffect(() => {
    if (session?.token) {
      const token = session?.token;

      if (isTokenExpired(token)) {
        signOut({ redirect: false });
      }

      const sessionRefetchInterval = Math.round(
        (getTokenExpiryTime(token) * 1000 - Date.now()) / 1000
      );

      setInterval(sessionRefetchInterval > 0 ? sessionRefetchInterval : 0);
    }
  }, [session]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider
        session={session}
        refetchOnWindowFocus={false}
        refetchInterval={interval}
      >
        {children}
        <Toaster />
      </SessionProvider>
    </ThemeProvider>
  );
};

export default Providers;
