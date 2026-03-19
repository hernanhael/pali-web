# Skill: responsive-testing

## Cuándo aplicar este skill
Antes de considerar terminada cualquier sección o página. Verificar en los 4 breakpoints definidos en el proyecto.

## Los 4 Breakpoints del Proyecto

| Nombre | Ancho | Dispositivo típico |
|--------|-------|--------------------|
| Mobile | 375px | iPhone SE, teléfonos pequeños |
| Tablet | 768px | iPad, tablets |
| Laptop | 1280px | Laptops comunes |
| Desktop | 1920px | Monitores full HD |

## Cómo Probar en el Navegador

**Chrome / Edge DevTools:**
1. `F12` → ícono de dispositivo (arriba a la izquierda del panel)
2. Ingresar el ancho manualmente en el campo de dimensiones
3. Probar cada uno de los 4 anchos

**Firefox Responsive Design Mode:**
1. `F12` → ícono de dispositivo
2. Mismos anchos

## Checklist por Sección

### Navbar
- [ ] 375px: menú colapsado (hamburger o simplificado)
- [ ] 768px: transición entre mobile y desktop
- [ ] 1280px+: menú horizontal completo
- [ ] El blur de fondo funciona en todos los anchos
- [ ] No hay overflow horizontal

### HeroSection
- [ ] 375px: foto ocupa el ancho, texto legible sin overflow
- [ ] 375px: `clamp()` de h1 no produce texto demasiado pequeño (mínimo 2.5rem)
- [ ] 768px: layout empieza a mostrar asimetría
- [ ] 1280px+: layout asimétrico completo (texto 60% / foto 40%)
- [ ] CTA "Reservar turno" es tappable en mobile (mínimo 44×44px)

### CredentialsSection (diplomas)
- [ ] 375px: cards en columna única
- [ ] 768px: especializaciones en 2 columnas
- [ ] 1280px+: especializaciones en 3 col, cursos en 4 col
- [ ] DiplomaLightbox ocupa el viewport correctamente en mobile

### TratamientosGrid
- [ ] 375px: cards en columna única, tamaño consistente
- [ ] BeforeAfterSlider funciona con touch en mobile
- [ ] Filtros de categoría son scrolleables horizontalmente si no entran

### TurnoForm
- [ ] 375px: formulario ocupa todo el ancho con padding apropiado
- [ ] Inputs y select son grandes y tapeables fácilmente
- [ ] Teclado virtual no tapa el campo activo (verificar con dispositivo real o simulador)
- [ ] ConfirmationModal centrado y visible en mobile

### OfficeGallery
- [ ] 375px: galería masonry no rompe el layout
- [ ] ToolCard flip funciona con tap en mobile (considerar usar click en vez de hover)

### Footer
- [ ] 375px: columnas apiladas verticalmente
- [ ] Links con área de tap suficiente

## Problemas Frecuentes en Este Proyecto

### Overflow horizontal en mobile
```tsx
// Si aparece scroll horizontal en 375px, agregar en layout.tsx:
<body className="overflow-x-hidden">
```

### Layouts asimétricos que se rompen
```tsx
// El grid asimétrico 60/40 debe colapsar a columna en mobile:
<div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 md:gap-12">
```

### Texto demasiado grande en mobile
Los `clamp()` del sistema de diseño están calibrados para mobile-first. Si el texto se ve muy grande, verificar que se estén usando los valores del CLAUDE.md:
```css
h1 { font-size: clamp(2.5rem, 6vw, 5rem); }   /* mínimo 2.5rem */
h2 { font-size: clamp(2rem, 4vw, 3.5rem); }
```

### Glassmorphism en mobile
`backdrop-blur` puede ser costoso en dispositivos móviles. Si hay performance issues en mobile, reducir a `backdrop-blur-sm`.

### BeforeAfterSlider en touch
El drag debe funcionar con eventos touch además de mouse:
```tsx
onMouseMove / onTouchMove
onMouseUp / onTouchEnd
```

## Prueba Rápida Pre-Deploy

```bash
npm run dev
```

Abrir en DevTools y recorrer rápido: 375px → 768px → 1280px → 1920px verificando:
1. No hay overflow horizontal en ningún breakpoint
2. El texto es legible (ni muy grande ni muy pequeño)
3. Los elementos interactivos son tapeables en mobile
4. Las animaciones no causan layout shift visible
