import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dra-cajal.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dra. María Paula Cajal — Odontología",
    template: "%s — Dra. María Paula Cajal",
  },
  description:
    "Odontóloga especialista en estética dental, ortodoncia e implantes en Buenos Aires. Reservá tu turno online.",
  keywords: [
    "odontóloga Buenos Aires",
    "dentista Buenos Aires",
    "blanqueamiento dental",
    "ortodoncia invisible",
    "implantes dentales",
    "carillas porcelana",
    "Dra Paula Cajal",
  ],
  openGraph: {
    title: "Dra. María Paula Cajal — Odontología",
    description:
      "Odontóloga especialista en estética dental, ortodoncia e implantes en Buenos Aires.",
    locale: "es_AR",
    type: "website",
    url: SITE_URL,
    siteName: "Dra. María Paula Cajal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dra. María Paula Cajal — Odontología",
    description: "Estética dental, ortodoncia e implantes en Buenos Aires.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Physician"],
  name: "Dra. María Paula Cajal",
  description:
    "Odontóloga especialista en estética dental, ortodoncia e implantes en Buenos Aires.",
  url: SITE_URL,
  telephone: "+54-11-0000-0000",
  email: "mariapaulacajal@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Buenos Aires",
    addressCountry: "AR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  medicalSpecialty: "Dentistry",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
