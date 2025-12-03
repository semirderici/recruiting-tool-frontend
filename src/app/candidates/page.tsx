"use client";

import React, { useState } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import { CandidateCard } from "@/components/CandidateCard";
import { dummyCandidates } from "@/data/candidates";
import { Search, Plus } from "lucide-react";

export default function CandidatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Alle Status");
  const [locationFilter, setLocationFilter] = useState("Alle Standorte");
  const [scoreFilter, setScoreFilter] = useState("Alle Scores");
  const [sourceFilter, setSourceFilter] = useState("Alle Quellen");

  // Simple filtering logic
  const filteredCandidates = dummyCandidates.filter((candidate) => {
    // Search
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchLower) ||
      candidate.role.toLowerCase().includes(searchLower) ||
      candidate.location.toLowerCase().includes(searchLower);

    // Status
    const matchesStatus =
      statusFilter === "Alle Status" || candidate.status === statusFilter;

    // Location (exact match for simplicity, or just inclusion)
    const matchesLocation =
      locationFilter === "Alle Standorte" ||
      candidate.location.includes(locationFilter);
    
    // Score
    let matchesScore = true;
    if (scoreFilter !== "Alle Scores") {
      const score = candidate.bestMatchScore || 0;
      if (scoreFilter === "0–49") matchesScore = score < 50;
      if (scoreFilter === "50–69") matchesScore = score >= 50 && score < 70;
      if (scoreFilter === "70–84") matchesScore = score >= 70 && score < 85;
      if (scoreFilter === "85–100") matchesScore = score >= 85;
    }

    // Source (dummy implementation since source is not in interface yet)
    // Assuming all manual for MVP or ignoring
    const matchesSource = true; 

    return matchesSearch && matchesStatus && matchesLocation && matchesScore && matchesSource;
  });

  return (
    <SidebarLayout>
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kandidaten</h1>
            <p className="mt-1 text-sm text-gray-500">
              Verwalte und filtere alle Kandidatenprofile
            </p>
          </div>
          <button className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Plus className="h-4 w-4" />
            Kandidat hinzufügen
          </button>
        </div>

        {/* Filters */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {/* Search */}
            <div className="relative col-span-1 md:col-span-2 lg:col-span-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="Name, Rolle..."
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
              <option>Berlin</option>
              <option>München</option>
              <option>Hamburg</option>
              <option>Frankfurt</option>
              <option>Remote</option>
            </select>

            <select
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>Alle Status</option>
              <option>Neu</option>
              <option>In Kontakt</option>
              <option>Vorgeschlagen</option>
              <option>Platziert</option>
              <option>Archiviert</option>
            </select>

            <select
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              value={scoreFilter}
              onChange={(e) => setScoreFilter(e.target.value)}
            >
              <option>Alle Scores</option>
              <option>0–49</option>
              <option>50–69</option>
              <option>70–84</option>
              <option>85–100</option>
            </select>

            <select
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
            >
              <option>Alle Quellen</option>
              <option>Manuell</option>
              <option>Import</option>
              <option>API</option>
            </select>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button 
                onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("Alle Status");
                    setLocationFilter("Alle Standorte");
                    setScoreFilter("Alle Scores");
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
          {filteredCandidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
          
          {filteredCandidates.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              Keine Kandidaten gefunden.
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}


