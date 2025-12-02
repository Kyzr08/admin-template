import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Soporte | KyzrUI",
};

export default function SupportPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white/80 p-6 text-center dark:border-gray-700 dark:bg-white/[0.03]">
      <div className="max-w-xl space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
          Estamos trabajando en esta página
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          La sección de soporte se encuentra en desarrollo y estará habilitada en las próximas
          actualizaciones. Muy pronto podrás gestionar tickets y comunicarte directamente con nuestro
          equipo peruano desde aquí.
        </p>
        <div className="flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
          <span className="rounded-full border border-gray-300 px-3 py-1 dark:border-gray-700">
            Disponible próximamente
          </span>
          <span className="rounded-full border border-gray-300 px-3 py-1 dark:border-gray-700">
            En construcción
          </span>
        </div>
      </div>
    </div>
  );
}
