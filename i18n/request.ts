import { cookieName } from "@/constants/i18n";
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieLocale = (await cookies()).get(cookieName)?.value || "en";

  const locale =
    cookieLocale === "ar" || cookieLocale === "en" ? cookieLocale : "en";

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
