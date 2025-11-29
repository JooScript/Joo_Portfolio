import { getMessages } from "next-intl/server";
import type { AbstractIntlMessages } from "next-intl";

type MetadataParams = {
  locale: string;
  page?: string;
};

export async function buildPageMetadata({
  locale,
  page = "home",
}: MetadataParams) {
  const messages: AbstractIntlMessages = await getMessages({ locale });

  const pageSection = messages[page as keyof typeof messages];
  const isValidObject = typeof pageSection === "object" && pageSection !== null;

  const title =
    isValidObject && "title" in pageSection
      ? (pageSection as { title?: string }).title
      : undefined;

  const description =
    isValidObject && "description" in pageSection
      ? (pageSection as { description?: string }).description
      : undefined;

  const keywords =
    isValidObject && "keywords" in pageSection
      ? (pageSection as { keywords?: string[] }).keywords
      : [];

  return {
    title: title || `${capitalize(page)} | MySite`,
    description: description || `Default description for ${page}`,
    keywords: keywords?.length ? keywords : ["default", "keywords", page],
    openGraph: {
      title: title || `${capitalize(page)} | MySite`,
      description: description || `Default Open Graph description for ${page}`,
      locale,
      type: "website",
    },
    alternates: {
      canonical: `/${locale}/${page}`,
      languages: {
        en: `/en/${page}`,
        ar: `/ar/${page}`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Usage Example for Home Page

// export async function generateMetadata({
//   params,
// }: {
//   params: { locale: string };
// }) {
//   return buildPageMetadata({ locale: params.locale, page: "home" });
// }
