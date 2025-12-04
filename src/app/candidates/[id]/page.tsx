"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SidebarLayout } from "@/components/SidebarLayout";
import { crmCandidates } from "@/data/crmCandidates";
import { crmTasks } from "@/data/crmTasks";
import { crmActivities } from "@/data/crmActivities";
import { crmPipelineItems } from "@/data/crmPipeline";
import { crmJobs } from "@/data/crmJobs";
import { computeCandidateJobMatchScore } from "@/utils/matching";
import {
  CrmCandidate,
  CrmCandidateStatus,
  CrmPipelineStageId,
  CrmTask,
  CrmActivity,
} from "@/types/crm";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Building2,
  Calendar,
  Activity,
  UserCircle2,
  Tag,
  FileText,
  StickyNote,
  Sparkles,
} from "lucide-react";

const statusLabel: Record<CrmCandidateStatus, string> = {
  active: "Aktiv",
  passive: "Passiv",
  placed: "Platziert",
};

const statusClass: Record<CrmCandidateStatus, string> = {
  active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  passive: "bg-gray-50 text-gray-700 ring-gray-500/10",
  placed: "bg-blue-50 text-blue-700 ring-blue-600/20",
};

const pipelineLabel: Record<CrmPipelineStageId, string> = {
  new: "Neu",
  contacted: "Kontaktiert",
  interview: "Interview",
  offer: "Angebot",
  hired: "Eingestellt",
  rejected: "Abgesagt",
};

type CandidateDetailTab = "documents" | "notes" | "matching" | "cv";

export default function CandidateDetailPage() {
  const params = useParams();
  const candidateId = params?.id as string | undefined;
  const [activeTab, setActiveTab] = useState<CandidateDetailTab>("documents");

  const candidate = useMemo<CrmCandidate | undefined>(
    () => crmCandidates.find((c) => c.id === candidateId),
    [candidateId],
  );

  const pipelineItem = useMemo(
    () =>
      candidate
        ? crmPipelineItems.find(
            (item) => item.candidateName === candidate.name,
          )
        : undefined,
    [candidate],
  );

  const effectivePipelineStage: CrmPipelineStageId | undefined =
    (candidate?.pipelineStage ?? pipelineItem?.stage) as
      | CrmPipelineStageId
      | undefined;

  const relatedTasks = useMemo<CrmTask[]>(
    () =>
      candidate
        ? crmTasks.filter(
            (task) =>
              task.relatedToType === "candidate" &&
              ((task.relatedToId &&
                task.relatedToId.toLowerCase() === candidate.id) ||
                task.relatedToName.toLowerCase() ===
                  candidate.name.toLowerCase()),
          )
        : [],
    [candidate],
  );

  const interviews = useMemo(
    () => relatedTasks.filter((t) => t.type === "interview"),
    [relatedTasks],
  );

  const otherTasks = useMemo(
    () => relatedTasks.filter((t) => t.type !== "interview"),
    [relatedTasks],
  );

  const relatedActivities = useMemo<CrmActivity[]>(
    () =>
      candidate
        ? crmActivities
            .filter(
              (activity) =>
                activity.relatedToType === "candidate" &&
                ((activity.relatedToId &&
                  activity.relatedToId.toLowerCase() === candidate.id) ||
                  activity.relatedToName.toLowerCase() ===
                    candidate.name.toLowerCase()),
            )
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
        : [],
    [candidate],
  );

  const openTasksCount = useMemo(
    () =>
      relatedTasks.filter(
        (t) => t.status === "open" || t.status === "in_progress",
      ).length,
    [relatedTasks],
  );

  const nextInterview = useMemo(() => {
    const futureInterviews = interviews
      .slice()
      .sort(
        (a, b) =>
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
      );
    return futureInterviews[0];
  }, [interviews]);

  const matchingJobs = useMemo(() => {
    if (!candidate) return [];

    return crmJobs
      .map((job) => {
        const { score, sharedKeywords, locationMatch } =
          computeCandidateJobMatchScore(
            {
              location: candidate.location,
              tags: candidate.tags,
              // skills not in CrmCandidate type, so omit
            },
            {
              location: job.location,
              tags: job.tags,
              // skills not in CrmJob type, so omit
            }
          );

        return {
          job,
          score,
          sharedKeywords,
          locationMatch,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // Top 5 anzeigen
  }, [candidate]);

  const lastActivity = relatedActivities[0];

  if (!candidate) {
    return (
      <SidebarLayout>
        <div className="mx-auto max-w-3xl">
          <div className="mb-4">
            <Link
              href="/candidates"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Zur Kandidatenliste
            </Link>
          </div>
          <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-sm text-red-800">
            Kandidat wurde nicht gefunden.
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
            href="/candidates"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Zur Kandidatenliste
          </Link>
        </div>

        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-1 items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
              <UserCircle2 className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {candidate.name}
              </h1>
              <p className="mt-1 text-sm text-gray-600">{candidate.role}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                {candidate.location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {candidate.location}
                  </span>
                )}
                {candidate.company && (
                  <span className="inline-flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5" />
                    {candidate.company}
                  </span>
                )}
                {candidate.salaryRange && (
                  <span className="inline-flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5" />
                    {candidate.salaryRange}
                  </span>
                )}
              </div>
              {candidate.headline && (
                <p className="mt-3 text-sm text-gray-700">{candidate.headline}</p>
              )}
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-end lg:w-auto">
            <span
              className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${statusClass[candidate.status]}`}
            >
              {statusLabel[candidate.status]}
            </span>
            {effectivePipelineStage && (
              <span className="inline-flex items-center justify-center rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 ring-1 ring-inset ring-violet-600/20">
                Pipeline: {pipelineLabel[effectivePipelineStage]}
              </span>
            )}
            {candidate.source && (
              <span className="inline-flex items-center justify-center rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                Quelle: {candidate.source}
              </span>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Linke Spalte */}
          <div className="space-y-4">
            {/* Kontakt */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-900">Kontakt</h2>
              <dl className="mt-3 space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{candidate.email ?? "Keine E-Mail hinterlegt"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{candidate.phone ?? "Keine Telefonnummer hinterlegt"}</span>
                </div>
              </dl>
            </div>

            {/* Tags / Skills */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-900">
                Skills & Tags
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {candidate.tags && candidate.tags.length > 0 ? (
                  candidate.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-0.5 text-xs text-gray-700 ring-1 ring-inset ring-gray-200"
                    >
                      <Tag className="h-3 w-3 text-gray-400" />
                      {tag}
                    </span>
                  ))
                ) : (
                  <p className="text-xs text-gray-400">
                    Noch keine Tags hinterlegt.
                  </p>
                )}
              </div>
            </div>

            {/* Pipeline-Karte */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-900">
                Pipeline & Status
              </h2>
              <div className="mt-3 space-y-2 text-sm text-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Pipeline-Phase</span>
                  <span className="font-medium text-gray-900">
                    {effectivePipelineStage
                      ? pipelineLabel[effectivePipelineStage]
                      : "Keine Phase gesetzt"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Offene Aufgaben</span>
                  <span className="font-medium text-gray-900">
                    {openTasksCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Interviews</span>
                  <span className="font-medium text-gray-900">
                    {interviews.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Letzte Aktivität</span>
                  <span className="text-xs text-gray-700">
                    {lastActivity
                      ? new Date(lastActivity.createdAt).toLocaleDateString(
                          "de-DE",
                        )
                      : "Keine Aktivitäten"}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Link
                  href="/crm/pipeline"
                  className="inline-flex flex-1 items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  Pipeline öffnen
                </Link>
                <Link
                  href="/crm/tasks"
                  className="inline-flex flex-1 items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  Aufgaben anzeigen
                </Link>
              </div>
            </div>
          </div>

          {/* Rechte Spalte */}
          <div className="space-y-4 lg:col-span-2">
            {/* Nächste Schritte */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-900">
                Nächste Schritte
              </h2>
              <div className="mt-3 space-y-2 text-sm text-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Nächstes Interview</span>
                  {nextInterview ? (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {new Date(nextInterview.dueDate).toLocaleDateString(
                        "de-DE",
                      )}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">
                      Kein Interview geplant.
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Offene Aufgaben</span>
                  <span className="font-medium text-gray-900">
                    {openTasksCount > 0
                      ? `${openTasksCount} offene ${
                          openTasksCount === 1 ? "Aufgabe" : "Aufgaben"
                        }`
                      : "Keine offenen Aufgaben"}
                  </span>
                </div>
              </div>
            </div>

            {/* Aufgaben & Interviews */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-900">
                Aufgaben & Interviews
              </h2>

              <div className="mt-3 grid gap-4 md:grid-cols-2">
                {/* Aufgaben */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Aufgaben
                  </h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    {otherTasks.length > 0 ? (
                      otherTasks.map((task) => (
                        <li
                          key={task.id}
                          className="rounded-md border border-gray-100 bg-gray-50 px-3 py-2 text-xs text-gray-700"
                        >
                          <div className="font-medium text-gray-900">
                            {task.title}
                          </div>
                          {task.dueDate && (
                            <div className="mt-1 flex items-center gap-1 text-[11px] text-gray-500">
                              <Calendar className="h-3 w-3" />
                              Fällig am{" "}
                              {new Date(task.dueDate).toLocaleDateString(
                                "de-DE",
                              )}
                            </div>
                          )}
                        </li>
                      ))
                    ) : (
                      <li className="text-xs text-gray-400">
                        Keine Aufgaben für diesen Kandidaten.
                      </li>
                    )}
                  </ul>
                </div>

                {/* Interviews */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Interviews
                  </h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    {interviews.length > 0 ? (
                      interviews.map((task) => (
                        <li
                          key={task.id}
                          className="rounded-md border border-indigo-50 bg-indigo-50/60 px-3 py-2 text-xs text-gray-700"
                        >
                          <div className="font-medium text-gray-900">
                            {task.title}
                          </div>
                          {task.dueDate && (
                            <div className="mt-1 flex items-center gap-1 text-[11px] text-gray-500">
                              <Calendar className="h-3 w-3" />
                              {new Date(task.dueDate).toLocaleString("de-DE", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })}
                            </div>
                          )}
                        </li>
                      ))
                    ) : (
                      <li className="text-xs text-gray-400">
                        Keine Interviews für diesen Kandidaten.
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Aktivitäten */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                <Activity className="h-4 w-4 text-gray-400" />
                Aktivitäten
              </h2>
              <ul className="mt-3 divide-y divide-gray-100 text-sm">
                {relatedActivities.length > 0 ? (
                  relatedActivities.slice(0, 8).map((activity) => (
                    <li key={activity.id} className="py-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-gray-900">
                            {activity.title}
                          </p>
                          <p className="text-[11px] text-gray-500">
                            {activity.type.charAt(0).toUpperCase() +
                              activity.type.slice(1)}
                            {activity.actor ? ` · ${activity.actor}` : ""}
                          </p>
                        </div>
                        <span className="text-[11px] text-gray-400">
                          {new Date(activity.createdAt).toLocaleDateString(
                            "de-DE",
                          )}
                        </span>
                      </div>
                      {activity.description && (
                        <p className="mt-1 text-xs text-gray-600">
                          {activity.description}
                        </p>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="py-4 text-xs text-gray-400">
                    Keine Aktivitäten für diesen Kandidaten vorhanden.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Tab-Bereich */}
        <section className="mt-8">
          {/* Tab-Leiste */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex gap-6 text-sm">
              {[
                { id: "documents" as CandidateDetailTab, label: "Dokumente", icon: FileText },
                { id: "notes" as CandidateDetailTab, label: "Notizen", icon: StickyNote },
                { id: "matching" as CandidateDetailTab, label: "Matching", icon: Sparkles },
                { id: "cv" as CandidateDetailTab, label: "Lebenslauf", icon: FileText },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={
                      "flex items-center gap-2 border-b-2 px-1 pb-2 text-sm font-medium transition-colors " +
                      (isActive
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300")
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab-Content */}
          <div className="pt-4">
            {/* Dokumente */}
            {activeTab === "documents" && (
              <div className="grid gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Hochgeladene Dokumente</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Platzhalter – später werden hier echte Dokumente (CV, Profil-PDF, Exporte) angezeigt.
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700">
                    <li className="flex items-center justify-between rounded-md border border-gray-100 px-3 py-2">
                      <span>Lebenslauf.pdf</span>
                      <span className="text-xs text-gray-400">aktuell</span>
                    </li>
                    <li className="flex items-center justify-between rounded-md border border-gray-100 px-3 py-2">
                      <span>Profil-Export.pdf</span>
                      <span className="text-xs text-gray-400">Vorschau</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-500 flex flex-col justify-between">
                  <p className="mb-4">
                    Hier könntest du später einen Button zum Upload oder zur Verknüpfung mit internen
                    Dokumenten einblenden.
                  </p>
                  
                  <div className="mt-auto border-t border-gray-200 pt-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Profil als Export vorbereiten?</p>
                    <Link 
                      href="/exporte"
                      className="text-xs text-blue-600 hover:underline font-medium"
                    >
                      Zur Exportübersicht &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Notizen */}
            {activeTab === "notes" && (
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900">Notizen</h3>
                <p className="mt-1 text-xs text-gray-500">
                  Platzhalter – hier werden später strukturierte Recruiter-Notizen zum Kandidaten angezeigt.
                </p>
                <ul className="mt-3 space-y-3 text-sm text-gray-700">
                  <li className="border-l-2 border-blue-200 pl-3">
                    <p className="font-medium text-gray-900">Erstes Screening</p>
                    <p className="text-xs text-gray-500">25.11.2025 · Semir Derici</p>
                    <p className="mt-1 text-sm text-gray-700">
                      Sehr passend für Senior-Frontend-Rollen, Fokus auf React &amp; TypeScript.
                    </p>
                  </li>
                  <li className="border-l-2 border-gray-200 pl-3">
                    <p className="font-medium text-gray-900">Gehaltsrange bestätigt</p>
                    <p className="text-xs text-gray-500">28.11.2025 · Semir Derici</p>
                    <p className="mt-1 text-sm text-gray-700">
                      Kandidat ist offen für Remote / Hybrid, Gehaltsrange wie im Profil angegeben.
                    </p>
                  </li>
                </ul>
              </div>
            )}

            {/* Matching */}
            {activeTab === "matching" && (
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">Passende Jobs</h3>
                  <Link
                    href={`/research/cv-to-jobs?candidateId=${candidate.id}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
                  >
                    CV → Jobs (Research öffnen)
                  </Link>
                </div>
                {matchingJobs.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    Es sind noch keine passenden Jobs im System hinterlegt.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                      <thead className="border-b border-gray-100 text-xs font-medium uppercase tracking-wide text-gray-500">
                        <tr>
                          <th className="py-2 pr-4">Job</th>
                          <th className="py-2 pr-4">Firma</th>
                          <th className="py-2 pr-4">Standort</th>
                          <th className="py-2 pr-4">Score</th>
                          <th className="py-2 pr-4">Überschneidungen</th>
                          <th className="py-2 pl-4 text-right">Aktionen</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {matchingJobs.map(
                          ({ job, score, sharedKeywords, locationMatch }) => (
                            <tr key={job.id}>
                              <td className="py-2 pr-4">
                                <div className="flex flex-col">
                                  <span className="font-medium text-gray-900">
                                    {job.title}
                                  </span>
                                  {job.status && (
                                    <span className="text-xs text-gray-500">
                                      Status: {job.status}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="py-2 pr-4 text-gray-700">
                                {job.companyName}
                              </td>
                              <td className="py-2 pr-4 text-gray-700">
                                {job.location}
                                {locationMatch && (
                                  <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                                    Standort-Match
                                  </span>
                                )}
                              </td>
                              <td className="py-2 pr-4">
                                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                  {score} %
                                </span>
                              </td>
                              <td className="py-2 pr-4 text-xs text-gray-600">
                                {sharedKeywords.length > 0 ? (
                                  <div className="flex flex-wrap gap-1">
                                    {sharedKeywords.slice(0, 4).map((kw) => (
                                      <span
                                        key={kw}
                                        className="rounded-full bg-gray-50 px-2 py-0.5 text-[11px] text-gray-600 ring-1 ring-gray-200"
                                      >
                                        {kw}
                                      </span>
                                    ))}
                                  </div>
                                ) : (
                                  <span className="text-gray-400">
                                    Keine Überschneidungen
                                  </span>
                                )}
                              </td>
                              <td className="py-2 pl-4 text-right">
                                <a
                                  href={`/jobs/${job.id}`}
                                  className="text-xs font-medium text-blue-600 hover:text-blue-700"
                                >
                                  Job öffnen
                                </a>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Lebenslauf */}
            {activeTab === "cv" && (
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900">Lebenslauf (Preview)</h3>
                <p className="mt-1 text-xs text-gray-500">
                  Platzhalter – hier soll später der analysierte Lebenslauf / CV-Text des Kandidaten angezeigt werden.
                </p>
                <div className="mt-4 rounded-lg border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                  <p>
                    Hier wird zukünftig der CV aus dem Backend eingeblendet (z. B. als Textvorschau oder eingebettetes PDF).
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </SidebarLayout>
  );
}
