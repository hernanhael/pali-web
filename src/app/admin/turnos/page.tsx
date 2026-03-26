"use client";

import { useState, useEffect, useCallback } from "react";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { formatDateShort, formatDateTime } from "@/lib/date";

type Estado = "pendiente" | "confirmado" | "cancelado";

interface Turno {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  tipoConsulta: string;
  fechaPreferida: string;
  horario: string;
  mensaje?: string;
  estado: Estado;
  createdAt: string;
}

const estadoColors: Record<Estado, string> = {
  pendiente: "bg-yellow-100 text-yellow-800",
  confirmado: "bg-green-100 text-green-800",
  cancelado: "bg-red-100 text-red-800",
};

export default function AdminTurnosPage() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [filtro, setFiltro] = useState<"todos" | Estado>("todos");

  const fetchTurnos = useCallback(async (key: string) => {
    setLoading(true);
    setError("");
    try {
      const url =
        filtro === "todos"
          ? "/api/admin/turnos"
          : `/api/admin/turnos?estado=${filtro}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${key}` },
      });
      if (res.status === 401) {
        setError("Clave incorrecta.");
        setAuthed(false);
        return;
      }
      const data = await res.json();
      setTurnos(data.turnos);
      setAuthed(true);
    } catch {
      setError("Error al cargar los turnos.");
    } finally {
      setLoading(false);
    }
  }, [filtro]);

  useEffect(() => {
    if (authed) fetchTurnos(secret);
  }, [filtro, authed, fetchTurnos, secret]);

  const updateEstado = async (id: string, estado: Estado) => {
    setUpdateError("");
    try {
      const res = await fetch("/api/admin/turnos", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secret}`,
        },
        body: JSON.stringify({ id, estado }),
      });
      if (!res.ok) {
        setUpdateError("No se pudo actualizar el estado. Intentá de nuevo.");
        return;
      }
      setTurnos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, estado } : t))
      );
    } catch {
      setUpdateError("Error de conexión al actualizar el estado.");
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-6">
        <div className="glass rounded-3xl p-10 max-w-sm w-full flex flex-col gap-5">
          <h1 className="font-heading text-3xl text-ink">Admin</h1>
          <GoldDivider className="my-1" />
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Clave de acceso"
            className="w-full font-sans text-sm bg-surface border border-warm/50 rounded-xl px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:border-blue-mid transition-colors"
            onKeyDown={(e) => e.key === "Enter" && fetchTurnos(secret)}
          />
          {error && <p className="font-sans text-xs text-red-500">{error}</p>}
          <button
            onClick={() => fetchTurnos(secret)}
            className="font-sans text-sm font-medium py-3 rounded-full bg-ink text-bg hover:bg-gold hover:text-ink transition-all duration-300"
          >
            Ingresar
          </button>
        </div>
      </div>
    );
  }

  const filtros: ("todos" | Estado)[] = ["todos", "pendiente", "confirmado", "cancelado"];

  return (
    <div className="min-h-screen bg-bg pt-12 pb-24 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="font-heading text-4xl text-ink">Panel de turnos</h1>
          <button
            onClick={() => fetchTurnos(secret)}
            className="font-sans text-sm text-[--text-secondary] hover:text-gold transition-colors"
          >
            ↻ Actualizar
          </button>
        </div>

        <GoldDivider />

        {/* Filtros */}
        <div className="flex gap-3 flex-wrap">
          {filtros.map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`font-sans text-sm px-4 py-1.5 rounded-full border transition-all duration-200 capitalize ${
                filtro === f
                  ? "bg-ink text-bg border-ink"
                  : "border-warm/60 text-ink/60 hover:border-gold hover:text-gold"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {updateError && (
          <p role="alert" className="font-sans text-sm text-red-500">{updateError}</p>
        )}

        {loading ? (
          <p className="font-sans text-sm text-[--text-secondary]">Cargando...</p>
        ) : turnos.length === 0 ? (
          <p className="font-sans text-sm text-[--text-secondary]">No hay turnos.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {turnos.map((turno) => {
              const fecha = formatDateShort(turno.fechaPreferida);
              const creado = formatDateTime(turno.createdAt);

              return (
                <div
                  key={turno.id}
                  className="glass rounded-2xl p-6 flex flex-col md:flex-row gap-4 md:items-start"
                >
                  {/* Info */}
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-heading text-xl text-ink">{turno.nombre}</h3>
                      <span
                        className={`font-sans text-xs rounded-full px-2.5 py-0.5 capitalize ${
                          estadoColors[turno.estado as Estado]
                        }`}
                      >
                        {turno.estado}
                      </span>
                    </div>
                    <p className="font-sans text-sm text-[--text-secondary]">
                      {turno.email} · {turno.telefono}
                    </p>
                    <div className="flex gap-6 mt-1 flex-wrap">
                      <span className="font-sans text-sm text-ink">
                        <span className="text-gold text-xs uppercase tracking-wide mr-1">Consulta</span>
                        {turno.tipoConsulta}
                      </span>
                      <span className="font-sans text-sm text-ink">
                        <span className="text-gold text-xs uppercase tracking-wide mr-1">Fecha</span>
                        {fecha} · {turno.horario} hs
                      </span>
                    </div>
                    {turno.mensaje && (
                      <p className="font-sans text-xs text-[--text-secondary] italic mt-1">
                        &ldquo;{turno.mensaje}&rdquo;
                      </p>
                    )}
                    <p className="font-sans text-xs text-warm mt-1">Recibido: {creado}</p>
                  </div>

                  {/* Acciones */}
                  <div className="flex gap-2 flex-shrink-0 flex-wrap">
                    {(["pendiente", "confirmado", "cancelado"] as Estado[]).map((e) => (
                      <button
                        key={e}
                        disabled={turno.estado === e}
                        onClick={() => updateEstado(turno.id, e)}
                        className={`font-sans text-xs px-3 py-1.5 rounded-full border transition-all duration-200 capitalize disabled:opacity-40 disabled:cursor-default ${
                          turno.estado === e
                            ? "bg-ink text-bg border-ink"
                            : "border-warm/60 text-ink/60 hover:border-gold hover:text-gold"
                        }`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
