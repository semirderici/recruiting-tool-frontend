"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { SidebarLayout } from "@/components/SidebarLayout";
import { crmExports } from "@/data/crmExports";
import { CrmExportStatus } from "@/types/crm";
import {
  Search,
  Download,
  FileText,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
} from "lucide-react";

export default function ExportePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<CrmExportStatus | "all">("all");

  const filteredExports = useMemo(() => {
    const search = searchTerm.toLowerCase();

    return crmExports.filter((exp) => {
      if (statusFilter !== "all" && exp.status !== statusFilter) {
        return false;
      }

      if (!search) return true;

      const haystack = [
        exp.title,
        exp.description ?? "",
        exp.scope ?? "",
        exp.createdBy,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(search);
    });
  }, [searchTerm, statusFilter]);

  const getStatusBadge = (status: CrmExportStatus) => {
    switch (status) {
      case "running":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-0.5 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
            <Clock className="h-3 w-3" />
            Laufend
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
            <CheckCircle2 className="h-3 w-3" />
            Erfolgreich
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
            <AlertCircle className="h-3 w-3" />
            Fehlgeschlagen
          </span>
        );
      default:
        return null;
    }
  };

  const getFormatBadge = (format: string) => {
    const formatUpper = format.toUpperCase();
    let colorClass = "bg-gray-50 text-gray-600 ring-gray-500/10";
    let Icon = FileText;

    if (format === "csv" || format === "xlsx" || format === "google_sheets") {
      colorClass = "bg-green-50 text-green-700 ring-green-600/20";
      Icon = FileSpreadsheet;
    } else if (format === "pdf") {
      colorClass = "bg-red-50 text-red-700 ring-red-600/10";
      Icon = FileText;
    }

    return (
      <span
        className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${colorClass}`}
      >
        <Icon className="h-3 w-3" />
        {formatUpper}
      </span>
    );
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "candidate_list":
        return "Kandidatenliste";
      case "job_list":
        return "Jobliste";
      case "matching_report":
        return "Matching-Report";
      case "activity_log":
        return "Aktivitäten-Log";
      default:
        return type;
    }
  };

  return (
    <SidebarLayout>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Exporte & Berichte
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Verwalte deine Exporte von Kandidatenlisten, Joblisten und
              Matching-Reports.
            </p>
          </div>
          <button
            onClick={() => {}}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Download className="h-4 w-4" />
            Neuen Export anlegen
          </button>
        </div>

        {/* Filterleiste */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            {/* Suche */}
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="Suche nach Titel, Scope..."
              />
            </div>

            {/* Status-Filter */}
            <div className="relative w-full lg:w-56">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as CrmExportStatus | "all")
                }
              >
                <option value="all">Status: Alle</option>
                <option value="running">Laufend</option>
                <option value="completed">Erfolgreich</option>
                <option value="failed">Fehlgeschlagen</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Titel
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Typ & Format
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Erstellt am
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Umfang
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
                >
                  Aktionen
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredExports.map((exp) => (
                <tr key={exp.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <Link
                        href={`/exporte/${exp.id}`}
                        className="font-medium text-gray-900 hover:text-blue-600"
                      >
                        {exp.title}
                      </Link>
                      {exp.description && (
                        <span className="text-xs text-gray-500 line-clamp-1">
                          {exp.description}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-start gap-1.5">
                      <span className="text-xs text-gray-700">
                        {getTypeLabel(exp.type)}
                      </span>
                      {getFormatBadge(exp.format)}
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(exp.status)}</td>
                  <td className="px-6 py-4 text-gray-700">
                    <div className="text-sm">
                      {new Date(exp.createdAt).toLocaleDateString("de-DE")}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(exp.createdAt).toLocaleTimeString("de-DE", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {exp.rowCount !== undefined ? (
                      <span className="text-sm">{exp.rowCount} Zeilen</span>
                    ) : (
                      <span className="text-sm text-gray-400">–</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/exporte/${exp.id}`}
                      className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                      Details
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}

              {filteredExports.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-sm text-gray-500"
                  >
                    Keine Exporte gefunden. Bitte passe deine Filter an.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </SidebarLayout>
  );
}
