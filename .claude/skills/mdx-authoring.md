# Skill: mdx-authoring

## Cuándo aplicar este skill
Al crear un artículo nuevo para el blog, modificar uno existente, o explicarle a alguien no técnico cómo escribir artículos.

## Cómo Crear un Artículo Nuevo

### 1. Crear el archivo
Crear un nuevo archivo en `src/content/blog/` con nombre en formato `slug`:
```
src/content/blog/cuidados-post-blanqueamiento.mdx
```

El slug se convierte en la URL: `/blog/cuidados-post-blanqueamiento`

**Reglas para el slug:**
- Todo en minúsculas
- Espacios reemplazados por guiones
- Sin caracteres especiales (ñ → n, é → e)
- Descriptivo y corto

### 2. Completar el frontmatter
Todo artículo empieza con este bloque entre `---`:

```mdx
---
title: "Cómo cuidar tu sonrisa después de un blanqueamiento"
excerpt: "Los primeros 48 horas son clave. Te contamos qué podés comer y qué hábitos mantener para que el resultado dure más."
date: "2024-03-15"
category: "Cuidados"
coverImage: "dra-cajal/blog/blanqueamiento-cuidados"
author: "Dra. María Paula Cajal"
readingTime: 4
---
```

| Campo | Descripción |
|-------|-------------|
| `title` | Título del artículo (entre comillas) |
| `excerpt` | Resumen corto para la card (1–2 oraciones) |
| `date` | Fecha en formato `YYYY-MM-DD` |
| `category` | Una de: `Cuidados`, `Tratamientos`, `Noticias`, `Consejos` |
| `coverImage` | public_id de Cloudinary (ver skill `cloudinary-upload`) |
| `author` | Siempre `"Dra. María Paula Cajal"` |
| `readingTime` | Minutos estimados de lectura |

### 3. Escribir el contenido

Después del segundo `---`, empieza el contenido del artículo:

```mdx
---
(frontmatter)
---

Párrafo de introducción. Texto normal en DM Sans.

## Primer subtítulo

Más texto...

<Callout>
  Tip o información importante que querés destacar.
</Callout>

## Segundo subtítulo

<ImageCaption
  src="dra-cajal/blog/blanqueamiento-resultado"
  alt="Resultado de blanqueamiento a los 7 días"
  caption="Resultado visible a los 7 días del tratamiento"
/>

<Quote author="Dra. Cajal">
  La constancia en los cuidados post-tratamiento marca la diferencia.
</Quote>
```

## Componentes Disponibles

### `<Callout>` — información destacada
```mdx
<Callout>
  Evitá alimentos con colorantes las primeras 48 horas.
</Callout>

<Callout type="warning">
  Si sentís sensibilidad intensa, consultá antes de continuar.
</Callout>

<Callout type="info">
  Este tratamiento está disponible en el consultorio.
</Callout>
```
- Sin `type` o `type="tip"` → fondo dorado suave
- `type="warning"` → fondo azul suave
- `type="info"` → fondo gris suave

### `<ImageCaption>` — imagen con descripción
```mdx
<ImageCaption
  src="dra-cajal/blog/nombre-imagen"
  alt="Descripción de la imagen para accesibilidad"
  caption="Texto visible debajo de la imagen"
/>
```
La imagen debe estar subida a Cloudinary. Ver skill `cloudinary-upload`.

### `<Quote>` — cita editorial
```mdx
<Quote author="Dra. María Paula Cajal">
  La salud bucal refleja el cuidado integral de uno mismo.
</Quote>
```
Se muestra en Cormorant Garamond, tamaño grande, con línea dorada a la izquierda.

## Sintaxis Markdown Básica

```mdx
## Subtítulo (h2)
### Sub-subtítulo (h3)

Texto en **negrita** o en *cursiva*.

- Lista con viñeta
- Otro ítem

1. Lista numerada
2. Otro ítem

[Texto del link](https://url.com)
```

## Categorías del Blog

| Categoría | Para qué tipo de artículos |
|-----------|---------------------------|
| `Cuidados` | Tips post-tratamiento, higiene bucal, hábitos |
| `Tratamientos` | Explicaciones de procedimientos, qué esperar |
| `Noticias` | Novedades del consultorio, nueva tecnología |
| `Consejos` | Recomendaciones generales de salud bucal |

## Checklist antes de Publicar
- [ ] Frontmatter completo (todos los campos)
- [ ] Fecha en formato correcto (`YYYY-MM-DD`)
- [ ] Imagen de portada subida a Cloudinary
- [ ] `alt` descriptivo en todas las imágenes
- [ ] Slug del archivo es descriptivo y sin caracteres especiales
- [ ] `excerpt` tiene entre 1 y 2 oraciones
- [ ] `readingTime` calculado (aprox. 200 palabras por minuto)
