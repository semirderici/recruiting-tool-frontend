"use client";

import React, { useMemo, useState } from "react";
import { crmPipelineItems } from "@/data/crmPipeline";
import {
  CrmPipelineItem,
  CrmPipelineStageId,
  CrmPipelineStage,
} from "@/types/crm";
import {
  Search,
  User,
  Briefcase,
  Building2,
  Calendar,
  KanbanSquare,
} from "lucide-react";

const PIPELINE_STAGES: CrmPipelineStage[] = [
  { id: "new", label: "Neu" },
  { id: "contacted", label: "Kontaktiert" },
  { id: "interview", label: "Interview" },
  { id: "offer", label: "Angebot" },
  { id: "hired", label: "Eingestellt" },
  { id: "rejected", label: "Abgesagt" },
];

const stageBgClass: Record<CrmPipelineStageId, string> = {
  new: "bg-sky-50",
  contacted: "bg-blue-50",
  interview: "bg-violet-50",
  offer: "bg-amber-50",
  hired: "bg-emerald-50",
  rejected: "bg-rose-50",
};

const stageBorderClass: Record<CrmPipelineStageId, string> = {
  new: "border-sky-100",
  contacted: "border-blue-100",
  interview: "border-violet-100",
  offer: "border-amber-100",
  hired: "border-emerald-100",
  rejected: "border-rose-100",
};

const stageBadgeClass: Record<CrmPipelineStageId, string> = {
  new: "bg-sky-100 text-sky-700",
  contacted: "bg-blue-100 text-blue-700",
  interview: "bg-violet-100 text-violet-700",
  offer: "bg-amber-100 text-amber-800",
  hired: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
};

export default function CrmPipelinePage() {
  const [items] = useState<CrmPipelineItem[]>(crmPipelineItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobFilter, setJobFilter] = useState<string | "all">("all");

  const jobOptions = useMemo(() => {
    const jobs = Array.from(new Set(items.map((i) => i.jobTitle)));
    return jobs.sort();
  }, [items]);

  const filteredBySearchAndJob = useMemo(() => {
    const search = searchTerm.toLowerCase();
    return items.filter((item) => {
      if (jobFilter !== "all" && item.jobTitle !== jobFilter) return false;

      if (!search) return true;

      const haystack = [
        item.candidateName,
        item.jobTitle,
        item.companyName,
        item.source ?? "",
        ...(item.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(search);
    });
  }, [items, searchTerm, jobFilter]);

  const itemsByStage = useMemo(() => {
    const map: Record<CrmPipelineStageId, CrmPipelineItem[]> = {
      new: [],
      contacted: [],
      interview: [],
      offer: [],
      hired: [],
      rejected: [],
    };

    filteredBySearchAndJob.forEach((item) => {
      map[item.stage].push(item);
    });

    // innerhalb der Spalte nach updatedAt sortieren (neuestes oben)
    (Object.keys(map) as CrmPipelineStageId[]).forEach((stageId) => {
      map[stageId].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    });

    return map;
  }, [filteredBySearchAndJob]);

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <KanbanSquare className="h-6 w-6 text-blue-600" />
            Pipeline
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Visualisiere deine Recruiting-Pipeline – von neuen Kandidaten bis
            zur Einstellung.
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
              placeholder="Suche nach Kandidat, Job, Firma, Skill..."
            />
          </div>

          {/* Job-Filter */}
          <div className="relative w-full lg:w-64">
            <select
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              value={jobFilter}
              onChange={(e) =>
                setJobFilter(
                  e.target.value === "" || e.target.value === "all"
                    ? "all"
                    : e.target.value
                )
              }
            >
              <option value="all">Alle Jobs</option>
              {jobOptions.map((job) => (
                <option key={job} value={job}>
                  {job}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Kanban-Board */}
      <div className="mb-6 grid gap-4 overflow-x-auto pb-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
        {PIPELINE_STAGES.map((stage) => {
          const stageItems = itemsByStage[stage.id];
          return (
            <div
              key={stage.id}
              className={`flex min-h-[260px] flex-col rounded-xl border ${stageBorderClass[stage.id]} bg-gray-50/60`}
            >
              {/* Spalten-Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-3 py-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${stageBadgeClass[stage.id]}`}
                  >
                    {stage.label}
                  </span>
                </div>
                <span className="text-xs font-medium text-gray-400">
                  {stageItems.length}
                </span>
              </div>

              {/* Karten */}
              <div className="flex-1 space-y-3 overflow-y-auto p-3">
                {stageItems.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-lg border bg-white p-3 shadow-sm transition hover:shadow-md ${stageBgClass[stage.id]}`}
                  >
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <p className="text-sm font-medium text-gray-900">
                          {item.candidateName}
                        </p>
                      </div>
                      <span className="text-[10px] uppercase tracking-wide text-gray-400">
                        {stage.label}
                      </span>
                    </div>

                    <div className="mb-2 space-y-1">
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Briefcase className="h-3.5 w-3.5 text-gray-400" />
                        <span className="truncate">{item.jobTitle}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Building2 className="h-3.5 w-3.5 text-gray-400" />
                        <span className="truncate">{item.companyName}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                        <span>
                          Aktualisiert:{" "}
                          {new Date(item.updatedAt).toLocaleDateString("de-DE")}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1">
                      {item.source && (
                        <span className="inline-flex items-center rounded-full bg-white/60 px-2 py-0.5 text-[11px] font-medium text-gray-600 ring-1 ring-inset ring-gray-200">
                          {item.source}
                        </span>
                      )}
                      {item.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-white/60 px-2 py-0.5 text-[11px] text-gray-500 ring-1 ring-inset ring-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

                {stageItems.length === 0 && (
                  <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50/60 p-3 text-center">
                    <p className="text-xs text-gray-400">
                      Noch keine Kandidaten in „{stage.label}“.
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

