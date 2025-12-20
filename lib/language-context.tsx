"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language | null
    if (saved) {
      setLanguage(saved)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("language", language)
      document.documentElement.lang = language
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
    }
  }, [language, mounted])

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}

const translations = {
  en: {
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.about": "About",
    "nav.contact": "Contact",
    "hero.greeting": "Hello, I'm a Full Stack Developer",
    "hero.subtitle": "I build modern, responsive web applications with beautiful UI and solid backend architecture",
    "hero.cta": "View My Work",
    "hero.available": "Available for freelance work",
    "projects.title": "Featured Projects",
    "projects.subtitle": "Explore my recent work and technical achievements",
    "about.title": "About Me",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.tools": "Tools & More",
    "contact.title": "Get In Touch",
    "contact.emailLabel": "Email",
    "contact.phoneLabel": "Phone",
    "contact.locationLabel": "Location",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",
    "project.viewLive": "View Live",
    "project.viewCode": "View Code",
    "project.technologies": "Technologies",
    "project.features": "Main Features",
    "project.gallery": "Project Gallery",
    "project.viewFull": "View Full",
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.projects": "المشاريع",
    "nav.about": "عني",
    "nav.contact": "اتصل",
    "hero.greeting": "مرحباً، أنا مطور Full Stack",
    "hero.subtitle": "أقوم ببناء تطبيقات ويب حديثة وسريعة الاستجابة بواجهات مستخدم جميلة وهندسة خلفية قوية",
    "hero.cta": "اعرض أعمالي",
    "hero.available": "متاح للعمل الحر",
    "projects.title": "المشاريع المختارة",
    "projects.subtitle": "استكشف أعمالي الأخيرة والإنجازات التقنية",
    "about.title": "عني",
    "skills.frontend": "الواجهة الأمامية",
    "skills.backend": "الخلفية",
    "skills.tools": "الأدوات والمزيد",
    "contact.title": "تواصل معي",
    "contact.emailLabel": "البريد الإلكتروني",
    "contact.phoneLabel": "الهاتف",
    "contact.locationLabel": "الموقع",
    "theme.light": "فاتح",
    "theme.dark": "داكن",
    "theme.system": "النظام",
    "project.viewLive": "عرض مباشر",
    "project.viewCode": "عرض الكود",
    "project.technologies": "التقنيات",
    "project.features": "المزايا الرئيسية",
    "project.gallery": "معرض المشروع",
    "project.viewFull": "عرض كامل",
  },
}
