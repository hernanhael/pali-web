"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoldDivider } from "@/components/ui/GoldDivider";

export function Footer() {
  const pathname = usePathname();

  const links = [
    { href: "/tratamientos", label: "Tratamientos" },
    { href: "/consultorio", label: "Consultorio" },
    { href: "/blog", label: "Blog" },
    ...(pathname !== "/turnos" ? [{ href: "/turnos", label: "Reservar turno" }] : []),
  ];

  return (
    <footer className="bg-bg py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <GoldDivider className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Marca */}
          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-2xl text-ink">Dra. María Paula Cajal</h3>
            <p className="font-sans text-sm text-[--text-secondary] leading-relaxed">
              Odontóloga. Especialista en estética dental, ortodoncia e implantes.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-gold">
              Navegación
            </h4>
            <ul className="flex flex-col gap-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-ink/70 hover:text-ink transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-gold">
              Contacto
            </h4>
            <ul className="flex flex-col gap-2 font-sans text-sm text-ink/70">
              <li>mariapaulacajal@gmail.com</li>
              <li>Lunes a Viernes · 9 a 18 hs</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-ink/40">
            © {new Date().getFullYear()} Dra. María Paula Cajal. Todos los derechos reservados.
          </p>
          <p className="font-sans text-xs text-ink/40">
            Diseño web minimalista · Buenos Aires, Argentina
          </p>
        </div>
      </div>
    </footer>
  );
}
