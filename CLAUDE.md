# CLAUDE.md — Sitio Web Dra. María Paula Cajal

## Descripción del Proyecto

Sitio web profesional para la Dra. María Paula Cajal, odontóloga. El sitio combina portfolio, presentación personal, galería de tratamientos, presentación del consultorio y sistema de reserva de turnos online. El diseño es minimalista, no convencional, con animaciones suaves y alta fluidez.

---

## Stack Tecnológico

| Capa           | Tecnología                                                   |
| -------------- | ------------------------------------------------------------ |
| Framework      | Next.js 14 (App Router)                                      |
| Lenguaje       | TypeScript (strict mode)                                     |
| Estilos        | Tailwind CSS v3                                              |
| Componentes UI | shadcn/ui                                                    |
| Animaciones    | Framer Motion                                                |
| Imágenes       | Cloudinary (next-cloudinary)                                 |
| Blog           | MDX (next-mdx-remote)                                        |
| Base de datos  | Prisma + PostgreSQL (Supabase)                               |
| Email          | Resend                                                       |
| Hosting        | Vercel                                                       |
| Fuentes        | Google Fonts: Cormorant Garamond (headings) + DM Sans (body) |

---

## Sistema de Diseño

### Paleta de Colores (Sherwin-Williams)

| Código SW | Nombre | Hex | Uso |
|---|---|---|---|
| SW 9542 | Natural White | `#ECEBE8` | Fondo principal |
| SW 6240 | Windy Blue | `#AABAC6` | Acento suave, glassmorphism |
| SW 6242 | Bracing Blue | `#768B9A` | Texto secundario, bordes activos |
| SW 7641 | Colonnade Gray | `#C6C0B6` | Superficies, separadores |
| — | Dorado | `#C8A96E` | Acento editorial, mantener |

```css
/* Variables CSS globales — definir en globals.css */
:root {
  --bg-primary:  #ECEBE8;                    /* SW 9542 Natural White */
  --bg-glass:    rgba(198, 192, 182, 0.35);  /* SW 7641 con transparencia */
  --bg-surface:  rgba(236, 235, 232, 0.80);  /* SW 9542 con transparencia */

  --blue-soft:   #AABAC6;   /* SW 6240 Windy Blue */
  --blue-mid:    #768B9A;   /* SW 6242 Bracing Blue */
  --gray-warm:   #C6C0B6;   /* SW 7641 Colonnade Gray */
  --gray-text:   #4A5568;   /* Mantener para legibilidad */

  --gold:        #C8A96E;
  --gold-light:  #E8D5A3;
  --gold-dark:   #A07840;

  --text-primary:   #2B2B2B;   /* Neutro cálido (reemplaza ink azulado) */
  --text-secondary: #768B9A;   /* SW 6242 */
}
```

### Tailwind — Colores Personalizados (tailwind.config.ts)

```ts
colors: {
  bg:      '#ECEBE8',
  glass:   'rgba(198, 192, 182, 0.35)',
  surface: 'rgba(236, 235, 232, 0.80)',
  blue: {
    soft: '#AABAC6',   // SW 6240 Windy Blue
    mid:  '#768B9A',   // SW 6242 Bracing Blue
  },
  warm:  '#C6C0B6',    // SW 7641 Colonnade Gray
  gold: {
    DEFAULT: '#C8A96E',
    light:   '#E8D5A3',
    dark:    '#A07840',
  },
  ink: '#2B2B2B',
}
```

### Tipografía

- Headings: Cormorant Garamond — serif elegante, da carácter editorial y sofisticado
- Body / UI: DM Sans — sans-serif moderno, legible, amigable
- Tamaños base: Mobile-first con `clamp()` para fluidez responsive

```css
h1 { font-family: 'Cormorant Garamond'; font-size: clamp(2.5rem, 6vw, 5rem); }
h2 { font-family: 'Cormorant Garamond'; font-size: clamp(2rem, 4vw, 3.5rem); }
p  { font-family: 'DM Sans'; font-size: clamp(0.95rem, 1.5vw, 1.1rem); }
```

### Principios de Animación (Framer Motion)

- Duración base: 0.6s — no más de 0.9s para transiciones de sección
- Easing: `[0.16, 1, 0.3, 1]` (ease-out exponencial — suave y natural)
- Stagger en listas/grids: 0.08s entre elementos
- Scroll-triggered: usar `whileInView` + `viewport={{ once: true, amount: 0.2 }}`
- Hover: escala sutil 1.02, transición 0.3s
- No usar: rebotes excesivos, rotaciones aleatorias, efectos de "carga" largos

```ts
// Variante reutilizable de entrada
export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

export const stagger = {
  visible: { transition: { staggerChildren: 0.08 } }
}
```

### Estilo Visual — Directrices

1. **Glassmorphism:** Cards con `backdrop-blur-md`, fondo semi-transparente, borde `1px solid rgba(255,255,255,0.5)`
2. **Sin bordes cuadrados:** `border-radius` mínimo 12px, preferir 20px–32px en cards grandes
3. **Layouts asimétricos:** Evitar grids perfectamente centrados. Usar offsets, columnas de distinto tamaño
4. **Espacio en blanco generoso:** padding vertical entre secciones mínimo `py-24`
5. **Líneas doradas como decoración:** separadores finos `h-px bg-gold/40`, no usar `<hr>` plano
6. **Sin sombras pesadas:** usar `shadow-sm` o sombras personalizadas suaves con opacidad baja
7. **Imágenes con aspect-ratio fijo:** `aspect-[4/5]` para retratos, `aspect-[16/9]` para consultorio
8. **Cursor personalizado (opcional):** cursor circular que cambia al hover en elementos interactivos

---

## Estructura de Archivos

```
src/
├── app/
│   ├── layout.tsx               # Layout global, fuentes, metadata SEO
│   ├── page.tsx                 # Página home (sección "Quién soy")
│   ├── tratamientos/
│   │   └── page.tsx             # Galería de tratamientos
│   ├── consultorio/
│   │   └── page.tsx             # Fotos y herramientas del consultorio
│   ├── turnos/
│   │   └── page.tsx             # Formulario de reserva
│   ├── blog/
│   │   ├── page.tsx             # Listado de artículos
│   │   └── [slug]/page.tsx      # Artículo individual
│   └── api/
│       ├── turnos/
│       │   └── route.ts         # POST: guardar turno en DB + enviar email
│       └── admin/
│           └── turnos/route.ts  # GET: listar turnos (protegido)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # Navbar flotante con blur
│   │   ├── Footer.tsx
│   │   └── WhatsAppButton.tsx   # Botón flotante WhatsApp
│   ├── home/
│   │   ├── HeroSection.tsx      # Foto + nombre + frase + CTA
│   │   ├── AboutSection.tsx     # Bio, formación, valores
│   │   ├── CredentialsSection.tsx  # Sección diplomas y certificados
│   │   ├── DiplomaCard.tsx      # Card imagen + caption (variante featured)
│   │   └── TestimonialsSection.tsx
│   ├── tratamientos/
│   │   ├── TreatmentCard.tsx    # Card con before/after slider
│   │   └── BeforeAfterSlider.tsx # Slider interactivo con drag
│   ├── consultorio/
│   │   ├── OfficeGallery.tsx    # Grilla de fotos del consultorio
│   │   └── ToolCard.tsx         # Card de herramienta con flip/hover
│   ├── turnos/
│   │   ├── TurnoForm.tsx        # Formulario de reserva
│   │   └── ConfirmationModal.tsx
│   ├── blog/
│   │   ├── ArticleCard.tsx
│   │   └── MDXComponents.tsx    # Componentes custom para MDX
│   └── ui/
│       ├── GoldDivider.tsx      # Separador dorado decorativo
│       ├── SectionTitle.tsx     # Título de sección con estilo editorial
│       ├── GlassCard.tsx        # Card glassmorphism reutilizable
│       └── DiplomaLightbox.tsx  # Modal lightbox para diplomas
│
├── lib/
│   ├── prisma.ts                # Instancia Prisma singleton
│   ├── resend.ts                # Cliente Resend para emails
│   ├── cloudinary.ts            # Config Cloudinary
│   └── animations.ts            # Variantes Framer Motion reutilizables
│
├── data/
│   └── credentials.ts           # Datos placeholder de diplomas y certificados
│
├── content/
│   └── blog/                    # Archivos .mdx de artículos
│       └── ejemplo-articulo.mdx
│
└── styles/
    └── globals.css              # Variables CSS, estilos base, fuentes
```

---

## Secciones y Componentes Clave

### 1. Home — "Quién soy" (`/`)

- Hero con foto grande en asimetría, nombre editorial en serif grande
- Frase personal o lema profesional en dorado
- Scroll indicator animado (línea que baja)
- Bio en columnas asimétricas (texto 60% / detalle visual 40%)
- Logros / números animados: años de experiencia, pacientes, tratamientos
- Botón CTA: "Reservar turno" → `/turnos`
- **Orden de secciones:** HeroSection → AboutSection → CredentialsSection → TestimonialsSection

### 1b. Home — Formación Académica (`CredentialsSection`)

- **Título universitario:** `DiplomaCard` con variante `featured` — imagen grande, borde dorado, caption prominente
- **Especializaciones/Posgrados:** grid de 3 columnas de `DiplomaCard` medianas
- **Cursos y certificados:** grid de 4 columnas de `DiplomaCard` compactas
- Click en cualquier imagen → `DiplomaLightbox` con imagen a tamaño completo
- Datos en `src/data/credentials.ts` con tipo `Diploma` (category: 'titulo' | 'especializacion' | 'curso')
- Imágenes en Cloudinary (cloudinaryId como public_id)

### 2. Tratamientos (`/tratamientos`)

- Intro con título editorial
- Grid asimétrico de tratamientos (cards de distintos tamaños)
- Cada card: nombre del tratamiento, descripción breve, slider before/after
- Al hacer click: modal o página de detalle con más imágenes y explicación completa
- Categorías filtrables (Estética, Ortodoncia, Implantes, General)

### 3. Consultorio (`/consultorio`)

- Galería masonry de fotos del espacio
- Sección "Tecnología y herramientas": cards con flip-on-hover
  - Frente: foto de la herramienta
  - Dorso: nombre, descripción, para qué sirve
- Texto sobre el ambiente y la experiencia del paciente

### 4. Turnos (`/turnos`)

- Formulario en card glassmorphism centrado
- Campos: nombre completo, email, teléfono, tipo de consulta (select), fecha preferida, horario preferido, mensaje
- Validación en cliente con react-hook-form + zod
- Al enviar: POST a `/api/turnos` → guarda en PostgreSQL → email confirmación al paciente → email aviso a la doctora
- Modal de confirmación con animación suave

### 5. Blog (`/blog`)

- Grid de artículos con imagen de portada, categoría, título y extracto
- Artículos escritos en `.mdx`
- Componentes custom: cita destacada, imagen con caption, alerta informativa

---

## Base de Datos (Prisma Schema)

```prisma
model Turno {
  id            String   @id @default(cuid())
  nombre        String
  email         String
  telefono      String
  tipoConsulta  String
  fechaPreferida DateTime
  horario       String
  mensaje       String?
  estado        String   @default("pendiente") // pendiente | confirmado | cancelado
  createdAt     DateTime @default(now())
}
```

---

## Variables de Entorno (`.env.local`)

```env
# Base de datos (Supabase)
DATABASE_URL="postgresql://..."

# Resend (emails)
RESEND_API_KEY="re_..."
EMAIL_FROM="turnos@dra-cajal.com"
EMAIL_DOCTORA="mariapaulacajal@gmail.com"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Admin (acceso simple al panel de turnos)
ADMIN_SECRET="tu-clave-secreta"
```

---

## Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Inicializar base de datos
npx prisma generate
npx prisma db push

# Desarrollo local
npm run dev

# Build de producción
npm run build

# Deploy (automático con Vercel en push a main)
git push origin main
```

---

## SEO y Performance

- `metadata` de Next.js en cada página (title, description, og:image)
- `next/image` para todas las imágenes (optimización automática)
- Fuentes con `next/font` (sin layout shift)
- Objetivo Lighthouse: 90+ en Performance, Accessibility, SEO
- Schema.org: `LocalBusiness` + `Physician` para SEO local

---

## Convenciones de Código

- Componentes: PascalCase, un componente por archivo
- Hooks custom: prefijo `use` (ej. `useTurnoForm.ts`)
- Variables CSS en `globals.css`, no hardcodear colores en componentes
- Animaciones: importar siempre desde `lib/animations.ts`
- No usar `any` en TypeScript
- Imágenes del proyecto: subir a Cloudinary, nunca al repo

---

## Stack Tecnológico (resumen)

| Capa        | Tecnología                     | Justificación                 |
| ----------- | ------------------------------ | ----------------------------- |
| Framework   | Next.js 14 (App Router)        | SEO superior, SSR/SSG híbrido |
| Lenguaje    | TypeScript                     | Tipado fuerte                 |
| Estilos     | Tailwind CSS + shadcn/ui       | Rápido, consistente           |
| Animaciones | Framer Motion                  | Transiciones suaves           |
| Imágenes    | Cloudinary                     | Optimización automática       |
| Blog        | MDX + next-mdx-remote          | Artículos en Markdown + React |
| Turnos (DB) | Prisma + PostgreSQL (Supabase) | Gratuito, gestionado          |
| Emails      | Resend                         | Confirmaciones automáticas    |
| Hosting     | Vercel                         | Deploy automático             |

---

## Verificación Final

1. `npm run dev` → verificar todas las rutas navegables
2. Slider before/after funciona con drag en mobile y desktop
3. Enviar turno de prueba:
   - Aparece en DB (Supabase dashboard)
   - Email llega al paciente
   - Email llega a la doctora
4. Blog: artículo MDX renderiza correctamente con componentes custom
5. Lighthouse en `/` → 90+ en Performance, Accessibility, Best Practices, SEO
6. Responsive: probar en 375px, 768px, 1280px, 1920px

---
