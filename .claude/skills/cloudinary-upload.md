---
name: cloudinary-upload
description: Guía para subir y organizar imágenes en Cloudinary siguiendo el esquema de carpetas del proyecto y usando CldImage en componentes.
---

# Skill: cloudinary-upload

## Cuándo aplicar este skill
Cada vez que haya que subir imágenes nuevas al proyecto — fotos de la doctora, tratamientos, consultorio, diplomas o imágenes de blog.

## Regla Fundamental
**Nunca** guardar imágenes en el repositorio. Toda imagen va a Cloudinary y se referencia por su `public_id`.

## Estructura de Carpetas en Cloudinary

Usar siempre este esquema para los `public_id`:

```
dra-cajal/
├── hero/
│   └── foto-principal              # foto principal de la Dra. Cajal
├── tratamientos/
│   ├── {slug}-antes                # ej: blanqueamiento-antes
│   └── {slug}-despues              # ej: blanqueamiento-despues
├── consultorio/
│   ├── sala-espera
│   ├── sillon-principal
│   └── recepcion
├── herramientas/
│   └── {nombre-herramienta}        # ej: escaner-3d
├── diplomas/
│   ├── titulo-principal
│   ├── especializacion-{nombre}    # ej: especializacion-ortodoncia
│   └── curso-{nombre}             # ej: curso-implantes-2023
└── blog/
    └── {slug-articulo}             # imagen de portada del artículo
```

## Proceso de Upload

### 1. Subir desde el Dashboard de Cloudinary
1. Ir a [cloudinary.com](https://cloudinary.com) → Media Library
2. Navegar a la carpeta `dra-cajal/` (crearla si no existe)
3. Subir la imagen en la subcarpeta correcta
4. Renombrar el archivo según el esquema de arriba ANTES de subir
5. Copiar el `public_id` completo (ej: `dra-cajal/tratamientos/blanqueamiento-antes`)

### 2. Usar en el código con CldImage
```tsx
import { CldImage } from 'next-cloudinary'

<CldImage
  src="dra-cajal/tratamientos/blanqueamiento-antes"
  width={800}
  height={1000}
  alt="Blanqueamiento dental - antes del tratamiento"
  quality="auto"
  format="auto"
  className="aspect-[4/5] object-cover rounded-2xl"
/>
```

### 3. Agregar a `credentials.ts` (solo para diplomas)
```ts
// src/data/credentials.ts
{
  id: 'especializacion-ortodoncia',
  title: 'Especialización en Ortodoncia',
  institution: 'Universidad Nacional de Tucumán',
  year: 2019,
  category: 'especializacion',
  cloudinaryId: 'dra-cajal/diplomas/especializacion-ortodoncia',
}
```

## Configuraciones de Imagen por Contexto

### Hero (foto principal de la doctora)
```tsx
<CldImage
  src="dra-cajal/hero/foto-principal"
  priority={true}
  fetchPriority="high"
  quality="auto:best"
  format="auto"
  crop="fill"
  gravity="face"        // crop inteligente centrado en la cara
  sizes="(max-width: 768px) 100vw, 60vw"
/>
```

### Tratamientos — before/after
```tsx
// Ambas fotos deben tener el mismo aspect ratio
<CldImage
  src="dra-cajal/tratamientos/blanqueamiento-antes"
  crop="fill"
  gravity="face"
  quality="auto"
  format="auto"
/>
```

### Galería del consultorio
```tsx
<CldImage
  src="dra-cajal/consultorio/sala-espera"
  crop="fill"
  gravity="auto"
  quality="auto"
  format="auto"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### Diplomas
```tsx
<CldImage
  src="dra-cajal/diplomas/titulo-principal"
  quality="auto:best"   // calidad alta para documentos con texto
  format="auto"
  // sin crop — mostrar el diploma completo
/>
```

## Formatos Recomendados para Upload

| Tipo de imagen | Formato a subir | Por qué |
|----------------|-----------------|---------|
| Fotos (doctora, consultorio) | JPG | Cloudinary convierte a webp/avif automáticamente |
| Diplomas, documentos | PNG o JPG alta calidad | Preservar texto legible |
| Before/after | JPG | Misma configuración en ambas |
| Blog (portadas) | JPG | Tamaño equilibrado |

Cloudinary se encarga de optimizar y convertir — no es necesario subir webp manualmente.

## Checklist antes de subir
- [ ] Nombre del archivo sigue el esquema `dra-cajal/{carpeta}/{nombre}`
- [ ] Sin espacios ni caracteres especiales en el nombre (usar guiones)
- [ ] Fotos de personas: orientación correcta, bien encuadradas
- [ ] Before/after: mismo encuadre y aspect ratio en ambas fotos
- [ ] Diplomas: foto nítida, sin sombras ni reflejos
