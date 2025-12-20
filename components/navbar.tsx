"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { useTheme } from "@/lib/theme-provider"
import { Moon, Sun, Globe } from "lucide-react"
import { useState } from "react"

export const Navbar = () => {
  const { language, setLanguage, t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [showThemeMenu, setShowThemeMenu] = useState(false)

  const navItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.projects"), href: "/projects" },
    { label: t("nav.about"), href: "/#about" },
    { label: t("nav.contact"), href: "/#contact" },
  ]

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            Dev.
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              title={language === "en" ? "Switch to Arabic" : "Switch to English"}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>

            {/* Theme Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                {theme === "dark" ? (
                  <Moon className="w-4 h-4" />
                ) : theme === "light" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </button>

              {showThemeMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-lg">
                  {["light", "dark", "system"].map((t_theme) => (
                    <button
                      key={t_theme}
                      onClick={() => {
                        setTheme(t_theme as "light" | "dark" | "system")
                        setShowThemeMenu(false)
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-muted transition-colors ${
                        theme === t_theme ? "bg-muted" : ""
                      }`}
                    >
                      {t_theme.charAt(0).toUpperCase() + t_theme.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
