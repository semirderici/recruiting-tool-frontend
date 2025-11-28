"use client";

import React, { useState } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import { dummyExports } from "@/data/exports";
import { 
  Users, 
  Briefcase, 
  FileText, 
  Plus,
  Search,
  FileSpreadsheet,
  Download,
  Eye
} from "lucide-react";
import Link from "next/link";
import { ExportStatusBadge } from "@/components/ExportStatusBadge";
import { ExportTypeChip } from "@/components/ExportTypeChip";

export default function ExportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("Alle Typen");
  const [statusFilter, setStatusFilter] = useState("Alle Stati");

  const filteredExports = dummyExports.filter((exp) => {
    const matchesSearch = exp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "Alle Typen" || exp.type === typeFilter.toLowerCase();
    const matchesStatus = statusFilter === "Alle Stati" || exp.status === statusFilter.toLowerCase().replace(" ", "_");
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const resetFilters = () => {
    setSearchTerm("");
    setTypeFilter("Alle Typen");
    setStatusFilter("Alle Stati");
  };

  return (
    <SidebarLayout>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Exporte</h1>
            <p className="mt-1 text-sm text-gray-500">
              Verwalte Daten-Exporte und generiere Berichte für Kunden.
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Plus className="h-4 w-4" />
            Neuer Export
          </button>
        </div>

        {/* Quick Actions */}
        <div className="mb-10 grid gap-6 md:grid-cols-3">
          <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md cursor-pointer hover:border-blue-300">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Kandidaten-Liste</h3>
            <p className="mb-4 mt-2 text-sm text-gray-500">
              Exportiere gefilterte Kandidaten als CSV oder Excel für externe Systeme.
            </p>
            <div className="mt-auto flex items-center text-sm font-medium text-blue-600">
              Export starten
            </div>
          </div>

          <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md cursor-pointer hover:border-purple-300">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <Briefcase className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Jobs & Matching</h3>
            <p className="mb-4 mt-2 text-sm text-gray-500">
              Shortlists und Matching-Ergebnisse zu bestimmten Jobs exportieren.
            </p>
            <div className="mt-auto flex items-center text-sm font-medium text-purple-600">
              Export starten
            </div>
          </div>

          <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md cursor-pointer hover:border-orange-300">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Kunden-Report (PDF)</h3>
            <p className="mb-4 mt-2 text-sm text-gray-500">
              Professionelle PDF-Berichte mit anonymisierten Profilen erstellen.
            </p>
            <div className="mt-auto flex items-center text-sm font-medium text-orange-600">
              Report erstellen
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="grid gap-4 md:grid-cols-4 items-center">
            <div className="relative col-span-1 md:col-span-2 lg:col-span-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="Nach Exportnamen suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option>Alle Typen</option>
              <option value="Kandidaten">Kandidaten</option>
              <option value="Jobs">Jobs</option>
              <option value="Matching">Matching</option>
              <option value="Report">Report</option>
            </select>

            <select
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>Alle Stati</option>
              <option value="geplant">Geplant</option>
              <option value="in_arbeit">In Arbeit</option>
              <option value="fertig">Fertig</option>
              <option value="fehlgeschlagen">Fehlgeschlagen</option>
            </select>

            <div className="flex justify-end">
              <button
                onClick={resetFilters}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Filter zurücksetzen
              </button>
            </div>
          </div>
        </div>

        {/* Recent Exports Table */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Letzte Exporte</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Typ</th>
                  <th className="px-6 py-3 font-medium">Format</th>
                  <th className="px-6 py-3 font-medium">Datum</th>
                  <th className="px-6 py-3 font-medium">Umfang</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Aktion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredExports.map((exp) => (
                  <tr key={exp.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {exp.name}
                    </td>
                    <td className="px-6 py-4">
                      <ExportTypeChip type={exp.type} />
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 uppercase">
                        {exp.format === 'csv' && <FileSpreadsheet className="h-3 w-3" />}
                        {exp.format === 'xlsx' && <FileSpreadsheet className="h-3 w-3" />}
                        {exp.format === 'pdf' && <FileText className="h-3 w-3" />}
                        {exp.format}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(exp.createdAt).toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4">{exp.relatedCount} Einträge</td>
                    <td className="px-6 py-4">
                      <ExportStatusBadge status={exp.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link 
                          href={`/exporte/${exp.id}`}
                          className="flex items-center gap-1 text-gray-600 hover:text-blue-600 font-medium text-xs"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Details
                        </Link>
                        {exp.status === "fertig" && (
                          <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium text-xs">
                            <Download className="h-3.5 w-3.5" />
                            Download
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredExports.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      Keine Exporte gefunden.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="border-t border-gray-200 px-6 py-4 text-center">
            <button className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Alle Exporte anzeigen
            </button>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
