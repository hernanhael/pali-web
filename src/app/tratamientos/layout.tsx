import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tratamientos — Dra. María Paula Cajal",
  description:
    "Blanqueamiento, carillas de porcelana, ortodoncia invisible, implantes dentales y más. Tratamientos odontológicos personalizados en Buenos Aires.",
  openGraph: {
    title: "Tratamientos — Dra. María Paula Cajal",
    description:
      "Blanqueamiento, carillas, ortodoncia invisible e implantes en Buenos Aires.",
    locale: "es_AR",
    type: "website",
  },
};

export default function TratamientosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
