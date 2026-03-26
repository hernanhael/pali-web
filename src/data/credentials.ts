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
    id: 'rehabilitacion-estetica',
    title: 'Rehabilitación Estética Integral',
    institution: '',
    year: 2023,
    category: 'especializacion',
  },
  {
    id: 'armonizacion-orofacial',
    title: 'Armonización Orofacial',
    institution: '',
    year: 2023,
    category: 'especializacion',
  },
  {
    id: 'restauraciones-posteriores',
    title: 'Restauraciones en Sector Posterior',
    institution: '',
    year: 2023,
    category: 'especializacion',
  },
  {
    id: 'jornadas-soym',
    title: 'Jornadas Sociedad de Operatoria y Materiales',
    institution: '',
    year: 2023,
    category: 'curso',
    cloudinaryId: 'IMG_3546_dsw4wp',
  },
  {
    id: 'carillas-resinas',
    title: 'Carilla de Resinas Compuestas.',
    institution: '',
    year: 2024,
    category: 'curso',
    cloudinaryId: 'Diplomatura_prótesis_fija_CREO_wdfc7p',
  },
  {
    id: 'diagnostico',
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
    cloudinaryId:
      'Cs_de_la_Salud_CREO_Cajal_María_Paula_-_CIE_ohy4lw',
  },
  {
    id: 'jornadas-soym',
    title: 'Jornadas Sociedad de Operatoria y Materiales',
    institution: '',
    year: 2023,
    category: 'curso',
  },
  {
    id: 'carillas-resinas',
    title: 'Carilla de Resinas Compuestas.',
    institution: '',
    year: 2024,
    category: 'curso',
  },
  {
    id: 'diagnostico',
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
