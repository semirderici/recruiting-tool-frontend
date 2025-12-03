"use client";

import React, { useState, useMemo } from "react";
import { crmTasks } from "@/data/crmTasks";
import { CrmTask, CrmTaskStatus } from "@/types/crm";
import { TaskFormModal, TaskFormValues } from "@/components/crm/TaskFormModal";
import {
  Search,
  Plus,
  CheckCircle2,
  Calendar,
  MoreHorizontal,
  User,
  Briefcase,
  Building2,
} from "lucide-react";

export default function InterviewsPage() {
  // State
  const [tasks, setTasks] = useState<CrmTask[]>(crmTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<CrmTaskStatus | "all">("all");
  const [dueFilter, setDueFilter] = useState<"all" | "today" | "this_week" | "later">("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Helper Functions for Badges & Labels
  const getStatusLabel = (status: CrmTaskStatus) => {
    switch (status) {
      case "open": return "Offen";
      case "in_progress": return "In Arbeit";
      case "completed": return "Erledigt";
      case "overdue": return "Überfällig";
      default: return status;
    }
  };

  const getStatusClasses = (status: CrmTaskStatus) => {
    switch (status) {
      case "open": return "bg-blue-50 text-blue-700 ring-blue-600/20";
      case "in_progress": return "bg-yellow-50 text-yellow-800 ring-yellow-600/20";
      case "completed": return "bg-green-50 text-green-700 ring-green-600/20";
      case "overdue": return "bg-red-50 text-red-700 ring-red-600/10";
      default: return "bg-gray-50 text-gray-600 ring-gray-500/10";
    }
  };

  const getPriorityLabel = (p: string) => {
    switch (p) {
      case "low": return "Niedrig";
      case "medium": return "Mittel";
      case "high": return "Hoch";
      default: return p;
    }
  };

  const getPriorityClasses = (p: string) => {
    switch (p) {
      case "low": return "text-gray-600 bg-gray-100";
      case "medium": return "text-amber-700 bg-amber-50";
      case "high": return "text-rose-700 bg-rose-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getRelationLabel = (task: CrmTask) => {
    const iconClass = "h-3.5 w-3.5 mr-1.5 inline-block";
    switch (task.relatedToType) {
      case "candidate":
        return (
          <span className="flex items-center text-gray-600">
            <User className={iconClass} /> Kandidat · {task.relatedToName}
          </span>
        );
      case "job":
        return (
          <span className="flex items-center text-gray-600">
            <Briefcase className={iconClass} /> Job · {task.relatedToName}
          </span>
        );
      case "company":
        return (
          <span className="flex items-center text-gray-600">
            <Building2 className={iconClass} /> Firma · {task.relatedToName}
          </span>
        );
      default:
        return <span className="text-gray-500">-</span>;
    }
  };

  // Logic: Create Interview
  const handleCreateInterview = (values: TaskFormValues) => {
    const now = new Date();
    const due = new Date(values.dueDate);

    const newTask: CrmTask = {
      id: `i-${now.getTime()}`,
      title: values.title,
      description: values.description,
      type: "interview", // Fix: immer Interview
      status: "open",
      priority: values.priority,
      relatedToType: values.relatedToType,
      relatedToName: values.relatedToName,
      dueDate: due.toISOString(),
      createdAt: now.toISOString(),
      owner: values.owner,
      notes: values.notes,
    };

    setTasks((prev) => [newTask, ...prev]);
    setIsCreateModalOpen(false);
  };

  // Logic: Mark as completed
  const handleMarkAsDone = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "completed" } : t))
    );
  };

  // Filter Logic
  const filteredInterviews = useMemo(() => {
    // 1. Base filter: Only tasks of type "interview"
    const interviewTasks = tasks.filter((t) => t.type === "interview");

    // 2. Additional filters
    return interviewTasks.filter((task) => {
      // Search
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        task.title.toLowerCase().includes(searchLower) ||
        task.relatedToName.toLowerCase().includes(searchLower) ||
        task.owner.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;

      // Status
      if (statusFilter !== "all" && task.status !== statusFilter) return false;

      // Due Date
      if (dueFilter !== "all") {
        const due = new Date(task.dueDate);
        const today = new Date();
        // Reset times for accurate day comparison
        due.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const diffTime = due.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (dueFilter === "today") {
          if (diffTime !== 0) return false;
        } else if (dueFilter === "this_week") {
          // "This week" = next 7 days exclusive today
          if (diffDays <= 0 || diffDays > 7) return false;
        } else if (dueFilter === "later") {
          if (diffDays <= 7) return false;
        }
      }

      return true;
    });
  }, [tasks, searchTerm, statusFilter, dueFilter]);

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Interviews</h1>
          <p className="mt-1 text-sm text-gray-500">
            Geplante und durchgeführte Interviews im Überblick – nach Kandidaten, Jobs und Kunden.
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus className="h-4 w-4" />
          Neues Interview
        </button>
      </div>

      {/* Filters */}
      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              placeholder="Suche nach Titel, Kandidat, Firma..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Selects */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative">
              <select
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as CrmTaskStatus | "all")}
              >
                <option value="all">Status: Alle</option>
                <option value="open">Offen</option>
                <option value="in_progress">In Arbeit</option>
                <option value="completed">Erledigt</option>
                <option value="overdue">Überfällig</option>
              </select>
            </div>

            <div className="relative">
              <select
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                value={dueFilter}
                onChange={(e) => setDueFilter(e.target.value as any)}
              >
                <option value="all">Fälligkeit: Alle</option>
                <option value="today">Heute</option>
                <option value="this_week">Diese Woche</option>
                <option value="later">Später</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content: Desktop Table */}
      <div className="hidden md:block rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th scope="col" className="px-6 py-3 text-left font-medium uppercase tracking-wider">Interview</th>
              <th scope="col" className="px-6 py-3 text-left font-medium uppercase tracking-wider">Zugehörig zu</th>
              <th scope="col" className="px-6 py-3 text-left font-medium uppercase tracking-wider">Fällig am</th>
              <th scope="col" className="px-6 py-3 text-left font-medium uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left font-medium uppercase tracking-wider">Priorität</th>
              <th scope="col" className="px-6 py-3 text-right font-medium uppercase tracking-wider">Aktionen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredInterviews.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{task.title}</span>
                    {task.description && (
                      <span className="text-xs text-gray-500 truncate max-w-xs">{task.description}</span>
                    )}
                    <span className="mt-1 text-xs text-gray-400">Von: {task.owner}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">{getRelationLabel(task)}</div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                    {new Date(task.dueDate).toLocaleDateString("de-DE")}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusClasses(
                      task.status
                    )}`}
                  >
                    {getStatusLabel(task.status)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getPriorityClasses(
                      task.priority
                    )}`}
                  >
                    {getPriorityLabel(task.priority)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {task.status !== "completed" && (
                      <button
                        onClick={() => handleMarkAsDone(task.id)}
                        className="flex items-center justify-center rounded-md p-1.5 text-gray-400 hover:bg-green-50 hover:text-green-600 transition-colors"
                        title="Als erledigt markieren"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </button>
                    )}
                    <button className="flex items-center justify-center rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredInterviews.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  Keine Interviews gefunden. Filter anpassen oder Suchbegriff ändern.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Content: Mobile Cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {filteredInterviews.map((task) => (
          <div key={task.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{task.title}</h3>
                {task.description && (
                  <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{task.description}</p>
                )}
              </div>
              <span
                className={`ml-2 shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${getStatusClasses(
                  task.status
                )}`}
              >
                {getStatusLabel(task.status)}
              </span>
            </div>

            <div className="mb-4">
              <span className="inline-flex items-center rounded-md border border-gray-100 px-2 py-1 text-xs text-gray-600">
                {getRelationLabel(task)}
              </span>
            </div>

            <div className="mb-4 flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(task.dueDate).toLocaleDateString("de-DE")}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  {task.owner}
                </span>
              </div>
              <span
                className={`inline-flex items-center rounded-md px-1.5 py-0.5 font-medium ${getPriorityClasses(
                  task.priority
                )}`}
              >
                {getPriorityLabel(task.priority)}
              </span>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 rounded-md border border-gray-200 bg-white py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                Details
              </button>
              {task.status !== "completed" && (
                <button
                  onClick={() => handleMarkAsDone(task.id)}
                  className="flex-1 rounded-md bg-blue-600 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                >
                  Erledigt
                </button>
              )}
            </div>
          </div>
        ))}
        
        {filteredInterviews.length === 0 && (
           <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
              Keine Interviews gefunden.
           </div>
        )}
      </div>

      <TaskFormModal
        open={isCreateModalOpen}
        initialType="interview"
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateInterview}
      />
    </div>
  );
}
