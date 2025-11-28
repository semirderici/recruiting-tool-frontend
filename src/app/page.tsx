"use client";

import React from "react";
import Link from "next/link";
import { SidebarLayout } from "@/components/SidebarLayout";
import { dummyCandidates } from "@/data/candidates";
import { dummyJobs } from "@/data/jobs";
import { dummyExports } from "@/data/exports";
import { ExportStatusBadge } from "@/components/ExportStatusBadge";
import { ExportTypeChip } from "@/components/ExportTypeChip";
import { DashboardCard } from "@/components/DashboardCard";
import { CandidatesTrendChart } from "@/components/charts/CandidatesTrendChart";
import { JobsByStatusChart } from "@/components/charts/JobsByStatusChart";
import {
  Users,
  Briefcase,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  MapPin,
  FileSpreadsheet,
  FileText,
} from "lucide-react";

export default function DashboardPage() {
  // KPI Calculations
  const totalCandidates = dummyCandidates.length;

  const activeJobsCount = dummyJobs.filter(
    (job) => job.status === "Offen" || job.status === "In Bearbeitung"
  ).length;

  // Calculate average match score from candidates who have a score
  const candidatesWithScore = dummyCandidates.filter(
    (c) => c.bestMatchScore !== undefined
  );
  const avgMatchScore =
    candidatesWithScore.length > 0
      ? candidatesWithScore.reduce(
          (sum, c) => sum + (c.bestMatchScore || 0),
          0
        ) / candidatesWithScore.length
      : 0;

  const finishedExportsCount = dummyExports.filter(
    (e) => e.status === "fertig"
  ).length;

  // Recent Candidates
  const recentCandidates = dummyCandidates.slice(0, 5);

  // Recent Exports (sorted by date descending)
  const recentExports = [...dummyExports]
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <SidebarLayout>
      <div className="mx-auto max-w-7xl pb-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Überblick über Kandidaten, Jobs, Matching und Exporte.
          </p>
        </div>

        {/* KPI Grid */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {/* Candidates KPI */}
          <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <Users className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {totalCandidates}
            </div>
            <div className="text-sm font-medium text-gray-900">
              Kandidaten gesamt
            </div>
            <div className="text-xs text-gray-500">Aktive Profile im System</div>
            <div className="mt-auto pt-4">
              <Link
                href="/candidates"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Zu Kandidaten &rarr;
              </Link>
            </div>
          </div>

          {/* Active Jobs KPI */}
          <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-purple-600">
              <Briefcase className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {activeJobsCount}
            </div>
            <div className="text-sm font-medium text-gray-900">Aktive Jobs</div>
            <div className="text-xs text-gray-500">
              Offene oder laufende Suchmandate
            </div>
            <div className="mt-auto pt-4">
              <Link
                href="/jobs"
                className="text-sm font-medium text-purple-600 hover:text-purple-800"
              >
                Zu Jobs &rarr;
              </Link>
            </div>
          </div>

          {/* Avg Match Score KPI */}
          <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {avgMatchScore.toFixed(1)}
            </div>
            <div className="text-sm font-medium text-gray-900">
              Ø Match-Score
            </div>
            <div className="text-xs text-gray-500">
              Basierend auf aktuellen Matchings
            </div>
            <div className="mt-auto pt-4">
              <Link
                href="/research"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                Zum Research &rarr;
              </Link>
            </div>
          </div>

          {/* Exports KPI */}
          <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {finishedExportsCount}
            </div>
            <div className="text-sm font-medium text-gray-900">
              Erfolgreiche Exporte
            </div>
            <div className="text-xs text-gray-500">
              Berichte & Listen der letzten Zeit
            </div>
            <div className="mt-auto pt-4">
              <Link
                href="/exporte"
                className="text-sm font-medium text-green-600 hover:text-green-800"
              >
                Zu Exporten &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Trends & Charts Section */}
        <section className="mb-8 space-y-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Trends & Entwicklung</h2>
            <p className="text-sm text-gray-500">Visuelle Übersicht zu Kandidaten, Jobs und Match-Scores.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <DashboardCard title="Kandidaten pro Monat" subtitle="Entwicklung der angelegten Profile">
              <CandidatesTrendChart />
            </DashboardCard>
            <DashboardCard title="Jobs nach Status" subtitle="Verteilung der aktuellen Ausschreibungen">
              <JobsByStatusChart />
            </DashboardCard>
          </div>
        </section>

        {/* Lists Grid */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Recent Candidates List */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Neueste Kandidaten
              </h2>
              <Link
                href="/candidates"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Alle anzeigen
              </Link>
            </div>
            <div className="p-4">
              <div className="flex flex-col">
                {recentCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-gray-900">
                        {candidate.name}
                      </span>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{candidate.role}</span>
                        <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-300" />
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          {candidate.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                        {candidate.status}
                      </span>
                      {candidate.bestMatchScore && (
                        <span
                          className={`text-xs font-medium ${
                            candidate.bestMatchScore >= 85
                              ? "text-green-600"
                              : candidate.bestMatchScore >= 50
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          Match: {candidate.bestMatchScore}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Exports List */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Letzte Exporte
              </h2>
              <Link
                href="/exporte"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Alle Exporte
              </Link>
            </div>
            <div className="p-4">
              <div className="flex flex-col">
                {recentExports.map((exp) => (
                  <div
                    key={exp.id}
                    className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-gray-900">
                        {exp.name}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <ExportTypeChip type={exp.type} />
                        <span className="flex items-center gap-1 uppercase">
                          {exp.format === "csv" && (
                            <FileSpreadsheet className="h-3 w-3" />
                          )}
                          {exp.format === "xlsx" && (
                            <FileSpreadsheet className="h-3 w-3" />
                          )}
                          {exp.format === "pdf" && (
                            <FileText className="h-3 w-3" />
                          )}
                          {exp.format}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <ExportStatusBadge status={exp.status} />
                      <Link
                        href={`/exporte/${exp.id}`}
                        className="text-gray-400 hover:text-blue-600"
                        title="Details anzeigen"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
