"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

// Since React Context is only available in client components, we have to wrap SessionProvider with a client component.
const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
