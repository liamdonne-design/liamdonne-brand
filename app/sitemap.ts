import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

const SITE = "https://www.liamdonne.com";

/** /sitemap.xml: the English pages at the root, and every case study. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/about", "/playground"].map((p) => ({ url: `${SITE}${p}` }));
  const work = projects.filter((p) => p.ready).map((p) => ({ url: `${SITE}/work/${p.slug}` }));
  return [...pages, ...work];
}
