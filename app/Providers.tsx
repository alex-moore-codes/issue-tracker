"use client";

import { ThemeProvider } from "next-themes";
import AuthProvider from "./auth/AuthProvider";
import { PropsWithChildren } from "react";
import QueryClientProvider from "./QueryClientProvider";

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider>
      <AuthProvider>
        {/* <ThemeProvider attribute="class"> */}
        {children}
        {/* </ThemeProvider> */}
      </AuthProvider>
    </QueryClientProvider>
  );
}
