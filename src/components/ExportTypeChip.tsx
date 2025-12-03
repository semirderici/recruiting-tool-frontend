import React from "react";
import type { ExportType } from "@/types/export";

interface ExportTypeChipProps {
  type: ExportType;
  className?: string;
}

const typeConfig: Record<ExportType, { label: string; colorClasses: string }> = {
  kandidaten: {
    label: "Kandidaten",
    colorClasses: "bg-blue-100 text-blue-800",
  },
  jobs: {
    label: "Jobs",
    colorClasses: "bg-purple-100 text-purple-800",
  },
  matching: {
    label: "Matching",
    colorClasses: "bg-pink-100 text-pink-800",
  },
  report: {
    label: "Report",
    colorClasses: "bg-orange-100 text-orange-800",
  },
};

export function ExportTypeChip({ type, className = "" }: ExportTypeChipProps) {
  const config = typeConfig[type] || {
    label: "Export",
    colorClasses: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${config.colorClasses} ${className}`}
    >
      {config.label}
    </span>
  );
}

