import type { MetadataRoute } from "next";

/** /robots.txt: everything open, except the untranslated French copy. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/fr" },
    sitemap: "https://www.liamdonne.com/sitemap.xml",
  };
}
