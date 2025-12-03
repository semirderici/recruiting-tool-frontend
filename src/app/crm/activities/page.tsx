"use client";

import React, { useState, useMemo } from "react";
import { crmActivities } from "@/data/crmActivities";
import { CrmActivity, CrmActivityType, CrmTaskRelationType } from "@/types/crm";
import {
  Search,
  Calendar,
  User,
  Briefcase,
  Building2,
  CheckCircle2,
  Phone,
  Mail,
  MessageCircle,
  Info,
  Activity,
  Filter,
} from "lucide-react";

export default function ActivitiesPage() {
  // State
  const [activities] = useState<CrmActivity[]>(crmActivities);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<CrmActivityType | "all">("all");
  const [relationFilter, setRelationFilter] = useState<"all" | CrmTaskRelationType>("all");
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "this_week" | "this_month">("all");

  // Helper Functions
  const getTypeLabel = (type: CrmActivityType) => {
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

  const getTypeIcon = (type: CrmActivityType) => {
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

  const getTypeColorClass = (type: CrmActivityType) => {
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

  const getRelationLabel = (activity: CrmActivity) => {
    const iconClass = "h-3.5 w-3.5 mr-1.5 inline-block text-gray-400";
    switch (activity.relatedToType) {
      case "candidate":
        return (
          <span className="flex items-center text-xs text-gray-600">
            <User className={iconClass} /> Kandidat · {activity.relatedToName}
          </span>
        );
      case "job":
        return (
          <span className="flex items-center text-xs text-gray-600">
            <Briefcase className={iconClass} /> Job · {activity.relatedToName}
          </span>
        );
      case "company":
        return (
          <span className="flex items-center text-xs text-gray-600">
            <Building2 className={iconClass} /> Firma · {activity.relatedToName}
          </span>
        );
      default:
        return <span className="text-xs text-gray-500">-</span>;
    }
  };

  // Filter Logic
  const filteredActivities = useMemo(() => {
    return activities
      .filter((activity) => {
        // Search
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          activity.title.toLowerCase().includes(searchLower) ||
          (activity.description && activity.description.toLowerCase().includes(searchLower)) ||
          activity.relatedToName.toLowerCase().includes(searchLower) ||
          activity.actor.toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;

        // Type
        if (typeFilter !== "all" && activity.type !== typeFilter) return false;

        // Relation
        if (relationFilter !== "all" && activity.relatedToType !== relationFilter) return false;

        // Date
        if (dateFilter !== "all") {
          const actDate = new Date(activity.createdAt);
          const today = new Date();
          // Reset times
          actDate.setHours(0, 0, 0, 0);
          today.setHours(0, 0, 0, 0);

          const diffTime = today.getTime() - actDate.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (dateFilter === "today") {
            if (diffTime !== 0) return false;
          } else if (dateFilter === "this_week") {
            if (diffDays < 0 || diffDays > 7) return false;
          } else if (dateFilter === "this_month") {
            if (diffDays < 0 || diffDays > 30) return false;
          }
        }

        return true;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [activities, searchTerm, typeFilter, relationFilter, dateFilter]);

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Aktivitäten</h1>
        <p className="mt-1 text-sm text-gray-500">
          Alle Aktivitäten rund um Kandidaten, Jobs und Kunden – Interviews, Aufgaben, Notizen & mehr.
        </p>
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
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as CrmActivityType | "all")}
              >
                <option value="all">Typ: Alle</option>
                <option value="task">Aufgaben</option>
                <option value="interview">Interviews</option>
                <option value="call">Calls</option>
                <option value="email">E-Mails</option>
                <option value="note">Notizen</option>
                <option value="system">System</option>
              </select>
            </div>

            <div className="relative">
              <select
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                value={relationFilter}
                onChange={(e) => setRelationFilter(e.target.value as CrmTaskRelationType | "all")}
              >
                <option value="all">Bezug: Alle</option>
                <option value="candidate">Kandidaten</option>
                <option value="job">Jobs</option>
                <option value="company">Firmen</option>
              </select>
            </div>

            <div className="relative">
              <select
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value as any)}
              >
                <option value="all">Zeitraum: Alle</option>
                <option value="today">Heute</option>
                <option value="this_week">Diese Woche</option>
                <option value="this_month">Dieser Monat</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {filteredActivities.length > 0 ? (
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {filteredActivities.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== filteredActivities.length - 1 ? (
                      <span
                        className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex items-start space-x-3">
                      <div className={`relative flex h-10 w-10 items-center justify-center rounded-full ring-8 ring-white ${getTypeColorClass(activity.type)}`}>
                        {getTypeIcon(activity.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <a href="#" className="font-medium text-gray-900">
                              {activity.title}
                            </a>
                          </div>
                          <p className="mt-0.5 text-xs text-gray-500">
                            {new Date(activity.createdAt).toLocaleString("de-DE", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>{activity.description}</p>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-3">
                          {getRelationLabel(activity)}
                          <span className="text-xs text-gray-500">
                            Von: <span className="font-medium text-gray-900">{activity.actor}</span>
                          </span>
                          {activity.source && (
                            <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                              {activity.source}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-gray-100 p-3 mb-4">
              <Filter className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-900">Keine Aktivitäten gefunden</h3>
            <p className="mt-1 text-sm text-gray-500">
              Passe die Filter an oder ändere den Suchbegriff.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

