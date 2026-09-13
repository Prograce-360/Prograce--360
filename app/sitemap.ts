import type { MetadataRoute } from "next";

const baseUrl = "https://programme-360.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["","/solutions","/solutions/business-manager","/solutions/marketing-digital","/learning","/bibliotheque","/boutique","/boutique/outils","/boutique/documents","/boutique/ebooks","/boutique/formations","/boutique/packs","/tutos","/insights","/assistant","/a-propos","/contact","/faq","/connexion","/inscription"];
  return routes.map((route) => ({url: baseUrl + route,lastModified: new Date(),changeFrequency: route === "" ? "weekly" : "monthly",priority: route === "" ? 1 : 0.7}));
}
