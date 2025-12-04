"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SidebarLayout } from "@/components/SidebarLayout";
import { crmExports } from "@/data/crmExports";
import { CrmExport, CrmExportStatus } from "@/types/crm";
import {
  ArrowLeft,
  FileText,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle2,
  Clock,
  Download,
  RotateCw,
  Info,
  List,
  Activity,
  File,
} from "lucide-react";

type ExportDetailTab = "summary" | "content" | "logs";

export default function ExportDetailPage() {
  const params = useParams();
  const exportId = params?.id as string | undefined;
  const [activeTab, setActiveTab] = useState<ExportDetailTab>("summary");

  const exportItem = useMemo<CrmExport | undefined>(
    () => crmExports.find((e) => e.id === exportId),
    [exportId]
  );

  const getStatusBadge = (status: CrmExportStatus) => {
    switch (status) {
      case "running":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-sm font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
            <Clock className="h-4 w-4" />
            Laufend
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
            <CheckCircle2 className="h-4 w-4" />
            Erfolgreich
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
            <AlertCircle className="h-4 w-4" />
            Fehlgeschlagen
          </span>
        );
      default:
        return null;
    }
  };

  const getFormatIcon = (format: string) => {
    if (
      format === "csv" ||
      format === "xlsx" ||
      format === "google_sheets"
    ) {
      return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
    }
    return <FileText className="h-5 w-5 text-red-600" />;
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

  if (!exportItem) {
    return (
      <SidebarLayout>
        <div className="mx-auto max-w-3xl">
          <div className="mb-4">
            <Link
              href="/exporte"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Zur Übersicht
            </Link>
          </div>
          <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-sm text-red-800">
            Export nicht gefunden.
          </div>
        </div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <div className="mx-auto max-w-7xl">
        {/* Back Link */}
        <div className="mb-4">
          <Link
            href="/exporte"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Zur Übersicht
          </Link>
        </div>

        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div className="flex flex-1 items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              {getFormatIcon(exportItem.format)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {exportItem.title}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span className="font-medium text-gray-900">
                  {getTypeLabel(exportItem.type)}
                </span>
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <span className="uppercase">{exportItem.format}</span>
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <span>
                  {new Date(exportItem.createdAt).toLocaleDateString("de-DE")}
                </span>
                {exportItem.rowCount && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-gray-300" />
                    <span>{exportItem.rowCount} Zeilen</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>{getStatusBadge(exportItem.status)}</div>
        </div>

        {/* Info Cards Grid */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Allgemein */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <File className="h-4 w-4 text-gray-400" />
              Allgemein
            </h2>
            <dl className="mt-3 space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <dt className="text-xs text-gray-500">Typ</dt>
                <dd>{getTypeLabel(exportItem.type)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-xs text-gray-500">Format</dt>
                <dd className="uppercase">{exportItem.format}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-xs text-gray-500">Erstellt von</dt>
                <dd>{exportItem.createdBy}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-xs text-gray-500">Erstellt am</dt>
                <dd>
                  {new Date(exportItem.createdAt).toLocaleDateString("de-DE")}
                </dd>
              </div>
            </dl>
          </div>

          {/* Umfang & Scope */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <List className="h-4 w-4 text-gray-400" />
              Umfang & Scope
            </h2>
            <dl className="mt-3 space-y-2 text-sm text-gray-700">
              {exportItem.candidateCount !== undefined && (
                <div className="flex justify-between">
                  <dt className="text-xs text-gray-500">Kandidaten</dt>
                  <dd>{exportItem.candidateCount}</dd>
                </div>
              )}
              {exportItem.jobCount !== undefined && (
                <div className="flex justify-between">
                  <dt className="text-xs text-gray-500">Jobs</dt>
                  <dd>{exportItem.jobCount}</dd>
                </div>
              )}
              {exportItem.rowCount !== undefined && (
                <div className="flex justify-between">
                  <dt className="text-xs text-gray-500">Gesamtzeilen</dt>
                  <dd>{exportItem.rowCount}</dd>
                </div>
              )}
              <div className="pt-2">
                <dt className="text-xs text-gray-500">Filter / Scope</dt>
                <dd className="mt-1 text-xs italic text-gray-600">
                  {exportItem.scope ?? "Kein Scope definiert"}
                </dd>
              </div>
            </dl>
          </div>

          {/* Status & Verlauf */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <Activity className="h-4 w-4 text-gray-400" />
              Status & Verlauf
            </h2>
            <div className="mt-3 space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    exportItem.status === "completed"
                      ? "bg-emerald-500"
                      : exportItem.status === "failed"
                      ? "bg-red-500"
                      : "bg-yellow-500 animate-pulse"
                  }`}
                />
                <span className="font-medium text-gray-900">
                  {exportItem.status === "completed"
                    ? "Abgeschlossen"
                    : exportItem.status === "failed"
                    ? "Fehlgeschlagen"
                    : "Wird verarbeitet..."}
                </span>
              </div>
              {exportItem.status === "failed" && (
                <p className="text-xs text-red-600 bg-red-50 p-2 rounded">
                  Fehler beim Generieren der Datei (Timeout).
                </p>
              )}
              {exportItem.finishedAt && (
                <p className="text-xs text-gray-500">
                  Fertiggestellt:{" "}
                  {new Date(exportItem.finishedAt).toLocaleString("de-DE")}
                </p>
              )}
            </div>
          </div>

          {/* Aktionen */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm flex flex-col justify-center gap-3">
            <button
              disabled={exportItem.status !== "completed"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
            <button
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <RotateCw className="h-4 w-4" />
              Erneut ausführen
            </button>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex gap-6 text-sm">
              {[
                { id: "summary" as ExportDetailTab, label: "Zusammenfassung", icon: Info },
                { id: "content" as ExportDetailTab, label: "Inhalt (Vorschau)", icon: List },
                { id: "logs" as ExportDetailTab, label: "Logs", icon: Activity },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 border-b-2 px-1 pb-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-6">
            {activeTab === "summary" && (
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Über diesen Export
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {exportItem.description ||
                    "Keine weitere Beschreibung vorhanden."}
                </p>
                <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
                  <p className="font-medium mb-1">Verwendungszweck</p>
                  <p>
                    Dieser Report dient der Analyse von {getTypeLabel(exportItem.type)} und kann
                    für interne Meetings oder das Reporting an Kunden verwendet werden.
                    Alle Daten basieren auf dem Snapshot vom{" "}
                    {new Date(exportItem.createdAt).toLocaleDateString("de-DE")}.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "content" && (
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Vorschau (Erste 3 Zeilen)
                  </h3>
                </div>
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-white">
                    <tr>
                      <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                        Name / Titel
                      </th>
                      <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                        Datum
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="px-6 py-4 text-gray-900 font-medium">
                        Max Mustermann
                      </td>
                      <td className="px-6 py-4 text-gray-600">Aktiv</td>
                      <td className="px-6 py-4 text-gray-600">2023-12-01</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-gray-900 font-medium">
                        Lisa Schmidt
                      </td>
                      <td className="px-6 py-4 text-gray-600">Interview</td>
                      <td className="px-6 py-4 text-gray-600">2023-12-02</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-gray-900 font-medium">
                        Senior Frontend Dev
                      </td>
                      <td className="px-6 py-4 text-gray-600">Offen</td>
                      <td className="px-6 py-4 text-gray-600">2023-11-28</td>
                    </tr>
                  </tbody>
                </table>
                <div className="bg-gray-50 px-6 py-3 text-xs text-gray-500 text-center border-t border-gray-200">
                  Dies ist nur eine Vorschau mit Dummy-Daten.
                </div>
              </div>
            )}

            {activeTab === "logs" && (
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Verlaufsprotokoll
                </h3>
                <ul className="space-y-6 border-l-2 border-gray-100 ml-3 pl-6">
                  <li className="relative">
                    <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-blue-500 ring-4 ring-white" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Export gestartet
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(exportItem.createdAt).toLocaleString("de-DE")}
                      </p>
                    </div>
                  </li>
                  <li className="relative">
                    <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-blue-500 ring-4 ring-white" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Daten werden abgerufen...
                      </p>
                      <p className="text-xs text-gray-500">
                        Query ausgeführt (Scope: {exportItem.scope || "Alle"})
                      </p>
                    </div>
                  </li>
                  {exportItem.status === "completed" && (
                    <li className="relative">
                      <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-green-500 ring-4 ring-white" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Abgeschlossen
                        </p>
                        <p className="text-xs text-gray-500">
                          Datei generiert ({exportItem.format.toUpperCase()})
                        </p>
                      </div>
                    </li>
                  )}
                  {exportItem.status === "failed" && (
                    <li className="relative">
                      <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-red-500 ring-4 ring-white" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Fehler aufgetreten
                        </p>
                        <p className="text-xs text-red-600">
                          Timeout bei der Generierung. Bitte erneut versuchen.
                        </p>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
