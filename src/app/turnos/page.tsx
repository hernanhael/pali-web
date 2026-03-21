import { TurnoForm } from '@/components/turnos/TurnoForm'
import { GoldDivider } from '@/components/ui/GoldDivider'

export const metadata = {
  title: 'Reservar turno — Dra. María Paula Cajal',
  description:
    'Reservá tu turno online de forma rápida y sencilla.',
}

export default function TurnosPage() {
  return (
    <div className="min-h-screen bg-bg pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-start">
          {/* Info lateral */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-32">
            <div>
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">
                Agenda online
              </span>
              <h1 className="font-heading text-5xl md:text-6xl text-ink mt-3 leading-tight">
                Reservá
                <br />
                tu turno
              </h1>
            </div>

            <GoldDivider className="w-24" />

            <p className="font-sans text-[--text-secondary] leading-relaxed">
              Completá el formulario y nos pondremos en
              contacto dentro de las 24 horas hábiles para
              confirmar tu cita. También podés escribirnos
              por WhatsApp.
            </p>

            {/* Info práctica */}
            <div className="flex flex-col gap-4">
              {[
                {
                  label: 'Horario de atención',
                  value: 'Lunes a Viernes: 9:00 a 18:00 hs',
                },
                {
                  label: 'Ubicación',
                  value:
                    'Santa Fe 441, planta baja, San Miguel de Tucumán',
                },
                {
                  label: 'Contacto directo',
                  value: 'mariapaulacajal@gmail.com',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-0.5"
                >
                  <span className="font-sans text-xs text-gold tracking-wide uppercase">
                    {item.label}
                  </span>
                  <span className="font-sans text-sm text-ink">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Primer turno */}
            <div className="glass rounded-2xl p-5">
              <p className="font-sans text-sm text-ink/80 leading-relaxed">
                ✦ La primera consulta incluye revisión
                completa, diagnóstico y plan de tratamiento
                sin costo adicional.
              </p>
            </div>
          </div>

          {/* Formulario */}
          <div className="glass rounded-3xl p-8">
            <TurnoForm />
          </div>
        </div>
      </div>
    </div>
  )
}
