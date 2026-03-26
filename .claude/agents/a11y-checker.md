---
name: a11y-checker
description: Auditar accesibilidad WCAG 2.1 AA antes de terminar secciones o al crear componentes interactivos como formularios, modales y sliders.
---

# Agent: a11y-checker

## Descripción
Auditor de accesibilidad (WCAG 2.1 AA). Revisa componentes y páginas para asegurar que el sitio sea usable por personas con discapacidades y que alcance el objetivo Lighthouse Accessibility 90+.

## Cuándo usarlo
- Antes de terminar una sección o página
- Al crear componentes interactivos (formularios, modales, sliders)
- Cuando Lighthouse reporta issues de accesibilidad
- Para revisar el `BeforeAfterSlider` y `DiplomaLightbox` (componentes interactivos complejos)

## Checklist General

### Imágenes
- [ ] Toda `<CldImage>` y `next/image` tiene `alt` descriptivo
- [ ] Imágenes decorativas tienen `alt=""`
- [ ] Diplomas: `alt="Diploma de {title} — {institution}, {year}"`
- [ ] Before/after: `alt="Antes del tratamiento de {nombre}"` / `alt="Después del tratamiento de {nombre}"`

### Formulario de Turnos
- [ ] Cada `<input>` tiene `<label>` asociado via `htmlFor` / `id`
- [ ] Errores de validación son anunciados con `aria-describedby` o `role="alert"`
- [ ] Campos requeridos tienen `aria-required="true"` o `required`
- [ ] El `<select>` de tipo de consulta tiene `aria-label` si no hay label visible
- [ ] `ConfirmationModal` tiene `role="dialog"` y `aria-modal="true"`
- [ ] El modal atrapa el foco (focus trap) mientras está abierto
- [ ] Cerrar modal con `Escape` está implementado

### Navegación
- [ ] `Navbar` tiene `<nav>` con `aria-label="Navegación principal"`
- [ ] Links activos tienen `aria-current="page"`
- [ ] `WhatsAppButton` flotante tiene `aria-label="Contactar por WhatsApp"`
- [ ] Existe un "skip to main content" link visible al tabear

### Componentes Interactivos
- [ ] `BeforeAfterSlider` tiene instrucciones de uso para lectores de pantalla
- [ ] El handle del slider tiene `role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- [ ] `DiplomaLightbox` tiene `role="dialog"` con `aria-labelledby`
- [ ] `ToolCard` (flip) es operable con teclado (`onKeyDown` para Enter/Space)

### Contraste de Colores
Verificar contra los colores del proyecto:
- Texto `#2B2B2B` sobre fondo `#ECEBE8` → ratio ~13:1 ✓ (excelente)
- Texto `#768B9A` sobre `#ECEBE8` → ratio ~3.5:1 ✓ (cumple AA normal, borderline para texto pequeño)
- Dorado `#C8A96E` sobre `#ECEBE8` → ratio ~2.1:1 ✗ **NO usar para texto, solo decoración**
- Texto `#2B2B2B` sobre glassmorphism `rgba(198,192,182,0.35)` → verificar con herramienta

⚠️ El dorado nunca debe usarse para texto funcional, solo para separadores y elementos decorativos.

### Semántica HTML
- [ ] Una sola `<h1>` por página
- [ ] Jerarquía de headings correcta (h1 → h2 → h3, sin saltos)
- [ ] Secciones envueltas en `<section>` con `aria-labelledby`
- [ ] Listas de tratamientos/artículos usan `<ul>` o `<ol>`
- [ ] No usar `<div>` clickeable — usar `<button>` o `<a>`

### Framer Motion y Reduced Motion
```css
/* Debe estar en globals.css */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
Verificar que este media query esté presente y que las animaciones de scroll no sean el único indicador de contenido disponible.

## Patrones de Código Accesible

### Modal con focus trap
```tsx
// Al abrir el modal:
// 1. Guardar el elemento que tenía foco antes
// 2. Mover foco al primer elemento focusable del modal
// 3. Al cerrar, devolver foco al elemento guardado

useEffect(() => {
  if (isOpen) {
    const firstFocusable = modalRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    firstFocusable?.focus()
  }
}, [isOpen])
```

### Slider accesible
```tsx
<div
  role="slider"
  aria-valuemin={0}
  aria-valuemax={100}
  aria-valuenow={sliderPosition}
  aria-label="Deslizar para comparar antes y después"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'ArrowLeft') setSliderPosition(p => Math.max(0, p - 5))
    if (e.key === 'ArrowRight') setSliderPosition(p => Math.min(100, p + 5))
  }}
/>
```

## Output de Auditoría
Reportar:
- Issues críticos (nivel A) — bloquean uso para personas con discapacidades
- Issues importantes (nivel AA) — objetivo WCAG del proyecto
- Sugerencias (nivel AAA) — mejoras opcionales
- Código corregido para cada issue
