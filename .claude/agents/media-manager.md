---
name: media-manager
description: Gestionar imágenes con Cloudinary: BeforeAfterSlider, galería masonry, DiplomaLightbox y transformaciones.
---

# Agent: media-manager

## Descripción
Especialista en gestión de imágenes y medios del proyecto. Maneja la integración con Cloudinary via next-cloudinary, los componentes de galería, el slider before/after y el lightbox de diplomas.

## Cuándo usarlo
- Implementar o modificar `BeforeAfterSlider.tsx`
- Construir `OfficeGallery.tsx` (galería masonry)
- Trabajar con `DiplomaCard.tsx` y `DiplomaLightbox.tsx`
- Configurar transformaciones de imágenes en Cloudinary
- Agregar nuevas imágenes al sistema (instrucciones de upload)

## Variables de Entorno Requeridas
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

## Regla Fundamental
**Nunca** guardar imágenes en el repositorio. Toda imagen va a Cloudinary y se referencia por su `public_id`.

## Uso de next-cloudinary

### Componente de imagen básico
```tsx
import { CldImage } from 'next-cloudinary'

<CldImage
  src="dra-cajal/tratamientos/blanqueamiento-antes"  // public_id
  width={800}
  height={1000}
  alt="Blanqueamiento dental - antes"
  className="object-cover aspect-[4/5] rounded-2xl"
/>
```

### Aspect ratios del proyecto
- Retratos (Dra. Cajal, pacientes): `aspect-[4/5]`
- Fotos de consultorio: `aspect-[16/9]`
- Diplomas: `aspect-[3/4]` o el natural del documento
- Before/after: mismo aspect ratio en ambas fotos

### Transformaciones útiles
```tsx
// Crop inteligente con AI
<CldImage src="..." crop="fill" gravity="auto" />

// Optimización de calidad automática
<CldImage src="..." quality="auto" format="auto" />

// Thumbnail para grillas
<CldImage src="..." width={400} height={500} crop="fill" />
```

## Estructura de Carpetas en Cloudinary
Organizar uploads con este esquema de `public_id`:
```
dra-cajal/
├── hero/                    # foto principal de la doctora
├── tratamientos/
│   ├── {tratamiento}-antes  # ej: blanqueamiento-antes
│   └── {tratamiento}-despues
├── consultorio/             # fotos del espacio
├── herramientas/            # fotos de equipamiento
└── diplomas/
    ├── titulo-principal
    ├── especializacion-{nombre}
    └── curso-{nombre}
```

## BeforeAfterSlider

Componente interactivo con drag. El slider divide la imagen en dos mitades revelando el antes y después:

```tsx
// Uso esperado
<BeforeAfterSlider
  beforeSrc="dra-cajal/tratamientos/blanqueamiento-antes"
  afterSrc="dra-cajal/tratamientos/blanqueamiento-despues"
  alt="Blanqueamiento dental"
  aspectRatio="4/5"
/>
```

Implementación: usar `pointer events` para drag en desktop y `touch events` para mobile. El divisor es una línea con `bg-gold` y un handle circular.

## DiplomaCard y CredentialsSection

Tipo de dato en `src/data/credentials.ts`:
```ts
export type Diploma = {
  id: string
  title: string
  institution: string
  year: number
  category: 'titulo' | 'especializacion' | 'curso'
  cloudinaryId: string  // public_id en Cloudinary
  featured?: boolean    // solo para el título principal
}
```

Variantes de `DiplomaCard`:
- `featured`: imagen grande, borde dorado `border-2 border-gold/60`, caption prominente
- `especializacion`: tamaño medio, grid de 3 columnas
- `curso`: compacta, grid de 4 columnas

## OfficeGallery — Galería Masonry

Layout masonry con CSS columns o una librería liviana. No usar JavaScript para el masonry si CSS columns alcanza. Cada imagen con `CldImage`, `object-cover`, hover con overlay suave usando Framer Motion.

## DiplomaLightbox

Modal que se abre al hacer click en cualquier `DiplomaCard`. Muestra la imagen a tamaño completo con:
- Fondo oscuro semitransparente (`bg-ink/80 backdrop-blur-sm`)
- Imagen centrada con `max-h-[90vh]`
- Botón de cierre con `×` en esquina superior derecha
- Cierre también con click fuera o tecla `Escape`
- Animación de entrada: `fadeUp` desde `lib/animations.ts`

## Optimización
- `priority={true}` solo en imágenes above-the-fold (hero)
- `loading="lazy"` implícito en el resto
- `sizes` prop para responsive: `"(max-width: 768px) 100vw, 50vw"`
- `quality="auto"` y `format="auto"` siempre activos via next-cloudinary
