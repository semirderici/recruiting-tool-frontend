"use client";

import React, { useMemo, useState } from "react";
import { crmTasks } from "@/data/crmTasks";
import { crmActivities } from "@/data/crmActivities";
import { crmPipelineItems } from "@/data/crmPipeline";
import {
  CrmTaskStatus,
  CrmActivityType,
  CrmPipelineStageId,
} from "@/types/crm";
import {
  BarChart3,
  TrendingUp,
  Activity,
  Users,
  Briefcase,
  Clock,
  CheckCircle2,
  Filter,
} from "lucide-react";

const getStatusLabel = (status: CrmTaskStatus) => {
  switch (status) {
    case "open": return "Offen";
    case "in_progress": return "In Arbeit";
    case "completed": return "Erledigt";
    case "overdue": return "Überfällig";
    default: return status;
  }
};

const getStageLabel = (stage: CrmPipelineStageId) => {
  switch (stage) {
    case "new": return "Neu";
    case "contacted": return "Kontaktiert";
    case "interview": return "Interview";
    case "offer": return "Angebot";
    case "hired": return "Eingestellt";
    case "rejected": return "Abgesagt";
    default: return stage;
  }
};

const getActivityTypeLabel = (type: CrmActivityType) => {
  switch (type) {
    case "task": return "Aufgabe";
    case "interview": return "Interview";
    case "call": return "Call";
    case "email": return "E-Mail";
    case "note": return "Notiz";
    case "system": return "System";
    default: return type;
  }
};

export default function ReportingPage() {
  const [timeframe, setTimeframe] = useState<"7" | "30" | "all">("30");

  const isWithinDays = (isoDate: string, days: number | "all"): boolean => {
    if (days === "all") return true;
    const d = new Date(isoDate);
    const today = new Date();
    d.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - d.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= days && diffDays >= 0;
  };

  // 1. Filtered Lists
  const filteredTasks = useMemo(
    () =>
      crmTasks.filter((t) =>
        isWithinDays(t.createdAt, timeframe === "all" ? "all" : Number(timeframe))
      ),
    [timeframe]
  );

  const filteredActivities = useMemo(
    () =>
      crmActivities.filter((a) =>
        isWithinDays(a.createdAt, timeframe === "all" ? "all" : Number(timeframe))
      ),
    [timeframe]
  );

  const filteredPipeline = useMemo(
    () =>
      crmPipelineItems.filter((p) =>
        isWithinDays(p.createdAt, timeframe === "all" ? "all" : Number(timeframe))
      ),
    [timeframe]
  );

  // 2. KPIs
  const totalOpenTasks = useMemo(
    () => filteredTasks.filter((t) => t.status === "open").length,
    [filteredTasks]
  );

  const upcomingInterviews = useMemo(
    () => filteredPipeline.filter((p) => p.stage === "interview").length,
    [filteredPipeline]
  );

  const hiredCandidates = useMemo(
    () => filteredPipeline.filter((p) => p.stage === "hired").length,
    [filteredPipeline]
  );

  const activityCount = filteredActivities.length;

  // 3. Distributions
  // Tasks by Status
  const tasksByStatus = useMemo(() => {
    const map: Record<CrmTaskStatus, number> = {
      open: 0,
      in_progress: 0,
      completed: 0,
      overdue: 0,
    };
    filteredTasks.forEach((t) => {
      if (map[t.status] !== undefined) {
        map[t.status]++;
      }
    });

    const total = filteredTasks.length || 1;

    return [
      { label: getStatusLabel("open"), count: map.open, percent: (map.open / total) * 100 },
      { label: getStatusLabel("in_progress"), count: map.in_progress, percent: (map.in_progress / total) * 100 },
      { label: getStatusLabel("completed"), count: map.completed, percent: (map.completed / total) * 100 },
      { label: getStatusLabel("overdue"), count: map.overdue, percent: (map.overdue / total) * 100 },
    ];
  }, [filteredTasks]);

  // Pipeline by Stage
  const pipelineByStage = useMemo(() => {
    const map: Record<CrmPipelineStageId, number> = {
      new: 0,
      contacted: 0,
      interview: 0,
      offer: 0,
      hired: 0,
      rejected: 0,
    };
    filteredPipeline.forEach((p) => {
      if (map[p.stage] !== undefined) {
        map[p.stage]++;
      }
    });

    const total = filteredPipeline.length || 1;

    return [
      { label: getStageLabel("new"), count: map.new, percent: (map.new / total) * 100 },
      { label: getStageLabel("contacted"), count: map.contacted, percent: (map.contacted / total) * 100 },
      { label: getStageLabel("interview"), count: map.interview, percent: (map.interview / total) * 100 },
      { label: getStageLabel("offer"), count: map.offer, percent: (map.offer / total) * 100 },
      { label: getStageLabel("hired"), count: map.hired, percent: (map.hired / total) * 100 },
      { label: getStageLabel("rejected"), count: map.rejected, percent: (map.rejected / total) * 100 },
    ];
  }, [filteredPipeline]);

  // Activities by Type
  const activitiesByType = useMemo(() => {
    const map: Record<CrmActivityType, number> = {
      task: 0,
      interview: 0,
      call: 0,
      email: 0,
      note: 0,
      system: 0,
    };
    filteredActivities.forEach((a) => {
      if (map[a.type] !== undefined) {
        map[a.type]++;
      }
    });

    const total = filteredActivities.length || 1;

    return [
      { label: getActivityTypeLabel("task"), count: map.task, percent: (map.task / total) * 100 },
      { label: getActivityTypeLabel("interview"), count: map.interview, percent: (map.interview / total) * 100 },
      { label: getActivityTypeLabel("call"), count: map.call, percent: (map.call / total) * 100 },
      { label: getActivityTypeLabel("email"), count: map.email, percent: (map.email / total) * 100 },
      { label: getActivityTypeLabel("note"), count: map.note, percent: (map.note / total) * 100 },
      { label: getActivityTypeLabel("system"), count: map.system, percent: (map.system / total) * 100 },
    ];
  }, [filteredActivities]);

  // Recent Activities
  const recentActivities = useMemo(() => {
    return [...filteredActivities]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }, [filteredActivities]);

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            Reporting & KPIs
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Überblick über Tasks, Pipeline und Aktivitäten im gewählten Zeitraum.
          </p>
        </div>
      </div>

      {/* Filterleiste */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Filter className="h-4 w-4 text-gray-400" />
          <span>Filtere KPIs nach Zeitraum.</span>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-gray-500">Zeitraum</label>
          <select
            className="block rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as "7" | "30" | "all")}
          >
            <option value="7">Letzte 7 Tage</option>
            <option value="30">Letzte 30 Tage</option>
            <option value="all">Alle</option>
          </select>
        </div>
      </div>

      {/* KPI-Karten */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Card 1: Offene Aufgaben */}
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{totalOpenTasks}</div>
            <div className="text-xs text-gray-500">Offene Aufgaben</div>
          </div>
        </div>
        {/* Card 2: Interviews */}
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-50 text-violet-600">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{upcomingInterviews}</div>
            <div className="text-xs text-gray-500">Interviews in Pipeline</div>
          </div>
        </div>
        {/* Card 3: Hired */}
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{hiredCandidates}</div>
            <div className="text-xs text-gray-500">Eingestellte Kandidaten</div>
          </div>
        </div>
        {/* Card 4: Activity Count */}
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{activityCount}</div>
            <div className="text-xs text-gray-500">Aktivitäten im Zeitraum</div>
          </div>
        </div>
      </div>

      {/* Sektion: Tasks nach Status + Pipeline nach Phase */}
      <div className="mb-8 grid gap-6 md:grid-cols-2">
        {/* Tasks Status */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-gray-400" />
            <h2 className="text-base font-semibold text-gray-900">Tasks nach Status</h2>
          </div>
          <div className="space-y-4">
            {tasksByStatus.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{stat.label}</span>
                  <span className="text-xs font-medium text-gray-500">
                    {stat.count} {stat.count === 1 ? "Task" : "Tasks"}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${stat.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline Phase */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-gray-400" />
            <h2 className="text-base font-semibold text-gray-900">Pipeline nach Phase</h2>
          </div>
          <div className="space-y-4">
            {pipelineByStage.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{stat.label}</span>
                  <span className="text-xs font-medium text-gray-500">
                    {stat.count} {stat.count === 1 ? "Kandidat" : "Kandidaten"}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-violet-500"
                    style={{ width: `${stat.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sektion: Aktivitäten nach Typ + letzte Aktivitäten */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Activity Types */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-gray-400" />
            <h2 className="text-base font-semibold text-gray-900">Aktivitäten nach Typ</h2>
          </div>
          <div className="space-y-4">
            {activitiesByType.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{stat.label}</span>
                  <span className="text-xs font-medium text-gray-500">
                    {stat.count} {stat.count === 1 ? "Aktivität" : "Aktivitäten"}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-amber-500"
                    style={{ width: `${stat.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-400" />
            <h2 className="text-base font-semibold text-gray-900">Letzte Aktivitäten</h2>
          </div>
          <div className="flex flex-col">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex justify-between items-start py-3 border-b last:border-b-0 border-gray-100"
                >
                  <div>
                    <div className="text-sm font-medium text-gray-900">{activity.title}</div>
                    <div className="text-xs text-gray-500">
                      {getActivityTypeLabel(activity.type)} · {activity.relatedToName}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 whitespace-nowrap ml-2">
                    {new Date(activity.createdAt).toLocaleDateString("de-DE")}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-sm text-gray-500">
                Keine Aktivitäten im gewählten Zeitraum.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
