"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SidebarLayout } from "@/components/SidebarLayout";
import { dummyExports } from "@/data/exports";
import { ExportStatusBadge } from "@/components/ExportStatusBadge";
import { ExportTypeChip } from "@/components/ExportTypeChip";
import {
  ArrowLeft,
  Download,
  RefreshCw,
  Copy,
  Calendar,
  FileText,
  User,
  Database,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function ExportDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const exportJob = dummyExports.find((e) => e.id === id);

  if (!exportJob) {
    return (
      <SidebarLayout>
        <div className="mx-auto flex h-[50vh] max-w-lg flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
            <FileText className="h-8 w-8" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Export nicht gefunden
          </h1>
          <p className="mb-6 text-gray-500">
            Der angeforderte Export mit der ID <span className="font-mono text-sm">{id}</span> existiert nicht oder wurde entfernt.
          </p>
          <Link
            href="/exporte"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Zurück zur Übersicht
          </Link>
        </div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <div className="mx-auto max-w-5xl">
        {/* Header / Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/exporte"
            className="mb-4 flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zur Übersicht
          </Link>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  {exportJob.name}
                </h1>
                <ExportStatusBadge status={exportJob.status} />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-gray-900">ID:</span>
                  <span className="font-mono">{exportJob.id}</span>
                </div>
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <div className="flex items-center gap-1.5">
                  <ExportTypeChip type={exportJob.type} />
                </div>
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <div className="flex items-center gap-1.5">
                  Format: <span className="font-medium uppercase">{exportJob.format}</span>
                </div>
              </div>
            </div>
            {/* Header Actions (optional additional place for actions) */}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content Column */}
          <div className="space-y-8 lg:col-span-2">
            {/* Metadata Card */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Metadaten</h2>
              <dl className="grid gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <User className="h-4 w-4" />
                    Erstellt von
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-gray-900">
                    {exportJob.createdBy}
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <Calendar className="h-4 w-4" />
                    Erstellt am
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-gray-900">
                    {new Date(exportJob.createdAt).toLocaleString("de-DE", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <Database className="h-4 w-4" />
                    Anzahl Datensätze
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-gray-900">
                    {exportJob.relatedCount} Einträge
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <FileText className="h-4 w-4" />
                    Dateigröße (ca.)
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-gray-900">
                    2.4 MB
                  </dd>
                </div>
              </dl>
            </div>

            {/* Log / Timeline */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Protokoll</h2>
              <div className="flow-root">
                <ul className="-mb-8">
                  <li>
                    <div className="relative pb-8">
                      <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 ring-8 ring-white">
                            <CheckCircle2 className="h-5 w-5 text-white" />
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-sm text-gray-500">
                              Export erfolgreich <span className="font-medium text-gray-900">abgeschlossen</span>
                            </p>
                          </div>
                          <div className="whitespace-nowrap text-right text-sm text-gray-500">
                            {new Date(exportJob.createdAt).toLocaleTimeString("de-DE", { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="relative pb-8">
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white">
                            <Clock className="h-5 w-5 text-white" />
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-sm text-gray-500">
                              Export <span className="font-medium text-gray-900">angefordert</span> von {exportJob.createdBy}
                            </p>
                          </div>
                          <div className="whitespace-nowrap text-right text-sm text-gray-500">
                            {new Date(new Date(exportJob.createdAt).getTime() - 60000).toLocaleTimeString("de-DE", { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">Aktionen</h2>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => console.log("Download started")}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <Download className="h-4 w-4" />
                    Export herunterladen
                  </button>
                  <button
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Neu ausführen
                  </button>
                  <div className="mt-2 border-t border-gray-100 pt-4">
                    <button
                      className="flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-medium text-gray-500 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50 hover:text-gray-700"
                    >
                      <Copy className="h-4 w-4" />
                      Als Vorlage speichern
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                <h3 className="mb-2 text-sm font-semibold text-blue-900">Info</h3>
                <p className="text-sm text-blue-700">
                  Dieser Export ist noch 28 Tage verfügbar, bevor er automatisch archiviert wird.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}


