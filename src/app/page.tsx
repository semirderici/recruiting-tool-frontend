"use client";

import React from "react";
import Link from "next/link";
import { SidebarLayout } from "@/components/SidebarLayout";
import { dummyCandidates } from "@/data/candidates";
import { dummyJobs } from "@/data/jobs";
import { dummyExports } from "@/data/exports";
import { crmTasks } from "@/data/crmTasks";
import { crmActivities } from "@/data/crmActivities";
import { CrmActivityType } from "@/types/crm";
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
  CalendarClock,
  Activity,
  Calendar,
  Phone,
  Mail,
  MessageCircle,
  Info,
  Building2,
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

  // CRM KPIs
  const openTasksCount = crmTasks.filter(
    (t) => t.status === "open" || t.status === "in_progress"
  ).length;

  const upcomingInterviewsCount = crmTasks.filter((t) => {
    if (t.type !== "interview" || t.status === "completed") return false;
    
    const dueDate = new Date(t.dueDate);
    const today = new Date();
    // Reset times
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Include today and next 7 days
    return diffDays >= 0 && diffDays <= 7;
  }).length;

  // Recent Candidates
  const recentCandidates = dummyCandidates.slice(0, 5);

  // Recent Exports (sorted by date descending)
  const recentExports = [...dummyExports]
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  // Recent Activities
  const recentActivities = [...crmActivities]
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  // Helper for Activity Icons (simplified version of the full page)
  const getActivityIcon = (type: CrmActivityType) => {
    const className = "h-4 w-4";
    switch (type) {
      case "task": return <CheckCircle2 className={className} />;
      case "interview": return <Calendar className={className} />;
      case "call": return <Phone className={className} />;
      case "email": return <Mail className={className} />;
      case "note": return <MessageCircle className={className} />;
      case "system": return <Activity className={className} />;
      default: return <Info className={className} />;
    }
  };

  const getActivityColorClass = (type: CrmActivityType) => {
    switch (type) {
      case "task": return "bg-blue-100 text-blue-600";
      case "interview": return "bg-purple-100 text-purple-600";
      case "call": return "bg-green-100 text-green-600";
      case "email": return "bg-yellow-100 text-yellow-600";
      case "note": return "bg-orange-100 text-orange-600";
      case "system": return "bg-gray-100 text-gray-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

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

          {/* Open Tasks KPI */}
          <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-orange-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {openTasksCount}
            </div>
            <div className="text-sm font-medium text-gray-900">
              Offene Aufgaben
            </div>
            <div className="text-xs text-gray-500">
              Inkl. "In Arbeit"
            </div>
            <div className="mt-auto pt-4">
              <Link
                href="/crm/tasks"
                className="text-sm font-medium text-orange-600 hover:text-orange-800"
              >
                Zu Aufgaben &rarr;
              </Link>
            </div>
          </div>

          {/* Upcoming Interviews KPI */}
          <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 text-sky-600">
              <CalendarClock className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {upcomingInterviewsCount}
            </div>
            <div className="text-sm font-medium text-gray-900">
              Anstehende Interviews
            </div>
            <div className="text-xs text-gray-500">
              In den nächsten 7 Tagen
            </div>
            <div className="mt-auto pt-4">
              <Link
                href="/crm/interviews"
                className="text-sm font-medium text-sky-600 hover:text-sky-800"
              >
                Zu Interviews &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          <div className="h-96 w-full">
            <DashboardCard title="Kandidaten pro Monat" subtitle="Entwicklung der angelegten Profile">
              <CandidatesTrendChart />
            </DashboardCard>
          </div>
          <div className="h-96 w-full">
            <DashboardCard title="Jobs nach Status" subtitle="Verteilung der aktuellen Ausschreibungen">
              <JobsByStatusChart />
            </DashboardCard>
          </div>
        </div>

        {/* Lists Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Candidates List */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
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
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
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

        {/* Latest Activities Section */}
        <div className="mt-8 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Neueste Aktivitäten
              </h2>
              <p className="text-xs text-gray-500">
                Letzte 5 Aktivitäten aus Aufgaben, Interviews, Calls & Co.
              </p>
            </div>
            <Link
              href="/crm/activities"
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Alle Aktivitäten
            </Link>
          </div>
          <div className="p-4">
            {recentActivities.length > 0 ? (
              <ul className="flex flex-col gap-4">
                {recentActivities.map((activity) => (
                  <li key={activity.id} className="flex items-start gap-3">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${getActivityColorClass(
                        activity.type
                      )}`}
                    >
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex flex-1 flex-col gap-0.5">
                      <div className="flex items-start justify-between">
                        <span className="text-sm font-semibold text-gray-900">
                          {activity.title}
                        </span>
                        <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                          {new Date(activity.createdAt).toLocaleString("de-DE", {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 flex flex-wrap items-center gap-2">
                        {activity.relatedToName && (
                          <span className="inline-flex items-center gap-1">
                            {activity.relatedToType === "candidate" && <Users className="h-3 w-3" />}
                            {activity.relatedToType === "job" && <Briefcase className="h-3 w-3" />}
                            {activity.relatedToType === "company" && <Building2 className="h-3 w-3" />}
                            {activity.relatedToName}
                          </span>
                        )}
                        <span className="h-1 w-1 rounded-full bg-gray-300" />
                        <span>Von: {activity.actor}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-6 text-center text-sm text-gray-500">
                Noch keine Aktivitäten vorhanden.
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
