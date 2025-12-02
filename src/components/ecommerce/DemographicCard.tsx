"use client";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import type { ApexOptions } from "apexcharts";
import { MoreDotIcon } from "@/icons";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

type DemographicSegment = {
  label: string;
  value: number;
  color: string;
};

const ReactApexChart = dynamic(
  () => import("react-apexcharts").then((mod) => mod.default),
  {
    ssr: false,
  },
);

export default function DemographicCard() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const demographicSegments = useMemo<DemographicSegment[]>(
    () => [
      { label: "18-24 años", value: 1222, color: "#465FFF" },
      { label: "25-34 años", value: 1047, color: "#6280FF" },
      { label: "35+ años", value: 1513, color: "#7F9AFF" },
    ],
    [],
  );

  const totalCustomers = useMemo(
    () =>
      demographicSegments.reduce((total, segment) => {
        return total + segment.value;
      }, 0),
    [demographicSegments],
  );

  const chartSeries = useMemo(
    () => demographicSegments.map((segment) => segment.value),
    [demographicSegments],
  );

  const chartOptions = useMemo<ApexOptions>(
    () => ({
      chart: {
        type: "donut",
        fontFamily: "Outfit, sans-serif",
      },
      labels: demographicSegments.map((segment) => segment.label),
      colors: demographicSegments.map((segment) => segment.color),
      legend: {
        show: false,
      },
      stroke: {
        colors: ["#ffffff"],
        width: 2,
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          expandOnClick: true,
          donut: {
            size: "72%",
            labels: {
              show: true,
              name: {
                fontSize: "13px",
                color: "#6B7280",
              },
              value: {
                fontSize: "22px",
                color: "#1F2937",
                formatter: (value) => Number(value).toLocaleString("es-ES"),
              },
              total: {
                show: true,
                label: "Clientes",
                fontSize: "14px",
                color: "#6B7280",
                formatter: () => totalCustomers.toLocaleString("es-ES"),
              },
            },
          },
        },
      },
      tooltip: {
        y: {
          formatter: (value: number) =>
            `${value.toLocaleString("es-ES")} clientes`,
        },
      },
      responsive: [
        {
          breakpoint: 640,
          options: {
            chart: {
              height: 240,
            },
          },
        },
      ],
    }),
    [demographicSegments, totalCustomers],
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Demografía de Clientes
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Distribución de clientes por segmento demográfico
          </p>
        </div>

        <div className="relative inline-block">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Ver más
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Eliminar
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
      <div className="my-6 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-6 dark:border-gray-800 dark:bg-gray-900 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="mx-auto flex w-full max-w-[280px] items-center justify-center">
            <ReactApexChart
              options={chartOptions}
              series={chartSeries}
              type="donut"
              height={260}
            />
          </div>

          <div className="flex flex-1 flex-col justify-center gap-5">
            {demographicSegments.map((segment) => {
              const percentage = Math.round(
                (segment.value / totalCustomers) * 100,
              );

              return (
                <div
                  key={segment.label}
                  className="rounded-xl border border-gray-200 bg-white/80 p-4 shadow-theme-xs backdrop-blur-sm dark:border-gray-800 dark:bg-white/5 sm:flex sm:items-center sm:justify-between sm:gap-6"
                >
                  <div className="flex items-center gap-3 sm:min-w-[200px]">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: segment.color }}
                    />
                    <div>
                      <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                        {segment.label}
                      </p>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {segment.value.toLocaleString("es-ES")} clientes
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3 sm:mt-0 sm:w-full sm:max-w-[230px]">
                    <div className="relative h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-800">
                      <div
                        className="absolute inset-y-0 left-0 rounded-sm"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: segment.color,
                        }}
                      />
                    </div>
                    <p className="w-16 text-right font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {percentage}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow dark:bg-gray-900 dark:text-gray-200">
          Segmentos clave
        </span>
        <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-600 dark:text-brand-400">
          Actualizado semanalmente
        </span>
      </div>
    </div>
  );
}
