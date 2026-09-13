import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {userAgent: "*",allow: "/",disallow: ["/admin/","/mon-espace/"]},
    sitemap: "https://programme-360.vercel.app/sitemap.xml"
  };
}
