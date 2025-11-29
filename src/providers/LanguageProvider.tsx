"use client";

import { cookieName } from "@/constants/i18n";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");
  const router = useRouter();

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${cookieName}=`))
      ?.split("=")[1] as Language | undefined;

    if (cookieLocale && (cookieLocale === "en" || cookieLocale === "ar")) {
      setLanguage(cookieLocale);
    } else {
      const browserLocale = navigator.language.slice(0, 2) as Language;
      const fallbackLocale: Language = browserLocale === "ar" ? "ar" : "en";
      changeLanguage(fallbackLocale);
    }
  }, [router]);

  const changeLanguage = (newLocale: Language) => {
    setLanguage(newLocale);
    document.cookie = `${cookieName}=${newLocale}; path=/;`;
    router.refresh();
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
