'use client'

import { useState } from 'react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { DiplomaCard } from './DiplomaCard'
import { DiplomaLightbox } from '@/components/ui/DiplomaLightbox'
import {
  credentials,
  type Diploma,
} from '@/data/credentials'

export function CredentialsSection() {
  const [selected, setSelected] = useState<Diploma | null>(
    null,
  )

  const titulo = credentials.find(
    (d) => d.category === 'titulo',
  )
  const especializaciones = credentials.filter(
    (d) => d.category === 'especializacion',
  )
  return (
    <section className="py-28 px-6 bg-bg">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <SectionTitle
          eyebrow="Formación académica"
          title="Siempre aprendiendo"
          subtitle="La odontología avanza y con ella mi formación. Cada diploma representa compromiso con vos."
          align="center"
        />

        <GoldDivider />

        {/* Título universitario — featured */}
        {titulo && (
          <div className="max-w-sm mx-auto w-full">
            <DiplomaCard
              diploma={titulo}
              variant="featured"
              onClick={setSelected}
            />
          </div>
        )}

        {/* Especializaciones */}
        {especializaciones.length > 0 && (
          <div className="flex flex-col gap-6">
            <h3 className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-gold">
              Diplomaturas y posgrados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {especializaciones.map((d) => (
                <DiplomaCard
                  key={d.id}
                  diploma={d}
                  variant="medium"
                  onClick={setSelected}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <DiplomaLightbox
        diploma={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  )
}
