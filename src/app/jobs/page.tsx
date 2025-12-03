"use client";

import React, { useState } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import { JobCard } from "@/components/JobCard";
import { dummyJobs } from "@/data/jobs";
import { Search, Plus } from "lucide-react";

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Alle Status");
  const [locationFilter, setLocationFilter] = useState("Alle Standorte");
  const [sourceFilter, setSourceFilter] = useState("Alle Quellen");

  // Filtering logic
  const filteredJobs = dummyJobs.filter((job) => {
    // Search (title, company, location)
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      job.title.toLowerCase().includes(searchLower) ||
      job.company.toLowerCase().includes(searchLower) ||
      job.location.toLowerCase().includes(searchLower);

    // Status
    const matchesStatus =
      statusFilter === "Alle Status" || job.status === statusFilter;

    // Location
    const matchesLocation =
      locationFilter === "Alle Standorte" ||
      job.location.includes(locationFilter);

    // Source
    const matchesSource =
      sourceFilter === "Alle Quellen" || job.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesLocation && matchesSource;
  });

  return (
    <SidebarLayout>
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Jobs & Firmen</h1>
            <p className="mt-1 text-sm text-gray-500">
              Verwalte und filtere alle Jobprofile und Firmen
            </p>
          </div>
          <button className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Plus className="h-4 w-4" />
            Job hinzufügen
          </button>
        </div>

        {/* Filters */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Search */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="Titel, Firma, Ort..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Selects */}
            <select
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option>Alle Standorte</option>
              <option>Berlin, DE</option>
              <option>München, DE</option>
              <option>Hamburg, DE</option>
              <option>Frankfurt, DE</option>
              <option>Köln, DE</option>
              <option>Stuttgart, DE</option>
              <option>Remote</option>
            </select>

            <select
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>Alle Status</option>
              <option>Offen</option>
              <option>In Bearbeitung</option>
              <option>Besetzt</option>
              <option>On Hold</option>
            </select>

            <select
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
            >
              <option>Alle Quellen</option>
              <option>Intern</option>
              <option>Extern</option>
              <option>CRM</option>
              <option>Import</option>
            </select>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("Alle Status");
                setLocationFilter("Alle Standorte");
                setSourceFilter("Alle Quellen");
              }}
              className="text-xs font-medium text-gray-500 hover:text-gray-700"
            >
              Filter zurücksetzen
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}

          {filteredJobs.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              Keine Jobs gefunden.
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}


