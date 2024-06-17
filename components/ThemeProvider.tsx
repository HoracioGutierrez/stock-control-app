"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (typeof navigator !== undefined && navigator.serviceWorker) {
        navigator.serviceWorker.register("/sw.js");
      }
    }
  }, [])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
