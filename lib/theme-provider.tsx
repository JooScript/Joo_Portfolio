"use client"

import type React from "react"
import { useEffect, useState } from "react"

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | "system" | null
    if (saved) {
      setTheme(saved)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    localStorage.setItem("theme", theme)

    const root = document.documentElement
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      root.classList.toggle("dark", isDark)
    } else {
      root.classList.toggle("dark", theme === "dark")
    }
  }, [theme, mounted])

  if (!mounted) return <>{children}</>

  return <>{children}</>
}

export const useTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | "system" | null
    setTheme(saved || "system")
  }, [])

  const updateTheme = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    const root = document.documentElement
    if (newTheme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      root.classList.toggle("dark", isDark)
    } else {
      root.classList.toggle("dark", newTheme === "dark")
    }
  }

  return { theme, setTheme: updateTheme }
}
