"use client";

import type React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { createContext, useContext, useEffect, useState } from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
