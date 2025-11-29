"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { useTranslations } from "next-intl";

export default function NavBar() {
  const { language, changeLanguage } = useLanguage();
  const t = useTranslations("home");

  return (
    <nav
      className="flex justify-between items-center p-4 bg-gray-800 text-white"
      style={{ direction: language === "ar" ? "rtl" : "ltr" }}
    >
      <div>{t("title")}</div>
      <button
        onClick={() => changeLanguage(language === "en" ? "ar" : "en")}
        className="bg-white text-gray-800 px-4 py-2 rounded"
      >
        {language === "en" ? "Arabic" : "الانجليزية"}
      </button>
    </nav>
  );
}
