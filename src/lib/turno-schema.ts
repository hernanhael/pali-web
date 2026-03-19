import { z } from "zod";

export const turnoSchema = z.object({
  nombre: z.string().min(2, "Ingresá tu nombre completo"),
  email: z.string().email("Email inválido"),
  telefono: z
    .string()
    .min(8, "Ingresá un teléfono válido")
    .regex(/^[0-9\s\+\-\(\)]+$/, "Solo se permiten números y símbolos de teléfono"),
  tipoConsulta: z.string().min(1, "Seleccioná un tipo de consulta"),
  fechaPreferida: z.string().min(1, "Seleccioná una fecha"),
  horario: z.string().min(1, "Seleccioná un horario"),
  mensaje: z.string().optional(),
});

export type TurnoFormData = z.infer<typeof turnoSchema>;
