'use client'

import { motion } from 'framer-motion'
import { CldImage } from 'next-cloudinary'
import { fadeUp, stagger } from '@/lib/animations'
import { CountUp } from '@/components/ui/CountUp'

// Cuando se suba la foto real a Cloudinary, reemplazar este valor
const HERO_IMAGE_ID =
  process.env.NEXT_PUBLIC_HERO_IMAGE_ID ?? ''

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-bg pt-20">
      {/* Decoración de fondo */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 70% 50%, rgba(170, 186, 198, 0.3) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-16 items-center">
          {/* Texto — columna izquierda */}
          <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.span
              variants={fadeUp}
              className="font-sans text-xs tracking-[0.25em] uppercase text-gold"
            >
              Odontología · Tucumán
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-heading leading-[1.05] text-ink"
              style={{
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              }}
            >
              Dra. María
              <br />
              <span className="text-blue-mid">Paula</span>
              <br />
              Cajal
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="gold-divider w-24 my-1"
            />

            <motion.p
              variants={fadeUp}
              className="font-sans text-[--text-secondary] leading-relaxed max-w-md"
              style={{
                fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              }}
            >
              Cada sonrisa tiene su historia. Mi trabajo es
              acompañarte para que la tuya sea la mejor
              versión de vos.
            </motion.p>

            {/* Estadísticas con contador animado */}
            <motion.div
              variants={fadeUp}
              className="flex gap-8 sm:gap-10 mt-6 pt-6 border-t border-warm/50"
            >
              {[
                {
                  end: 5,
                  suffix: '+',
                  label: 'Años de experiencia',
                },
                {
                  end: 600,
                  suffix: '+',
                  label: 'Pacientes',
                },
                {
                  end: 10,
                  suffix: '+',
                  label: 'Capacitaciones',
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-0.5"
                >
                  <span className="font-heading text-3xl text-gold leading-none">
                    <CountUp
                      end={stat.end}
                      suffix={stat.suffix}
                    />
                  </span>
                  <span className="font-sans text-xs text-[--text-secondary]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Imagen — columna derecha */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2,
            }}
          >
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-gradient-to-br from-blue-soft/30 to-warm/40 flex items-end">
              {HERO_IMAGE_ID ? (
                <CldImage
                  src={HERO_IMAGE_ID}
                  alt="Dra. María Paula Cajal"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 0px, 45vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading text-2xl text-blue-mid/50">
                    Foto de la doctora
                  </span>
                </div>
              )}
            </div>

            {/* Elemento decorativo */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-gold/30" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-gold/10" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="font-sans text-xs tracking-[0.2em] uppercase text-[--text-secondary]">
          Scroll
        </span>
        <motion.div
          className="w-px h-10 bg-gold/40"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  )
}
