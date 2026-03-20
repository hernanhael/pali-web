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
| Imágenes       | Cloudinary (next-cloudinary) — `CldImage` en componentes     |
| Blog           | MDX (next-mdx-remote/rsc)                                    |
| Base de datos  | Prisma v5 + PostgreSQL (Supabase)                            |
| Email          | Resend                                                       |
| Hosting        | Vercel (región gru1 — São Paulo)                             |
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
/* Variables CSS globales — definidas en src/app/globals.css */
:root {
  --bg-primary:  #ECEBE8;
  --bg-glass:    rgba(198, 192, 182, 0.35);
  --bg-surface:  rgba(236, 235, 232, 0.80);
  --blue-soft:   #AABAC6;
  --blue-mid:    #768B9A;
  --gray-warm:   #C6C0B6;
  --gold:        #C8A96E;
  --gold-light:  #E8D5A3;
  --gold-dark:   #A07840;
  --text-primary:   #2B2B2B;
  --text-secondary: #768B9A;
}
```

### Tailwind — Colores Personalizados (tailwind.config.ts)

```ts
colors: {
  bg:      '#ECEBE8',
  glass:   'rgba(198, 192, 182, 0.35)',
  surface: 'rgba(236, 235, 232, 0.80)',
  blue: {
    soft: '#AABAC6',
    mid:  '#768B9A',
  },
  warm:  '#C6C0B6',
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
- Variables CSS: `--font-cormorant` y `--font-dm-sans` (vía `next/font/google`)

### Principios de Animación (Framer Motion)

- Duración base: 0.6s — no más de 0.9s para transiciones de sección
- Easing: `[0.16, 1, 0.3, 1]` (ease-out exponencial — suave y natural)
- Stagger en listas/grids: 0.08s entre elementos
- Scroll-triggered: usar `whileInView` + `viewport={{ once: true, amount: 0.2 }}`
- Hover: escala sutil 1.02, transición 0.3s
- Todas las variantes están en `src/lib/animations.ts` — importar siempre desde ahí

### Estilo Visual — Directrices

1. **Glassmorphism:** clase utilitaria `.glass` en `globals.css` — `backdrop-blur-md`, fondo semi-transparente, borde `1px solid rgba(255,255,255,0.5)`
2. **Sin bordes cuadrados:** `border-radius` mínimo 12px, preferir 20px–32px en cards grandes
3. **Layouts asimétricos:** Evitar grids perfectamente centrados. Usar offsets, columnas de distinto tamaño
4. **Espacio en blanco generoso:** padding vertical entre secciones mínimo `py-24` (`py-28` en la práctica)
5. **Líneas doradas como decoración:** usar el componente `<GoldDivider />`, no `<hr>` plano
6. **Sin sombras pesadas:** usar `shadow-sm` o sombras con opacidad baja
7. **Imágenes con aspect-ratio fijo:** `aspect-[4/5]` para retratos, `aspect-[16/9]` para consultorio
8. **Imágenes:** siempre via `CldImage` de `next-cloudinary` — nunca hardcodear URLs ni subir al repo

---

## Estructura de Archivos

```
src/
├── app/
│   ├── layout.tsx                  # Layout global: fuentes, metadata SEO, Schema.org, Navbar/Footer/WA
│   ├── page.tsx                    # Home: HeroSection → AboutSection → CredentialsSection → TestimonialsSection
│   ├── sitemap.ts                  # Sitemap automático (rutas estáticas + artículos MDX)
│   ├── robots.ts                   # robots.txt (bloquea /admin/ y /api/)
│   ├── globals.css                 # Variables CSS, estilos base, .glass, .gold-divider
│   ├── tratamientos/
│   │   ├── layout.tsx              # Metadata de la sección (necesario porque page.tsx es "use client")
│   │   └── page.tsx                # Grid con filtros por categoría + modal con BeforeAfterSlider
│   ├── consultorio/
│   │   └── page.tsx                # Galería masonry + ToolCard flip-on-hover
│   ├── turnos/
│   │   └── page.tsx                # Layout asimétrico: info lateral + formulario glassmorphism
│   ├── blog/
│   │   ├── page.tsx                # Listado de artículos
│   │   └── [slug]/page.tsx         # Artículo individual con MDX (next-mdx-remote/rsc)
│   ├── admin/
│   │   └── turnos/page.tsx         # Panel admin: login con ADMIN_SECRET, lista y cambio de estado
│   └── api/
│       ├── turnos/route.ts         # POST: guarda turno en DB + emails con Resend
│       └── admin/turnos/route.ts   # GET: listar turnos | PATCH: cambiar estado (protegido)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              # Navbar flotante con blur, menú móvil animado
│   │   ├── Footer.tsx
│   │   └── WhatsAppButton.tsx      # Botón flotante (actualizar número real)
│   ├── home/
│   │   ├── HeroSection.tsx         # Foto + nombre + CTA + stats con CountUp + scroll indicator
│   │   ├── AboutSection.tsx        # Bio, valores en columnas asimétricas
│   │   ├── CredentialsSection.tsx  # Título featured + grid especializaciones + grid cursos
│   │   ├── DiplomaCard.tsx         # Card con CldImage + variantes featured/medium/compact
│   │   └── TestimonialsSection.tsx
│   ├── tratamientos/
│   │   ├── TreatmentCard.tsx       # Card con modal de detalle
│   │   └── BeforeAfterSlider.tsx   # Slider drag (mouse + touch)
│   ├── consultorio/
│   │   ├── OfficeGallery.tsx       # Galería masonry (columns CSS)
│   │   └── ToolCard.tsx            # Card flip-on-hover (CSS 3D transform)
│   ├── turnos/
│   │   ├── TurnoForm.tsx           # react-hook-form + zod, POST a /api/turnos
│   │   └── ConfirmationModal.tsx
│   ├── blog/
│   │   ├── ArticleCard.tsx         # Card con CldImage para coverImage
│   │   └── MDXComponents.tsx       # h1–h3, p, ul, li, blockquote, hr, a custom
│   └── ui/
│       ├── GoldDivider.tsx         # Separador animado con scaleX
│       ├── SectionTitle.tsx        # eyebrow + h2 + subtitle con stagger
│       ├── GlassCard.tsx           # Card glassmorphism reutilizable
│       ├── DiplomaLightbox.tsx     # Modal fullscreen con CldImage
│       └── CountUp.tsx             # Contador animado (useInView + interval)
│
├── lib/
│   ├── prisma.ts                   # Singleton PrismaClient
│   ├── resend.ts                   # sendConfirmationEmail + sendNotificationEmail (lazy init)
│   ├── cloudinary.ts               # Helper cloudinaryUrl() para transformaciones manuales
│   ├── animations.ts               # fadeUp, fadeIn, fadeLeft, fadeRight, stagger, scaleIn, viewportConfig
│   ├── turno-schema.ts             # Zod schema TurnoFormData (compartido cliente/servidor)
│   └── blog.ts                     # getAllArticles() + getArticleBySlug() con gray-matter
│
├── data/
│   ├── credentials.ts              # Tipo Diploma + array credentials[] con placeholder data
│   └── treatments.ts               # Tipo Treatment + array treatments[] con 8 tratamientos
│
└── content/
    └── blog/
        ├── cuidado-diario-dientes.mdx
        └── ortodoncia-invisible-vs-brackets.mdx
```

---

## Notas importantes de implementación

### Páginas "use client" y metadata
Las páginas que usan `"use client"` (como `/tratamientos`) no pueden exportar `metadata` directamente. La solución es crear un `layout.tsx` en el mismo directorio que sí puede exportarla.

### Prisma — versión v5
Se usa **Prisma v5** (no v7). La v7 cambió el sistema de configuración y es incompatible con el `prisma/schema.prisma` actual. No actualizar sin revisar el migration guide.

### Resend — inicialización lazy
El cliente Resend se crea dentro de la función (`getResend()`), no al importar el módulo. Esto evita errores de build cuando `RESEND_API_KEY` no está definida. Si no hay API key, las funciones de email simplemente no hacen nada.

### Imágenes con Cloudinary
- Usar `CldImage` de `next-cloudinary` en todos los componentes con imagen real
- El `public_id` de Cloudinary se guarda en `cloudinaryId` (diplomas) o `coverImage` (blog)
- Para la foto principal del hero: definir `NEXT_PUBLIC_HERO_IMAGE_ID` en `.env.local`
- El helper `cloudinaryUrl()` en `lib/cloudinary.ts` es para transformaciones manuales cuando no se usa `CldImage`

---

## Secciones y Componentes Clave

### 1. Home (`/`)
- **HeroSection:** foto asimétrica con `CldImage` (NEXT_PUBLIC_HERO_IMAGE_ID), nombre en serif, stats con `CountUp`, scroll indicator
- **AboutSection:** bio + valores en columnas, card flotante con cita
- **CredentialsSection:** diploma featured + grid especializaciones + grid cursos, click → `DiplomaLightbox`
- **TestimonialsSection:** grid de 3 cards glassmorphism
- Datos de diplomas en `src/data/credentials.ts`

### 2. Tratamientos (`/tratamientos`)
- Filtros por categoría (Todos / Estética / Ortodoncia / Implantes / General)
- `TreatmentCard` abre modal con `BeforeAfterSlider` drag (mouse + touch)
- Datos en `src/data/treatments.ts`

### 3. Consultorio (`/consultorio`)
- `OfficeGallery`: galería masonry con `columns` CSS, items con placeholder
- `ToolCard`: flip CSS 3D on-hover — frente foto, dorso descripción + propósito
- 6 herramientas definidas inline en la página

### 4. Turnos (`/turnos`)
- Layout asimétrico: columna info (sticky) + formulario glassmorphism
- `TurnoForm`: react-hook-form + zod (`turno-schema.ts`), POST a `/api/turnos`
- `ConfirmationModal` con animación de entrada + ícono checkmark

### 5. Blog (`/blog` y `/blog/[slug]`)
- Artículos en `src/content/blog/*.mdx` con frontmatter: `title`, `excerpt`, `category`, `date`, `coverImage`
- `getAllArticles()` y `getArticleBySlug()` en `lib/blog.ts` con `gray-matter`
- `MDXComponents` define h1–h3, párrafos, listas, blockquote y separadores con estilo editorial
- Artículo individual renderiza con `next-mdx-remote/rsc` + CTA de turno al final

### 6. Admin (`/admin/turnos`)
- Protegido por contraseña (`ADMIN_SECRET`)
- Lista turnos con filtro por estado
- Cambio de estado inline (pendiente → confirmado → cancelado)

---

## Base de Datos (Prisma Schema)

```prisma
model Turno {
  id             String   @id @default(cuid())
  nombre         String
  email          String
  telefono       String
  tipoConsulta   String
  fechaPreferida DateTime
  horario        String
  mensaje        String?
  estado         String   @default("pendiente") // pendiente | confirmado | cancelado
  createdAt      DateTime @default(now())
}
```

---

## Variables de Entorno (`.env.local`)

Ver `.env.local.example` en la raíz del proyecto para instrucciones detalladas.

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

# Sitio (para SEO y sitemap)
NEXT_PUBLIC_SITE_URL="https://www.dra-cajal.com"

# Foto principal del hero (public_id en Cloudinary)
NEXT_PUBLIC_HERO_IMAGE_ID=""

# Admin
ADMIN_SECRET="clave-segura"
```

---

## Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Generar cliente Prisma
npx prisma generate

# Crear tablas en Supabase (solo una vez)
npx prisma db push

# Desarrollo local
npm run dev

# Build de producción
npm run build

# Deploy (Vercel detecta push a main automáticamente)
git push origin main
```

> **Nota Vercel:** el `vercel.json` define `buildCommand: "prisma generate && next build"` para que el cliente Prisma se genere antes de compilar.

---

## SEO y Performance

- `metadataBase` configurado con `NEXT_PUBLIC_SITE_URL`
- `title` con template `"%s — Dra. María Paula Cajal"` en todas las páginas
- Schema.org `LocalBusiness + Physician` inyectado en el `<head>` del layout global
- `/sitemap.xml` generado automáticamente (rutas estáticas + blog)
- `/robots.txt` generado automáticamente (bloquea `/admin/` y `/api/`)
- `CldImage` para todas las imágenes (optimización automática vía Cloudinary)
- Fuentes con `next/font/google` (sin layout shift)
- `scroll-padding-top: 80px` para compensar la navbar fija en anchor links
- Objetivo Lighthouse: 90+ en Performance, Accessibility, SEO

---

## Convenciones de Código

- Componentes: PascalCase, un componente por archivo
- Hooks custom: prefijo `use` (ej. `useTurnoForm.ts`)
- Variables CSS en `globals.css`, no hardcodear colores en componentes
- Animaciones: importar siempre desde `lib/animations.ts`
- No usar `any` en TypeScript
- Imágenes: subir a Cloudinary, nunca al repo. Usar `CldImage` en componentes
- Metadata en páginas `"use client"`: crear `layout.tsx` en el mismo directorio

---

## Verificación Final (Checklist de Deploy)

1. `npm run dev` → navegar todas las rutas sin errores
2. Slider before/after funciona con drag en mobile y desktop
3. `TurnoForm`: enviar turno de prueba
   - Aparece en Supabase dashboard (tabla `Turno`)
   - Email de confirmación llega al paciente
   - Email de aviso llega a la doctora
4. Blog: artículo MDX renderiza con componentes custom
5. `/admin/turnos`: login con `ADMIN_SECRET`, cambio de estado funciona
6. Lighthouse en `/` → 90+ en Performance, Accessibility, Best Practices, SEO
7. Responsive: probar en 375px, 768px, 1280px, 1920px
8. Sitemap en `/sitemap.xml` incluye todos los artículos

---

## Estado actual del proyecto (sesión 2026-03-19)

### ✅ Completado

- **Supabase configurado:** tabla `Turno` creada. Conexión via pooler (puerto 6543) + directUrl (puerto 5432) en `prisma/schema.prisma`.
- **Cloudinary configurado:** cloud `ds2fujktd`. Foto del hero cargada (`NEXT_PUBLIC_HERO_IMAGE_ID=2_lzr1ji`).
- **Resend configurado:** API key cargada. Modo sandbox activo (`EMAIL_FROM=onboarding@resend.dev`) hasta tener dominio propio.
- **CTAs de turnos reducidos:** eliminados los botones "Reservar turno" del final de Consultorio, el modal de Tratamientos y el final de artículos del Blog. Solo quedan los del navbar y footer.

### ⏳ Pendiente

1. **Dominio propio** — comprar (ej. `dra-cajal.com`) y apuntarlo a Vercel.
2. **Resend + dominio** — verificar el dominio en Resend y actualizar `EMAIL_FROM` en `.env.local` (y en Vercel) para que los emails lleguen a cualquier paciente.
3. **Imágenes en Cloudinary** — subir y cargar los Public IDs de:
   - Diplomas y certificados (`src/data/credentials.ts` → campo `cloudinaryId`)
   - Fotos before/after de tratamientos (`src/data/treatments.ts` → campo `cloudinaryIds`)
   - Fotos del consultorio (`src/components/consultorio/OfficeGallery.tsx`)
4. **Deploy en Vercel** — conectar el repo de GitHub, cargar todas las variables de entorno del `.env.local` y hacer el primer deploy.
5. **Actualizar `NEXT_PUBLIC_SITE_URL`** — reemplazar `http://localhost:3000` por la URL real de producción en Vercel (antes de tener dominio: `https://pali-web.vercel.app` o similar).
6. **`ADMIN_SECRET`** — cambiar el valor placeholder por una contraseña segura real.
7. **Número de WhatsApp** — actualizar en `src/components/layout/WhatsAppButton.tsx`.
8. **Datos reales** — reemplazar los datos placeholder de diplomas, tratamientos y testimonios con la información real de la doctora.
