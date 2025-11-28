import React from "react";
import { ExportStatus } from "@/types/export";
import { CheckCircle2, Loader2, Clock, AlertCircle } from "lucide-react";

interface ExportStatusBadgeProps {
  status: ExportStatus;
}

const statusConfig: Record<ExportStatus, { color: string; icon: React.ElementType; label: string }> = {
  fertig: { color: "text-green-700 bg-green-50 ring-green-600/20", icon: CheckCircle2, label: "Fertig" },
  in_arbeit: { color: "text-blue-700 bg-blue-50 ring-blue-700/10", icon: Loader2, label: "In Arbeit" },
  geplant: { color: "text-gray-600 bg-gray-50 ring-gray-500/10", icon: Clock, label: "Geplant" },
  fehlgeschlagen: { color: "text-red-700 bg-red-50 ring-red-600/10", icon: AlertCircle, label: "Fehlgeschlagen" },
};

export function ExportStatusBadge({ status }: ExportStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${config.color}`}>
      <Icon className={`h-3.5 w-3.5 ${status === 'in_arbeit' ? 'animate-spin' : ''}`} />
      {config.label}
    </span>
  );
}


