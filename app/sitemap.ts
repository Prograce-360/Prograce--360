import type { MetadataRoute } from "next";

const baseUrl = "https://prograce.cd";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
  "",
  "/se connecter",
  "/registre",
  "/tableau de bord",
];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency:
      route === "" ? "weekly" : "monthly",
    priority:
      route === "" ? 1 : 0.7,
  }));
}
