"use client";

import React, { useState, useMemo } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import { crmActivities } from "@/data/crmActivities";
import { CrmActivity } from "@/types/crm";
import {
  Activity,
  Search,
  Filter,
  User,
  Briefcase,
  Building2,
  Phone,
  Mail,
  CalendarClock,
  FileText,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

export default function ActivitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | CrmActivity["type"]>("all");
  const [dateRange, setDateRange] = useState<"all" | "7d" | "30d">("all");

  const filteredActivities = useMemo(() => {
    const now = new Date();
    const searchLower = searchTerm.toLowerCase();

    return crmActivities
      .filter((activity) => {
        // 1. Search Term
        const matchesSearch =
          !searchTerm ||
          activity.title.toLowerCase().includes(searchLower) ||
          (activity.description && activity.description.toLowerCase().includes(searchLower)) ||
          activity.relatedToName.toLowerCase().includes(searchLower) ||
          activity.actor.toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;

        // 2. Type Filter
        if (typeFilter !== "all" && activity.type !== typeFilter) {
          return false;
        }

        // 3. Date Range
        if (dateRange !== "all") {
          const actDate = new Date(activity.createdAt);
          const diffTime = now.getTime() - actDate.getTime();
          const diffDays = diffTime / (1000 * 60 * 60 * 24);

          if (dateRange === "7d" && diffDays > 7) return false;
          if (dateRange === "30d" && diffDays > 30) return false;
        }

        return true;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [searchTerm, typeFilter, dateRange]);

  const getActivityIcon = (type: CrmActivity["type"]) => {
    const className = "h-5 w-5";
    switch (type) {
      case "task":
        return <CheckCircle2 className={`${className} text-blue-600`} />;
      case "interview":
        return <CalendarClock className={`${className} text-purple-600`} />;
      case "call":
        return <Phone className={`${className} text-green-600`} />;
      case "email":
        return <Mail className={`${className} text-yellow-600`} />;
      case "note":
        return <MessageCircle className={`${className} text-orange-600`} />;
      case "system":
        return <Activity className={`${className} text-gray-600`} />;
      default:
        return <Activity className={`${className} text-gray-400`} />;
    }
  };

  const getRelationIcon = (relationType: string) => {
    const className = "h-3.5 w-3.5 mr-1";
    switch (relationType) {
      case "candidate":
        return <User className={className} />;
      case "job":
        return <Briefcase className={className} />;
      case "company":
        return <Building2 className={className} />;
      default:
        return <Activity className={className} />;
    }
  };

  const getTypeLabel = (type: CrmActivity["type"]) => {
    switch (type) {
      case "task":
        return "Aufgabe";
      case "interview":
        return "Interview";
      case "call":
        return "Call";
      case "email":
        return "E-Mail";
      case "note":
        return "Notiz";
      case "system":
        return "System";
      default:
        return type;
    }
  };

  const getTypeBadgeClass = (type: CrmActivity["type"]) => {
    switch (type) {
      case "task":
        return "bg-blue-50 text-blue-700 ring-blue-600/20";
      case "interview":
        return "bg-purple-50 text-purple-700 ring-purple-600/20";
      case "call":
        return "bg-green-50 text-green-700 ring-green-600/20";
      case "email":
        return "bg-yellow-50 text-yellow-700 ring-yellow-600/20";
      case "note":
        return "bg-orange-50 text-orange-700 ring-orange-600/20";
      case "system":
        return "bg-gray-50 text-gray-700 ring-gray-500/10";
      default:
        return "bg-gray-50 text-gray-600 ring-gray-500/10";
    }
  };

  return (
    <SidebarLayout>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Aktivitäten</h1>
          <p className="mt-1 text-sm text-gray-500">
            Globale Timeline aller Interaktionen und Ereignisse im CRM.
          </p>
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
                placeholder="Suche nach Titel, Inhalt, Person..."
              />
            </div>

            {/* Typ-Filter */}
            <div className="relative w-full lg:w-48">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(e.target.value as "all" | CrmActivity["type"])
                }
              >
                <option value="all">Typ: Alle</option>
                <option value="task">Aufgabe</option>
                <option value="interview">Interview</option>
                <option value="call">Call</option>
                <option value="email">E-Mail</option>
                <option value="note">Notiz</option>
                <option value="system">System</option>
              </select>
            </div>

            {/* Zeitraum-Filter */}
            <div className="relative w-full lg:w-48">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <CalendarClock className="h-4 w-4 text-gray-400" />
              </div>
              <select
                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                value={dateRange}
                onChange={(e) =>
                  setDateRange(e.target.value as "all" | "7d" | "30d")
                }
              >
                <option value="all">Zeitraum: Alle</option>
                <option value="7d">Letzte 7 Tage</option>
                <option value="30d">Letzte 30 Tage</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste */}
        <div className="flex flex-col gap-3">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:bg-gray-50 md:flex-row md:items-center md:justify-between"
              >
                {/* Linke Spalte: Icon + Titel */}
                <div className="flex items-start gap-4 md:flex-1">
                  <div className="mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gray-50 ring-1 ring-gray-200">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">
                        {activity.title}
                      </span>
                    </div>
                    {activity.description && (
                      <p className="mt-1 text-sm text-gray-600 line-clamp-1">
                        {activity.description}
                      </p>
                    )}
                    <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                      <span>Von: {activity.actor}</span>
                    </div>
                  </div>
                </div>

                {/* Mittlere Spalte: Bezug */}
                <div className="flex flex-col gap-1 text-sm text-gray-700 md:w-1/3">
                  <div className="flex items-center text-gray-500">
                    Bezug:
                  </div>
                  <div className="flex items-center font-medium">
                    {getRelationIcon(activity.relatedToType)}
                    {activity.relatedToName}
                  </div>
                </div>

                {/* Rechte Spalte: Datum + Badge */}
                <div className="flex flex-row items-center justify-between gap-4 md:w-auto md:flex-col md:items-end md:justify-center">
                  <div className="text-right text-sm text-gray-500">
                    <div>
                      {new Date(activity.createdAt).toLocaleDateString("de-DE")}
                    </div>
                    <div className="text-xs">
                      {new Date(activity.createdAt).toLocaleTimeString("de-DE", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${getTypeBadgeClass(
                      activity.type
                    )}`}
                  >
                    {getTypeLabel(activity.type)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500 rounded-xl border border-gray-200 bg-white">
              <FileText className="h-8 w-8 text-gray-300 mb-2" />
              <p>Keine Aktivitäten gefunden.</p>
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}
