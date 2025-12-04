import React from "react";
import Link from "next/link";
import { SidebarLayout } from "@/components/SidebarLayout";
import { crmTasks } from "@/data/crmTasks";
import { crmPipelineItems } from "@/data/crmPipeline";
import { crmActivities } from "@/data/crmActivities";
import { crmExports } from "@/data/crmExports";
import {
  ClipboardList,
  CalendarClock,
  Workflow,
  Activity,
  FileSpreadsheet,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { CrmPipelineStageId } from "@/types/crm";

export default function DashboardPage() {
  // ---------------------------------------------------------------------------
  // Data Preparation & Logic
  // ---------------------------------------------------------------------------

  // 1. KPIs
  // "Offene Aufgaben" -> status === "open"
  const openTasksCount = crmTasks.filter((t) => t.status === "open").length;

  // "Geplante Interviews" -> type === "interview" && status != "completed"
  // (Assuming "open" or "in_progress" matches the intent of "planned")
  const upcomingInterviews = crmTasks.filter(
    (t) => t.type === "interview" && t.status !== "completed"
  );
  const plannedInterviewsCount = upcomingInterviews.length;

  // "Kandidaten in Pipeline"
  const pipelineItemsCount = crmPipelineItems.length;

  // "Aktivitäten gesamt"
  const activitiesCount = crmActivities.length;

  // 2. Next Steps
  // a) Next Tasks (excluding interviews for this list to avoid duplication, or just all open tasks)
  // Logic: status "open", sort by dueDate asc, take 3
  const nextTasks = crmTasks
    .filter((t) => t.status === "open" && t.type !== "interview")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  // b) Next Interviews
  // Logic: type "interview", status != completed, sort by dueDate asc, take 3
  const nextInterviews = upcomingInterviews
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  // 3. Pipeline Snapshot
  // Group by stage, count, find max for progress bars
  const stagesOrder: CrmPipelineStageId[] = [
    "new",
    "contacted",
    "interview",
    "offer",
    "hired",
    "rejected",
  ];

  const pipelineStats = stagesOrder.map((stage) => {
    const count = crmPipelineItems.filter((i) => i.stage === stage).length;
    return { stage, count };
  });

  const maxPipelineCount = Math.max(...pipelineStats.map((s) => s.count), 1); // avoid division by zero

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

  // 4. Recent Activities
  const recentActivities = [...crmActivities]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // 5. Recent Exports
  const recentExports = [...crmExports]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  // Helper for export status colors
  const getExportStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700";
      case "running": return "bg-yellow-100 text-yellow-800";
      case "failed": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getExportStatusLabel = (status: string) => {
    switch (status) {
      case "completed": return "Erfolgreich";
      case "running": return "Laufend";
      case "failed": return "Fehlgeschlagen";
      default: return status;
    }
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <SidebarLayout>
      <div className="mx-auto max-w-7xl pb-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Überblick über Aufgaben, Interviews, Pipeline und Aktivitäten.
          </p>
        </div>

        {/* Row 1: KPI Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {/* KPI 1: Offene Aufgaben */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Offene Aufgaben</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{openTasksCount}</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                <ClipboardList className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/crm/tasks" className="text-xs font-medium text-blue-600 hover:underline">
                Zu den Aufgaben &rarr;
              </Link>
            </div>
          </div>

          {/* KPI 2: Geplante Interviews */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Geplante Interviews</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{plannedInterviewsCount}</p>
              </div>
              <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
                <CalendarClock className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/crm/interviews" className="text-xs font-medium text-purple-600 hover:underline">
                Zu den Interviews &rarr;
              </Link>
            </div>
          </div>

          {/* KPI 3: Pipeline */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Kandidaten in Pipeline</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{pipelineItemsCount}</p>
              </div>
              <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                <Workflow className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/crm/pipeline" className="text-xs font-medium text-indigo-600 hover:underline">
                Zur Pipeline &rarr;
              </Link>
            </div>
          </div>

          {/* KPI 4: Aktivitäten */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Aktivitäten gesamt</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{activitiesCount}</p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                <Activity className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/crm/activities" className="text-xs font-medium text-emerald-600 hover:underline">
                Zu den Aktivitäten &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Row 2: Next Steps & Pipeline Snapshot */}
        <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Card A: Nächste Schritte */}
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-bold text-gray-900">Nächste Schritte</h2>
            
            <div className="flex-1 space-y-6">
              {/* Aufgaben Liste */}
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
                  <ClipboardList className="h-4 w-4" /> Aufgaben
                </h3>
                {nextTasks.length > 0 ? (
                  <ul className="space-y-3">
                    {nextTasks.map((task) => (
                      <li key={task.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm ring-1 ring-gray-200">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 line-clamp-1">{task.title}</p>
                            <p className="text-xs text-gray-500">
                              {task.relatedToName ? `Bezug: ${task.relatedToName}` : "Allgemein"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right text-xs text-gray-500">
                          {new Date(task.dueDate).toLocaleDateString("de-DE", {
                            day: "2-digit",
                            month: "2-digit",
                          })}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400">Keine offenen Aufgaben.</p>
                )}
              </div>

              {/* Interviews Liste */}
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
                  <CalendarClock className="h-4 w-4" /> Interviews
                </h3>
                {nextInterviews.length > 0 ? (
                  <ul className="space-y-3">
                    {nextInterviews.map((interview) => (
                      <li key={interview.id} className="flex items-center justify-between rounded-lg bg-purple-50 p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-purple-600 shadow-sm ring-1 ring-purple-100">
                            <Calendar className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 line-clamp-1">{interview.title}</p>
                            <p className="text-xs text-purple-700">
                              {interview.relatedToName}
                            </p>
                          </div>
                        </div>
                        <div className="text-right text-xs text-purple-700 font-medium">
                          {new Date(interview.dueDate).toLocaleDateString("de-DE", {
                            day: "2-digit",
                            month: "2-digit",
                          })}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400">Keine geplanten Interviews.</p>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <Link href="/crm/tasks" className="text-sm font-medium text-blue-600 hover:underline">
                Alle Aufgaben & Interviews &rarr;
              </Link>
            </div>
          </div>

          {/* Card B: Pipeline Snapshot */}
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-bold text-gray-900">Pipeline-Snapshot</h2>
            
            <div className="flex-1 space-y-4">
              {pipelineStats.map((stat) => {
                const percentage = (stat.count / maxPipelineCount) * 100;
                return (
                  <div key={stat.stage}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700">{getStageLabel(stat.stage)}</span>
                      <span className="text-gray-500">{stat.count} Kandidaten</span>
                    </div>
                    <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="absolute left-0 top-0 h-full rounded-full bg-indigo-500 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <Link href="/crm/pipeline" className="text-sm font-medium text-indigo-600 hover:underline">
                Pipeline öffnen &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Row 3: Recent Activities & Exports */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Card C: Letzte Aktivitäten */}
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-bold text-gray-900">Letzte Aktivitäten</h2>
            
            <div className="flex-1">
              {recentActivities.length > 0 ? (
                <ul className="divide-y divide-gray-100">
                  {recentActivities.map((activity) => (
                    <li key={activity.id} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900">{activity.title}</p>
                          <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                            <span className="inline-flex items-center rounded-md bg-gray-100 px-1.5 py-0.5 capitalize text-gray-700">
                              {activity.type}
                            </span>
                            {activity.relatedToName && (
                              <>
                                <span>&bull;</span>
                                <span className="truncate">{activity.relatedToName}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="whitespace-nowrap text-xs text-gray-400">
                          {new Date(activity.createdAt).toLocaleDateString("de-DE")}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">Keine Aktivitäten gefunden.</p>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <Link href="/crm/activities" className="text-sm font-medium text-emerald-600 hover:underline">
                Alle Aktivitäten anzeigen &rarr;
              </Link>
            </div>
          </div>

          {/* Card D: Exporte & Berichte */}
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-bold text-gray-900">Exporte & Berichte</h2>
            
            <div className="flex-1">
              {recentExports.length > 0 ? (
                <ul className="divide-y divide-gray-100">
                  {recentExports.map((exportItem) => (
                    <li key={exportItem.id} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <FileSpreadsheet className="h-4 w-4 text-gray-400" />
                            <p className="truncate text-sm font-medium text-gray-900">{exportItem.title}</p>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">
                            Erstellt von {exportItem.createdBy}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-600 bg-gray-100 border border-gray-200">
                            {exportItem.format}
                          </span>
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${getExportStatusColor(exportItem.status)}`}>
                            {getExportStatusLabel(exportItem.status)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">Keine Exporte gefunden.</p>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <Link href="/exporte" className="text-sm font-medium text-green-600 hover:underline">
                Zu den Exporten &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
