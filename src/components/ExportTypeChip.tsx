import React from "react";
import { ExportType } from "@/types/export";
import { Users, Briefcase, FileText, BarChart3 } from "lucide-react";

interface ExportTypeChipProps {
  type: ExportType;
}

const typeConfig: Record<ExportType, { label: string; icon: React.ElementType; className: string }> = {
  kandidaten: { label: "Kandidaten", icon: Users, className: "bg-blue-100 text-blue-800" },
  jobs: { label: "Jobs", icon: Briefcase, className: "bg-purple-100 text-purple-800" },
  matching: { label: "Matching", icon: BarChart3, className: "bg-indigo-100 text-indigo-800" },
  report: { label: "Report", icon: FileText, className: "bg-orange-100 text-orange-800" },
};

export function ExportTypeChip({ type }: ExportTypeChipProps) {
  const config = typeConfig[type] || { label: type, icon: FileText, className: "bg-gray-100 text-gray-800" };
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${config.className}`}>
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  );
}


