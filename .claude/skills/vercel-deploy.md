---
name: vercel-deploy
description: Guía de deploy en Vercel: configuración inicial, variables de entorno, dominio personalizado y diagnóstico de errores de build.
---

# Skill: vercel-deploy

## Cuándo aplicar este skill
Al hacer el primer deploy, configurar un dominio, agregar variables de entorno, o diagnosticar un fallo de build en Vercel.

## Flujo de Deploy

El proyecto usa **deploy automático**: cada `git push` a `main` dispara un nuevo deploy en Vercel.

```bash
# Deploy de producción
git add .
git commit -m "descripción del cambio"
git push origin main
```

Los PRs y ramas generan **Preview Deployments** automáticamente — URLs temporales para revisar cambios antes de mergear.

## Configuración Inicial (una sola vez)

### 1. Conectar repositorio
1. Ir a [vercel.com](https://vercel.com) → Add New Project
2. Importar el repositorio de GitHub
3. Framework: Next.js (detectado automáticamente)
4. Root directory: `/` (la raíz)
5. **No** modificar Build Command ni Output Directory — Next.js los detecta solo

### 2. Variables de Entorno en Vercel
Ir a Project → Settings → Environment Variables y agregar **todas** las del `.env.local`:

| Variable | Entornos |
|----------|----------|
| `DATABASE_URL` | Production, Preview |
| `RESEND_API_KEY` | Production, Preview |
| `EMAIL_FROM` | Production, Preview |
| `EMAIL_DOCTORA` | Production, Preview |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Production, Preview, Development |
| `CLOUDINARY_API_KEY` | Production, Preview |
| `CLOUDINARY_API_SECRET` | Production, Preview |
| `ADMIN_SECRET` | Production, Preview |

⚠️ Las variables `NEXT_PUBLIC_*` son públicas (expuestas al browser). Las demás son privadas (solo server-side).

### 3. Dominio personalizado
Project → Settings → Domains → Add Domain
- Agregar el dominio (ej: `dra-cajal.com`)
- Seguir las instrucciones de DNS según el registrador
- Vercel provisiona SSL automáticamente

## Base de Datos en Producción (Supabase)

La `DATABASE_URL` de producción viene de Supabase. Asegurarse de:
1. Usar la **Connection Pooling URL** de Supabase para Vercel (Serverless)
2. Agregar `?pgbouncer=true&connection_limit=1` al final de la URL si hay problemas de conexión

```env
# URL correcta para Vercel + Supabase
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
```

Después del primer deploy, correr las migraciones:
```bash
npx prisma db push  # o npx prisma migrate deploy si usás migraciones
```

## Diagnóstico de Errores de Build

### Error: módulo no encontrado
```
Module not found: Can't resolve '@/components/...'
```
→ Verificar que el archivo exista y que el path sea correcto (case-sensitive en Linux).

### Error: variables de entorno faltantes
```
Error: RESEND_API_KEY is not defined
```
→ Verificar que la variable esté cargada en Vercel para el entorno correcto (Production vs Preview).

### Error: Prisma no genera cliente
```
Error: @prisma/client did not initialize yet
```
→ Agregar en `package.json`:
```json
"scripts": {
  "postinstall": "prisma generate"
}
```

### Error: tipo de build
Si el build falla con errores de TypeScript:
```bash
npm run build  # reproducir localmente antes de pushear
```
Vercel corre `tsc` en el build — los errores de tipo que se ignoran en dev bloquean producción.

## Checklist antes de cada Deploy a Producción
- [ ] `npm run build` pasa localmente sin errores
- [ ] Variables de entorno actualizadas en Vercel si se agregaron nuevas
- [ ] Schema de Prisma sincronizado con la DB de producción
- [ ] Imágenes subidas a Cloudinary (no hay imágenes locales en el código)
- [ ] Probar el flujo de turnos completo en Preview antes de mergear a main
