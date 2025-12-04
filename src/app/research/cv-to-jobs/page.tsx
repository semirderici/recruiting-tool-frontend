"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SidebarLayout } from "@/components/SidebarLayout";
import { crmCandidates } from "@/data/crmCandidates";
import { crmJobs } from "@/data/crmJobs";
import { computeCandidateJobMatchScore } from "@/utils/matching";
import { ChevronLeft, Search, RefreshCw, Building2, MapPin } from "lucide-react";
import { CrmJob } from "@/types/crm";

interface MatchResult {
  job: CrmJob;
  score: number;
  sharedKeywords: string[];
  locationMatch: boolean;
}

export default function CvToJobsPage() {
  const searchParams = useSearchParams();
  const initialCandidateId = searchParams?.get("candidateId") || "";

  const [activeStep, setActiveStep] = useState<1 | 2>(1);
  const [selectedCandidateId, setSelectedCandidateId] = useState(initialCandidateId);
  const [cvText, setCvText] = useState("");
  const [results, setResults] = useState<MatchResult[]>([]);

  // Effect to pre-fill text if candidate is selected via URL or Select
  useEffect(() => {
    if (selectedCandidateId) {
      const candidate = crmCandidates.find((c) => c.id === selectedCandidateId);
      if (candidate) {
        // Dummy CV text generation
        const text = `
Profil: ${candidate.name}
Rolle: ${candidate.role}
Standort: ${candidate.location || "Nicht angegeben"}
Skills: ${(candidate.tags || []).join(", ")}
        `.trim();
        setCvText(text);
      }
    } else {
      setCvText("");
    }
  }, [selectedCandidateId]);

  const handleSearch = () => {
    const candidate = crmCandidates.find((c) => c.id === selectedCandidateId);

    const matches = crmJobs.map((job) => {
      // If we have a real candidate, use their structured data.
      // If we only have text, we try to extract keywords roughly (very basic demo).
      let matchInput = {
        location: candidate?.location || "",
        tags: candidate?.tags || [],
        skills: [] as string[],
      };

      if (!candidate && cvText) {
        // Simple heuristic: treat words in text as tags
        const words = cvText
          .split(/[\s,.\n]+/)
          .filter((w) => w.length > 2)
          .slice(0, 20); // Limit to top 20 words for demo
        matchInput = {
          location: "", // Hard to extract from raw text reliably in demo
          tags: words,
          skills: [],
        };
      }

      const { score, sharedKeywords, locationMatch } =
        computeCandidateJobMatchScore(matchInput, {
          location: job.location,
          tags: job.tags,
        });

      return {
        job,
        score,
        sharedKeywords,
        locationMatch,
      };
    });

    // Sort by score descending
    const sorted = matches.sort((a, b) => b.score - a.score);
    setResults(sorted);
    setActiveStep(2);
  };

  const handleReset = () => {
    setActiveStep(1);
    setResults([]);
    // Optional: Keep selection or clear it? Let's keep it for better UX.
  };

  return (
    <SidebarLayout>
      <div className="mx-auto max-w-7xl">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Zurück zur Übersicht</span>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">CV → Jobs</h1>
          <p className="mt-1 text-sm text-gray-500">
            Finde passende Stellen für ein Profil oder CV.
          </p>
        </div>

        {/* Stepper Indicator (Visual) */}
        <div className="mb-8 flex items-center gap-4 text-sm font-medium">
          <div className={`flex items-center gap-2 ${activeStep === 1 ? "text-blue-600" : "text-gray-500"}`}>
            <span className={`flex h-6 w-6 items-center justify-center rounded-full border ${activeStep === 1 ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}>1</span>
            Eingabe
          </div>
          <div className="h-px w-8 bg-gray-300" />
          <div className={`flex items-center gap-2 ${activeStep === 2 ? "text-blue-600" : "text-gray-500"}`}>
            <span className={`flex h-6 w-6 items-center justify-center rounded-full border ${activeStep === 2 ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}>2</span>
            Trefferliste
          </div>
        </div>

        {activeStep === 1 && (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Kandidat auswählen</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Bestehendes Profil (optional)
                  </label>
                  <select
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    value={selectedCandidateId}
                    onChange={(e) => setSelectedCandidateId(e.target.value)}
                  >
                    <option value="">-- Kein Kandidat (nur Text) --</option>
                    {crmCandidates.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.role})
                      </option>
                    ))}
                  </select>
                </div>
                
                {selectedCandidateId && (
                  <div className="rounded-md bg-blue-50 p-4 text-sm text-blue-800">
                    <p className="font-medium">Profil geladen:</p>
                    <ul className="mt-1 list-inside list-disc">
                      <li>Name: {crmCandidates.find(c => c.id === selectedCandidateId)?.name}</li>
                      <li>Rolle: {crmCandidates.find(c => c.id === selectedCandidateId)?.role}</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">CV / Profiltext</h2>
              <textarea
                className="flex-1 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                rows={10}
                placeholder="Füge hier den CV-Text ein oder wähle links einen Kandidaten..."
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
              />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSearch}
                  className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Search className="h-4 w-4" />
                  Passende Jobs suchen
                </button>
              </div>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {results.length} Treffer gefunden
              </h2>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <RefreshCw className="h-4 w-4" />
                Neue Suche
              </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">Job</th>
                    <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">Firma</th>
                    <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">Score</th>
                    <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">Matches</th>
                    <th className="px-6 py-3 text-right font-medium uppercase tracking-wider">Aktion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {results.map(({ job, score, sharedKeywords, locationMatch }) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">{job.title}</span>
                          <span className="text-xs text-gray-500">{job.employmentType}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-3.5 w-3.5 text-gray-400" />
                          {job.companyName}
                        </div>
                        <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="h-3.5 w-3.5 text-gray-400" />
                          {job.location}
                          {locationMatch && (
                            <span className="ml-1 text-green-600 font-medium">(Match)</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                          score >= 80 ? "bg-green-100 text-green-800" :
                          score >= 50 ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {score}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {sharedKeywords.length > 0 ? sharedKeywords.slice(0, 3).map(kw => (
                            <span key={kw} className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700 ring-1 ring-inset ring-blue-600/10">
                              {kw}
                            </span>
                          )) : (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                          {sharedKeywords.length > 3 && (
                            <span className="text-xs text-gray-500">+{sharedKeywords.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/jobs/${job.id}`}
                          className="font-medium text-blue-600 hover:text-blue-800"
                        >
                          Job öffnen
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}
