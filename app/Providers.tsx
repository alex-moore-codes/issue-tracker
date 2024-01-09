"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      {/* <ThemeProvider attribute="class"> */}
      {children}
      {/* </ThemeProvider> */}
    </SessionProvider>
  );
}
