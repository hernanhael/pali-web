"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { turnoSchema, type TurnoFormData } from "@/lib/turno-schema";
import { ConfirmationModal } from "./ConfirmationModal";
import { fadeUp } from "@/lib/animations";

const tiposConsulta = [
  "Primera consulta",
  "Blanqueamiento",
  "Carillas",
  "Ortodoncia",
  "Implantes",
  "Limpieza dental",
  "Endodoncia",
  "Prótesis",
  "Otro",
];

const horarios = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "14:00", "14:30", "15:00", "15:30", "16:00",
  "16:30", "17:00", "17:30",
];

export function TurnoForm() {
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TurnoFormData>({
    resolver: zodResolver(turnoSchema),
  });

  const onSubmit = async (data: TurnoFormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/turnos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmittedName(data.nombre);
        setConfirmed(true);
        reset();
      }
    } catch {
      // Mostrar error al usuario en producción
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full font-sans text-sm bg-surface border border-warm/50 rounded-xl px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:border-blue-mid transition-colors duration-200";
  const errorClass = "font-sans text-xs text-red-500 mt-1";
  const labelClass = "font-sans text-xs font-medium tracking-wide uppercase text-[--text-secondary]";

  return (
    <>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
      >
        {/* Nombre */}
        <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
          <label className={labelClass}>Nombre completo *</label>
          <input
            {...register("nombre")}
            placeholder="Ej: Ana García"
            className={inputClass}
          />
          {errors.nombre && <p className={errorClass}>{errors.nombre.message}</p>}
        </motion.div>

        {/* Email + Teléfono */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Email *</label>
            <input
              {...register("email")}
              type="email"
              placeholder="tu@email.com"
              className={inputClass}
            />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Teléfono *</label>
            <input
              {...register("telefono")}
              type="tel"
              placeholder="+54 11 1234-5678"
              className={inputClass}
            />
            {errors.telefono && <p className={errorClass}>{errors.telefono.message}</p>}
          </div>
        </motion.div>

        {/* Tipo de consulta */}
        <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
          <label className={labelClass}>Tipo de consulta *</label>
          <select {...register("tipoConsulta")} className={inputClass}>
            <option value="">Seleccioná una opción</option>
            {tiposConsulta.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.tipoConsulta && <p className={errorClass}>{errors.tipoConsulta.message}</p>}
        </motion.div>

        {/* Fecha + Horario */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Fecha preferida *</label>
            <input
              {...register("fechaPreferida")}
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className={inputClass}
            />
            {errors.fechaPreferida && <p className={errorClass}>{errors.fechaPreferida.message}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Horario preferido *</label>
            <select {...register("horario")} className={inputClass}>
              <option value="">Seleccioná un horario</option>
              {horarios.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
            {errors.horario && <p className={errorClass}>{errors.horario.message}</p>}
          </div>
        </motion.div>

        {/* Mensaje */}
        <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
          <label className={labelClass}>Mensaje (opcional)</label>
          <textarea
            {...register("mensaje")}
            rows={3}
            placeholder="Contanos brevemente sobre tu consulta o alguna inquietud..."
            className={`${inputClass} resize-none`}
          />
        </motion.div>

        {/* Submit */}
        <motion.div variants={fadeUp}>
          <button
            type="submit"
            disabled={submitting}
            className="w-full font-sans text-sm font-medium py-4 rounded-full bg-ink text-bg hover:bg-gold hover:text-ink disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {submitting ? "Enviando..." : "Solicitar turno"}
          </button>
        </motion.div>

        <motion.p variants={fadeUp} className="font-sans text-xs text-[--text-secondary] text-center">
          Te confirmaremos el turno por email dentro de las 24 hs hábiles.
        </motion.p>
      </motion.form>

      <ConfirmationModal
        open={confirmed}
        name={submittedName}
        onClose={() => setConfirmed(false)}
      />
    </>
  );
}
