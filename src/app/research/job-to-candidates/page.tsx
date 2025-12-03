"use client";

import React, { useState } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import { CheckCircle, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function JobToCandidatesPage() {
  const [step, setStep] = useState(1);

  return (
    <SidebarLayout>
      <div className="mx-auto max-w-4xl">
        {/* Header / Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/research"
            className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zur Übersicht
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Job → Kandidaten Matching
          </h1>
        </div>

        {/* Stepper */}
        <div className="mb-10 overflow-x-auto pb-4">
          <div className="relative flex min-w-[320px] items-center justify-between px-2">
            <div className="absolute left-0 top-1/2 -z-10 h-0.5 w-full -translate-y-1/2 bg-gray-200" />

            {/* Step 1 */}
            <div className="flex flex-col items-center gap-2 bg-gray-50 px-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                  step >= 1
                    ? "border-purple-600 bg-purple-600 text-white"
                    : "border-gray-300 bg-white text-gray-500"
                }`}
              >
                1
              </div>
              <span
                className={`text-xs font-medium ${
                  step >= 1 ? "text-purple-600" : "text-gray-500"
                }`}
              >
                Eingabe
              </span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-2 bg-gray-50 px-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                  step >= 2
                    ? "border-purple-600 bg-purple-600 text-white"
                    : "border-gray-300 bg-white text-gray-500"
                }`}
              >
                2
              </div>
              <span
                className={`text-xs font-medium ${
                  step >= 2 ? "text-purple-600" : "text-gray-500"
                }`}
              >
                Ergebnisse
              </span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-2 bg-gray-50 px-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                  step >= 3
                    ? "border-purple-600 bg-purple-600 text-white"
                    : "border-gray-300 bg-white text-gray-500"
                }`}
              >
                3
              </div>
              <span
                className={`text-xs font-medium ${
                  step >= 3 ? "text-purple-600" : "text-gray-500"
                }`}
              >
                Details
              </span>
            </div>
          </div>
        </div>

        {/* Content based on step */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          {step === 1 && (
            <div className="space-y-8">
              <div className="grid gap-8 md:grid-cols-2">
                {/* Job Description Input */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Stellenanzeige hinzufügen
                  </h3>
                  <div className="flex flex-1 flex-col">
                    <textarea
                      className="block h-64 w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                      placeholder="Füge hier die Stellenanzeige ein..."
                    />
                    <p className="mt-2 text-xs text-gray-500">
                      Später: Upload als PDF oder URL
                    </p>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Filter
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Erfahrung
                      </label>
                      <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6">
                        <option>Junior (0-2 Jahre)</option>
                        <option>Mid-Level (3-5 Jahre)</option>
                        <option>Senior (5+ Jahre)</option>
                        <option>Lead / Manager</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Pflicht-Skills (kommagetrennt)
                      </label>
                      <input
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                        placeholder="z. B. React, TypeScript"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Optionale Skills
                      </label>
                      <input
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                        placeholder="z. B. Tailwind, AWS"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end border-t border-gray-100 pt-6">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 rounded-md bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Matching starten
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Kandidaten gefunden!
                </h3>
                <p className="mt-2 text-gray-500">
                  Hier werden später die besten Kandidaten für diese Stelle
                  angezeigt.
                </p>
              </div>

              {/* Placeholder Candidate List */}
              <div className="space-y-3">
                {[
                  { name: "Max Mustermann", score: 95 },
                  { name: "Julia Sommer", score: 88 },
                  { name: "Tim Tester", score: 82 },
                ].map((candidate, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-4"
                  >
                    <div>
                      <div className="font-semibold text-gray-900">
                        {candidate.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        Match-Score: {candidate.score}
                      </div>
                    </div>
                    <div className="h-8 w-24 rounded bg-gray-200"></div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center justify-center sm:justify-start"
                >
                  Zurück zur Eingabe
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Details & Aktionen
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 py-8 text-center">
              <h3 className="text-xl font-bold text-gray-900">
                Kontakt & Verwaltung
              </h3>
              <p className="mx-auto max-w-lg text-gray-500">
                Hier kannst du später Shortlists erstellen, Kandidaten direkt
                kontaktieren und den Prozess verwalten.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  Shortlist erstellen (später)
                </button>
                <button className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  Kontakt vorbereiten (später)
                </button>
              </div>

              <div className="mt-8 border-t border-gray-100 pt-6 text-left">
                <button
                  onClick={() => setStep(2)}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Zurück zu Ergebnissen
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}


