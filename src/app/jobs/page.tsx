"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { SidebarLayout } from "@/components/SidebarLayout";
import { crmJobs } from "@/data/crmJobs";
import { CrmJobStatus, CrmPipelineStageId } from "@/types/crm";
import {
  Search,
  MapPin,
  Building2,
  ArrowRight,
} from "lucide-react";

const statusLabel: Record<CrmJobStatus, string> = {
  open: "Offen",
  on_hold: "Pausiert",
  closed: "Geschlossen",
  draft: "Entwurf",
};

const statusClass: Record<CrmJobStatus, string> = {
  open: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  on_hold: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
  closed: "bg-gray-50 text-gray-700 ring-gray-500/10",
  draft: "bg-blue-50 text-blue-700 ring-blue-600/20",
};

const pipelineLabel: Record<CrmPipelineStageId, string> = {
  new: "Neu",
  contacted: "Kontaktiert",
  interview: "Interview",
  offer: "Angebot",
  hired: "Eingestellt",
  rejected: "Abgesagt",
};

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<CrmJobStatus | "all">("all");

  const filteredJobs = useMemo(() => {
    const search = searchTerm.toLowerCase();

    return crmJobs.filter((job) => {
      if (statusFilter !== "all" && job.status !== statusFilter) {
        return false;
      }

      if (!search) return true;

      const haystack = [
        job.title,
        job.companyName,
        job.location,
        job.source,
        ...(job.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(search);
    });
  }, [searchTerm, statusFilter]);

  return (
    <SidebarLayout>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
            <p className="mt-1 text-sm text-gray-500">
              Überblick über alle Jobs, deren Status und Pipeline-Phasen.
            </p>
          </div>
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
                placeholder="Suche nach Job, Firma, Standort, Tag..."
              />
            </div>

            {/* Status-Filter */}
            <div className="relative w-full lg:w-56">
              <select
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as CrmJobStatus | "all")
                }
              >
                <option value="all">Status: Alle</option>
                <option value="open">Offen</option>
                <option value="on_hold">Pausiert</option>
                <option value="closed">Geschlossen</option>
                <option value="draft">Entwurf</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Job
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Firma
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Standort
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
                  Pipeline
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Quelle
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
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <Link
                        href={`/jobs/${job.id}`}
                        className="font-medium text-gray-900 hover:text-blue-600"
                      >
                        {job.title}
                      </Link>
                      {job.shortDescription && (
                        <span className="text-xs text-gray-500 line-clamp-1">
                          {job.shortDescription}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Building2 className="h-3.5 w-3.5 text-gray-400" />
                      <Link
                        href={job.companyId ? `/companies/${job.companyId}` : "#"}
                        className={job.companyId ? "hover:text-blue-600 hover:underline" : ""}
                      >
                        {job.companyName}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <MapPin className="h-3.5 w-3.5 text-gray-400" />
                      <span>{job.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
                        statusClass[job.status]
                      }`}
                    >
                      {statusLabel[job.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <span className="text-xs text-gray-600">
                      {pipelineLabel[job.pipelineStage]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <span className="text-xs text-gray-600">
                      {job.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                      Details
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}

              {filteredJobs.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-sm text-gray-500"
                  >
                    Keine Jobs gefunden. Filter anpassen oder Suchbegriff
                    ändern.
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
