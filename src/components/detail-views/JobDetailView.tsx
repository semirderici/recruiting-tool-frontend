"use client";

import React, { useState } from "react";
import { Job } from "@/types/job";
import { dummyCandidates } from "@/data/candidates";
import Link from "next/link";
import {
  Briefcase,
  Calendar,
  Clock,
  CheckCircle2,
  ExternalLink,
  Building2,
} from "lucide-react";

interface JobDetailViewProps {
  job: Job;
}

export function JobDetailView({ job }: JobDetailViewProps) {
  const [activeTab, setActiveTab] = useState("uebersicht");

  // Dummy matching candidates logic
  const matchingCandidates = dummyCandidates
    .map((c) => ({
      ...c,
      matchScore: Math.floor(Math.random() * 40) + 60, // Random score 60-100
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <nav className="-mb-px flex space-x-8 min-w-max" aria-label="Tabs">
          {[
            { id: "uebersicht", label: "Übersicht" },
            { id: "matching", label: "Matching" },
            { id: "historie", label: "Historie" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              } whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === "uebersicht" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Kurzbeschreibung
              </h2>
              <p className="text-sm text-gray-600">
                Wir suchen einen motivierten {job.title} für unser Team bei{" "}
                {job.companyId ? (
                  <Link
                    href={`/companies/${job.companyId}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {job.company}
                  </Link>
                ) : (
                  job.company
                )}
                . Sie arbeiten in einem dynamischen Umfeld in {job.location}.
              </p>
            </div>

            {/* Tasks */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Aufgaben
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                <li>Verantwortung für die Weiterentwicklung der Produkte</li>
                <li>Zusammenarbeit mit Cross-Functional Teams</li>
                <li>Qualitätssicherung und Code-Reviews</li>
                <li>Mentoring von Junior-Entwicklern</li>
              </ul>
            </div>

            {/* Requirements */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Anforderungen
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                {job.tags.map((tag) => (
                  <li key={tag}>Erfahrung mit {tag}</li>
                ))}
                <li>Gute Kommunikationsfähigkeiten</li>
                <li>Teamgeist und Eigeninitiative</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            {/* Job Infos */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Job-Infos
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Firma</div>
                    <div className="text-sm font-medium text-gray-900">
                      {job.companyId ? (
                        <Link
                          href={`/companies/${job.companyId}`}
                          className="hover:text-blue-600 hover:underline"
                        >
                          {job.company}
                        </Link>
                      ) : (
                        job.company
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Anstellungsart</div>
                    <div className="text-sm font-medium text-gray-900">
                      {job.type}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Erstellt am</div>
                    <div className="text-sm font-medium text-gray-900">
                      {job.createdAt}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Quelle</div>
                    <div className="text-sm font-medium text-gray-900">
                      {job.source}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-500/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "matching" && (
        <div className="space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="text-sm text-gray-500">Treffer gesamt</div>
              <div className="text-2xl font-bold text-gray-900">
                {matchingCandidates.length}
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="text-sm text-gray-500">Ø Match-Score</div>
              <div className="text-2xl font-bold text-gray-900">82%</div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="text-sm text-gray-500">Shortlist</div>
              <div className="text-2xl font-bold text-gray-900">2</div>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                      Kandidat
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                      Match
                    </th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                      Skills
                    </th>
                    <th className="px-6 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">
                      Aktion
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {matchingCandidates.map((c) => (
                    <tr key={c.id}>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {c.name}
                      </td>
                      <td className="px-6 py-4 text-gray-500">{c.status}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          {c.matchScore}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {c.topSkills.slice(0, 2).join(", ")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/candidates/${c.id}`}
                          className="font-medium text-blue-600 hover:text-blue-500"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "historie" && (
        <div className="flow-root rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <ul role="list" className="-mb-8">
            {[
              { text: "Job erstellt", date: "vor 1 Woche" },
              { text: "Erste Kandidaten gematcht", date: "vor 5 Tagen" },
              { text: "Status auf 'Offen' gesetzt", date: "vor 1 Stunde" },
            ].map((event, eventIdx) => (
              <li key={eventIdx}>
                <div className="relative pb-8">
                  {eventIdx !== 2 ? (
                    <span
                      className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 ring-8 ring-white">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-500">
                          {event.text}
                        </p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        {event.date}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
