"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(
  () => import("react-apexcharts").then((mod) => mod.default),
  {
    ssr: false,
  },
);

const demographicSegments = [
  { label: "18-24 años", value: 420, color: "#465FFF" },
  { label: "25-34 años", value: 360, color: "#6280FF" },
  { label: "35-44 años", value: 260, color: "#7F9AFF" },
  { label: "45-54 años", value: 160, color: "#A3B6FF" },
  { label: "55+ años", value: 100, color: "#C7D1FF" },
];

export default function PieChartOne() {
  const totalCustomers = useMemo(
    () =>
      demographicSegments.reduce((total, segment) => {
        return total + segment.value;
      }, 0),
    [],
  );

  const chartSeries = useMemo(
    () => demographicSegments.map((segment) => segment.value),
    [],
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
        position: "bottom",
        fontSize: "13px",
        labels: {
          colors: "#6B7280",
        },
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
          donut: {
            size: "70%",
            labels: {
              show: true,
              name: {
                fontSize: "14px",
                color: "#6B7280",
              },
              value: {
                fontSize: "24px",
                fontWeight: 600,
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
              height: 260,
            },
            legend: {
              fontSize: "12px",
            },
          },
        },
      ],
    }),
    [totalCustomers],
  );

  return (
    <div className="flex flex-col items-center gap-6">
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="donut"
        height={320}
      />
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Actualizado semanalmente
      </div>
    </div>
  );
}
