import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PROGRACE 360",
  description:
    "Des solutions numériques pour faire progresser votre entreprise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
