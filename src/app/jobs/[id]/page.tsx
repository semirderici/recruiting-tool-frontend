"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SidebarLayout } from "@/components/SidebarLayout";
import { crmJobs } from "@/data/crmJobs";
import { crmPipelineItems } from "@/data/crmPipeline";
import { crmTasks } from "@/data/crmTasks";
import { crmActivities } from "@/data/crmActivities";
import { crmCandidates } from "@/data/crmCandidates";
import { computeCandidateJobMatchScore } from "@/utils/matching";
import {
  CrmJob,
  CrmTask,
  CrmActivity,
  CrmJobStatus,
  CrmPipelineStageId,
} from "@/types/crm";
import {
  Briefcase,
  Building2,
  MapPin,
  Calendar,
  User,
  FileText,
  Activity,
  ArrowLeft,
  StickyNote,
  Sparkles,
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

type JobDetailTab = "beschreibung" | "kandidaten" | "notizen" | "dokumente";

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params?.id as string | undefined;
  const [activeTab, setActiveTab] = useState<JobDetailTab>("beschreibung");

  const job = useMemo<CrmJob | undefined>(
    () => crmJobs.find((j) => j.id === jobId),
    [jobId],
  );

  const jobPipelineCandidates = useMemo(
    () =>
      job
        ? crmPipelineItems.filter((item) => item.jobTitle === job.title)
        : [],
    [job],
  );

  const relatedTasks = useMemo<CrmTask[]>(
    () =>
      job
        ? crmTasks.filter(
            (task) =>
              task.relatedToType === "job" &&
              ((task.relatedToId &&
                task.relatedToId.toLowerCase() === job.id) ||
                task.relatedToName.toLowerCase() === job.title.toLowerCase()),
          )
        : [],
    [job],
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
      job
        ? crmActivities
            .filter(
              (activity) =>
                activity.relatedToType === "job" &&
                ((activity.relatedToId &&
                  activity.relatedToId.toLowerCase() === job.id) ||
                  activity.relatedToName.toLowerCase() ===
                    job.title.toLowerCase()),
            )
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
        : [],
    [job],
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

  const matchingCandidates = useMemo(() => {
    if (!job) return [];

    return crmCandidates
      .map((candidate) => {
        const { score, sharedKeywords, locationMatch } =
          computeCandidateJobMatchScore(
            {
              location: candidate.location,
              tags: candidate.tags,
              // skills not in CrmCandidate type
            },
            {
              location: job.location,
              tags: job.tags,
              // skills not in CrmJob type
            }
          );

        return {
          candidate,
          score,
          sharedKeywords,
          locationMatch,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [job]);

  if (!job) {
    return (
      <SidebarLayout>
        <div className="mx-auto max-w-3xl">
          <div className="mb-4">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Zur Jobliste
            </Link>
          </div>
          <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-sm text-red-800">
            Job wurde nicht gefunden.
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
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Zur Jobliste
          </Link>
        </div>

        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-1 items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
              <Briefcase className="h-8 w-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                  <span className="inline-flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5" />
                    <Link href={`/companies/${job.companyId}`} className="hover:underline hover:text-blue-600">
                      {job.companyName}
                    </Link>
                  </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {job.location}
                </span>
                {job.salaryRange && (
                  <span className="inline-flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5" />
                    {job.salaryRange}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-end lg:w-auto">
            <span
              className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${statusClass[job.status]}`}
            >
              {statusLabel[job.status]}
            </span>
            <span className="inline-flex items-center justify-center rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 ring-1 ring-inset ring-violet-600/20">
              Pipeline: {pipelineLabel[job.pipelineStage]}
            </span>
            <span className="inline-flex items-center justify-center rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
              Quelle: {job.source}
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Auftrag & Kunde */}
          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-900">
                Auftrag & Kunde
              </h2>
              <dl className="mt-3 grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <dt className="text-xs text-gray-500">Firma</dt>
                  <dd className="font-medium">{job.companyName}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">Standort</dt>
                  <dd className="font-medium">{job.location}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">Anstellung</dt>
                  <dd className="font-medium">{job.employmentType}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">Seniorität</dt>
                  <dd className="font-medium">{job.seniority}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">Erstellt am</dt>
                  <dd className="font-medium">
                    {new Date(job.createdAt).toLocaleDateString("de-DE")}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">Zuletzt aktualisiert</dt>
                  <dd className="font-medium">
                    {new Date(job.updatedAt).toLocaleDateString("de-DE")}
                  </dd>
                </div>
              </dl>
            </div>

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

            {/* Pipeline & Status */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-900">
                Pipeline & Status
              </h2>
              <div className="mt-3 space-y-2 text-sm text-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Pipeline-Phase</span>
                  <span className="font-medium text-gray-900">
                    {pipelineLabel[job.pipelineStage]}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Kandidaten in Pipeline</span>
                  <span className="font-medium text-gray-900">
                    {jobPipelineCandidates.length}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  href="/crm/pipeline"
                  className="inline-flex w-full items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  Pipeline öffnen
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-4">
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
                      otherTasks.slice(0, 2).map((task) => (
                        <li
                          key={task.id}
                          className="rounded-md border border-gray-100 bg-gray-50 px-3 py-2 text-xs text-gray-700"
                        >
                          <div className="font-medium text-gray-900">
                            {task.title}
                          </div>
                          <div className="mt-1 flex items-center justify-between text-[11px] text-gray-500">
                            <span>{statusLabel[task.status]}</span>
                            {task.dueDate && (
                              <span>
                                {new Date(task.dueDate).toLocaleDateString(
                                  "de-DE",
                                )}
                              </span>
                            )}
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="text-xs text-gray-400">
                        Keine Aufgaben für diesen Job.
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
                      interviews.slice(0, 2).map((task) => (
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
                              {new Date(task.dueDate).toLocaleDateString(
                                "de-DE",
                              )}
                            </div>
                          )}
                        </li>
                      ))
                    ) : (
                      <li className="text-xs text-gray-400">
                        Keine Interviews für diesen Job.
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
                  relatedActivities.slice(0, 3).map((activity) => (
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
                    </li>
                  ))
                ) : (
                  <li className="py-4 text-xs text-gray-400">
                    Keine Aktivitäten für diesen Job vorhanden.
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
                { id: "beschreibung" as JobDetailTab, label: "Beschreibung", icon: FileText },
                { id: "kandidaten" as JobDetailTab, label: "Kandidaten", icon: User },
                { id: "notizen" as JobDetailTab, label: "Notizen", icon: StickyNote },
                { id: "dokumente" as JobDetailTab, label: "Dokumente", icon: FileText },
                { id: "matching" as JobDetailTab, label: "Matching", icon: Sparkles },
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
            {/* Beschreibung */}
            {activeTab === "beschreibung" && (
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900">
                  Stellenbeschreibung (Dummy)
                </h3>
                <div className="mt-3 space-y-4 text-sm text-gray-700">
                  <p>
                    {job.shortDescription ||
                      "Hier steht die ausführliche Beschreibung der Position."}
                  </p>
                  <div>
                    <h4 className="font-medium text-gray-900">Aufgaben</h4>
                    <ul className="mt-1 list-disc pl-5">
                      <li>Verantwortung für die Weiterentwicklung der Plattform</li>
                      <li>Zusammenarbeit mit dem Produkt-Team</li>
                      <li>Code Reviews und Mentoring</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Anforderungen</h4>
                    <ul className="mt-1 list-disc pl-5">
                      <li>Erfahrung in moderner Softwareentwicklung</li>
                      <li>Teamfähigkeit und Kommunikationsstärke</li>
                      <li>Gute Englischkenntnisse</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Angebot</h4>
                    <ul className="mt-1 list-disc pl-5">
                      <li>Flexible Arbeitszeiten</li>
                      <li>Modernes Equipment</li>
                      <li>Attraktives Gehaltspaket</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Kandidaten */}
            {activeTab === "kandidaten" && (
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900">
                  Kandidaten in Pipeline
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Liste der Kandidaten, die diesem Job zugeordnet sind.
                </p>
                <div className="mt-4">
                  {jobPipelineCandidates.length > 0 ? (
                    <ul className="divide-y divide-gray-100">
                      {jobPipelineCandidates.map((candidate) => (
                        <li
                          key={candidate.id}
                          className="flex items-center justify-between py-3"
                        >
                          <div>
                            <div className="font-medium text-gray-900">
                              {candidate.candidateName}
                            </div>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {candidate.tags?.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center rounded-full bg-gray-50 px-2 py-0.5 text-xs text-gray-600 ring-1 ring-inset ring-gray-500/10"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="inline-flex items-center rounded-full bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-700 ring-1 ring-inset ring-violet-600/20">
                              {pipelineLabel[candidate.stage]}
                            </span>
                            <span className="text-xs text-gray-500">
                              {candidate.source}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="py-4 text-sm text-gray-500">
                      Keine Kandidaten in der Pipeline.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Notizen */}
            {activeTab === "notizen" && (
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900">Notizen</h3>
                <ul className="mt-3 space-y-3 text-sm text-gray-700">
                  <li className="border-l-2 border-blue-200 pl-3">
                    <p className="font-medium text-gray-900">Budgetfreigabe</p>
                    <p className="text-xs text-gray-500">
                      Vor 3 Tagen · Semir Derici
                    </p>
                    <p className="mt-1 text-sm text-gray-700">
                      Budget für diese Stelle wurde auf 95k erhöht.
                    </p>
                  </li>
                  <li className="border-l-2 border-gray-200 pl-3">
                    <p className="font-medium text-gray-900">Briefing mit Hiring Manager</p>
                    <p className="text-xs text-gray-500">
                      Vor 1 Woche · Semir Derici
                    </p>
                    <p className="mt-1 text-sm text-gray-700">
                      Fokus liegt auf Erfahrung mit skalierbaren Architekturen.
                    </p>
                  </li>
                </ul>
              </div>
            )}

            {/* Dokumente */}
            {activeTab === "dokumente" && (
              <div className="grid gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Dokumente
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700">
                    <li className="flex items-center justify-between rounded-md border border-gray-100 px-3 py-2">
                      <span>Stellenprofil.pdf</span>
                      <span className="text-xs text-gray-400">aktuell</span>
                    </li>
                    <li className="flex items-center justify-between rounded-md border border-gray-100 px-3 py-2">
                      <span>Kundenbriefing.docx</span>
                      <span className="text-xs text-gray-400">intern</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-500 flex flex-col justify-between">
                  <p className="mb-4">Hier können Dokumente zum Job hochgeladen werden.</p>
                  
                  <div className="mt-auto border-t border-gray-200 pt-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Reports</p>
                    <Link 
                      href="/exporte"
                      className="inline-flex items-center rounded-md bg-white border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                      Matching-Report exportieren
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Matching */}
            {activeTab === "matching" && (
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">Passende Kandidaten</h3>
                  <Link
                    href={`/research/job-to-candidates?jobId=${job.id}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
                  >
                    Job → Kandidaten (Research öffnen)
                  </Link>
                </div>
                {matchingCandidates.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    Es sind noch keine passenden Kandidaten im System hinterlegt.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                      <thead className="border-b border-gray-100 text-xs font-medium uppercase tracking-wide text-gray-500">
                        <tr>
                          <th className="py-2 pr-4">Kandidat</th>
                          <th className="py-2 pr-4">Rolle</th>
                          <th className="py-2 pr-4">Standort</th>
                          <th className="py-2 pr-4">Score</th>
                          <th className="py-2 pr-4">Überschneidungen</th>
                          <th className="py-2 pl-4 text-right">Aktionen</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {matchingCandidates.map(
                          ({ candidate, score, sharedKeywords, locationMatch }) => (
                            <tr key={candidate.id}>
                              <td className="py-2 pr-4">
                                <div className="flex flex-col">
                                  <span className="font-medium text-gray-900">
                                    {candidate.name}
                                  </span>
                                  {candidate.status && (
                                    <span className="text-xs text-gray-500">
                                      Status: {candidate.status}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="py-2 pr-4 text-gray-700">
                                {candidate.role}
                              </td>
                              <td className="py-2 pr-4 text-gray-700">
                                {candidate.location}
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
                                  href={`/candidates/${candidate.id}`}
                                  className="text-xs font-medium text-blue-600 hover:text-blue-700"
                                >
                                  Kandidat öffnen
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
          </div>
        </section>
      </div>
    </SidebarLayout>
  );
}
