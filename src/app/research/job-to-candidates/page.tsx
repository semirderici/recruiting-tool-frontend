"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SidebarLayout } from "@/components/SidebarLayout";
import { crmJobs } from "@/data/crmJobs";
import { crmCandidates } from "@/data/crmCandidates";
import { computeCandidateJobMatchScore } from "@/utils/matching";
import { ChevronLeft, Search, RefreshCw, MapPin, User } from "lucide-react";
import { CrmCandidate } from "@/types/crm";

interface CandidateMatchResult {
  candidate: CrmCandidate;
  score: number;
  sharedKeywords: string[];
  locationMatch: boolean;
}

export default function JobToCandidatesPage() {
  const searchParams = useSearchParams();
  const initialJobId = searchParams?.get("jobId") || "";

  const [activeStep, setActiveStep] = useState<1 | 2>(1);
  const [selectedJobId, setSelectedJobId] = useState(initialJobId);
  const [jobText, setJobText] = useState("");
  const [results, setResults] = useState<CandidateMatchResult[]>([]);

  // Effect to pre-fill text if job is selected
  useEffect(() => {
    if (selectedJobId) {
      const job = crmJobs.find((j) => j.id === selectedJobId);
      if (job) {
        // Dummy Job text
        const text = `
Titel: ${job.title}
Firma: ${job.companyName}
Standort: ${job.location}
Tags: ${(job.tags || []).join(", ")}
        `.trim();
        setJobText(text);
      }
    } else {
      setJobText("");
    }
  }, [selectedJobId]);

  const handleSearch = () => {
    const job = crmJobs.find((j) => j.id === selectedJobId);

    const matches = crmCandidates.map((candidate) => {
      // If we have a real job, use its data. Otherwise try to construct from text.
      let matchInput = {
        location: job?.location || "",
        tags: job?.tags || [],
        skills: [] as string[],
      };

      if (!job && jobText) {
        const words = jobText
          .split(/[\s,.\n]+/)
          .filter((w) => w.length > 2)
          .slice(0, 20);
        matchInput = {
          location: "",
          tags: words,
          skills: [],
        };
      }

      const { score, sharedKeywords, locationMatch } =
        computeCandidateJobMatchScore(
          {
            location: candidate.location,
            tags: candidate.tags,
          },
          matchInput
        );

      return {
        candidate,
        score,
        sharedKeywords,
        locationMatch,
      };
    });

    const sorted = matches.sort((a, b) => b.score - a.score);
    setResults(sorted);
    setActiveStep(2);
  };

  const handleReset = () => {
    setActiveStep(1);
    setResults([]);
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
          <h1 className="text-2xl font-bold text-gray-900">Job → Kandidaten</h1>
          <p className="mt-1 text-sm text-gray-500">
            Finde passende Kandidaten für ein Jobprofil.
          </p>
        </div>

        {/* Stepper Indicator */}
        <div className="mb-8 flex items-center gap-4 text-sm font-medium">
          <div className={`flex items-center gap-2 ${activeStep === 1 ? "text-purple-600" : "text-gray-500"}`}>
            <span className={`flex h-6 w-6 items-center justify-center rounded-full border ${activeStep === 1 ? "border-purple-600 bg-purple-50" : "border-gray-300"}`}>1</span>
            Eingabe
          </div>
          <div className="h-px w-8 bg-gray-300" />
          <div className={`flex items-center gap-2 ${activeStep === 2 ? "text-purple-600" : "text-gray-500"}`}>
            <span className={`flex h-6 w-6 items-center justify-center rounded-full border ${activeStep === 2 ? "border-purple-600 bg-purple-50" : "border-gray-300"}`}>2</span>
            Trefferliste
          </div>
        </div>

        {activeStep === 1 && (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Job auswählen</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Bestehender Job (optional)
                  </label>
                  <select
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    value={selectedJobId}
                    onChange={(e) => setSelectedJobId(e.target.value)}
                  >
                    <option value="">-- Kein Job (nur Text) --</option>
                    {crmJobs.map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.title} ({j.companyName})
                      </option>
                    ))}
                  </select>
                </div>
                
                {selectedJobId && (
                  <div className="rounded-md bg-purple-50 p-4 text-sm text-purple-800">
                    <p className="font-medium">Job geladen:</p>
                    <ul className="mt-1 list-inside list-disc">
                      <li>Titel: {crmJobs.find(j => j.id === selectedJobId)?.title}</li>
                      <li>Firma: {crmJobs.find(j => j.id === selectedJobId)?.companyName}</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Jobtext / Anforderungen</h2>
              <textarea
                className="flex-1 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                rows={10}
                placeholder="Füge hier die Stellenbeschreibung ein oder wähle links einen Job..."
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
              />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSearch}
                  className="inline-flex items-center gap-2 rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  <Search className="h-4 w-4" />
                  Passende Kandidaten suchen
                </button>
              </div>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {results.length} Kandidaten gefunden
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
                    <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">Rolle</th>
                    <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">Score</th>
                    <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">Matches</th>
                    <th className="px-6 py-3 text-right font-medium uppercase tracking-wider">Aktion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {results.map(({ candidate, score, sharedKeywords, locationMatch }) => (
                    <tr key={candidate.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                            <User className="h-4 w-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900">{candidate.name}</span>
                            <span className="text-xs text-gray-500">{candidate.status}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        <div className="font-medium">{candidate.role}</div>
                        <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="h-3.5 w-3.5 text-gray-400" />
                          {candidate.location}
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
                            <span key={kw} className="inline-flex items-center rounded-full bg-purple-50 px-2 py-0.5 text-xs text-purple-700 ring-1 ring-inset ring-purple-600/10">
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
                          href={`/candidates/${candidate.id}`}
                          className="font-medium text-purple-600 hover:text-purple-800"
                        >
                          Kandidat öffnen
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
