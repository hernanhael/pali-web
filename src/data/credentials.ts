export type DiplomaCategory =
  | 'titulo'
  | 'especializacion'
  | 'curso'

export interface Diploma {
  id: string
  title: string
  institution: string
  year: number
  category: DiplomaCategory
  cloudinaryId?: string // public_id en Cloudinary
  description?: string
}

export const credentials: Diploma[] = [
  {
    id: 'titulo-unt',
    title: 'Odontología',
    institution: 'Universidad Nacional de Tucumán',
    year: 2022,
    category: 'titulo',
    cloudinaryId:
      'Restauraciones_en_sector_posterior_15-7-23_e6zk1z',
    description:
      'Título de grado — Universidad Nacional de Tucumán',
  },
  {
    id: 'esp-estetica',
    title: 'Especialización en Odontología Estética',
    institution:
      'AAOC — Asociación Argentina de Odontología Cosmética',
    year: 2016,
    category: 'especializacion',
  },
  {
    id: 'esp-ortodoncia',
    title: 'Especialización en Ortodoncia',
    institution: 'Universidad Austral',
    year: 2018,
    category: 'especializacion',
  },
  {
    id: 'esp-implantes',
    title: 'Especialización en Implantología Oral',
    institution:
      'AAII — Asociación Argentina de Implantología Ítalo-Ibérica',
    year: 2020,
    category: 'especializacion',
  },
  {
    id: 'curso-invisalign',
    title: 'Invisalign Certified Provider',
    institution: 'Align Technology',
    year: 2019,
    category: 'curso',
  },
  {
    id: 'curso-blanqueamiento',
    title: 'Blanqueamiento dental avanzado',
    institution: 'Sociedad Argentina de Odontología',
    year: 2021,
    category: 'curso',
  },
  {
    id: 'curso-fotografia',
    title: 'Fotografía clínica en odontología',
    institution: 'IAED',
    year: 2022,
    category: 'curso',
  },
  {
    id: 'curso-sedacion',
    title: 'Sedación consciente con óxido nitroso',
    institution: 'AAOAS',
    year: 2023,
    category: 'curso',
  },
]
