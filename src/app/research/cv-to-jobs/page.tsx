"use client";

import React, { useState } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import { UploadCloud, CheckCircle, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CvToJobsPage() {
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
          <h1 className="text-2xl font-bold text-gray-900">CV → Jobs Matching</h1>
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
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 bg-white text-gray-500"
                }`}
              >
                1
              </div>
              <span
                className={`text-xs font-medium ${
                  step >= 1 ? "text-blue-600" : "text-gray-500"
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
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 bg-white text-gray-500"
                }`}
              >
                2
              </div>
              <span
                className={`text-xs font-medium ${
                  step >= 2 ? "text-blue-600" : "text-gray-500"
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
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 bg-white text-gray-500"
                }`}
              >
                3
              </div>
              <span
                className={`text-xs font-medium ${
                  step >= 3 ? "text-blue-600" : "text-gray-500"
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
                {/* Upload Area */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Lebenslauf hochladen
                  </h3>
                  <div className="flex flex-1 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 transition-colors hover:bg-gray-100">
                    <UploadCloud className="mb-4 h-12 w-12 text-gray-400" />
                    <button className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      Datei auswählen
                    </button>
                    <p className="mt-2 text-xs text-gray-500">
                      PDF, DOCX, max. 10 MB
                    </p>
                    <p className="mt-1 text-[10px] text-gray-400">
                      (Dummy-Upload ohne Funktion)
                    </p>
                  </div>
                </div>

                {/* Filters / Preferences */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Wünsche & Filter
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Zielposition / Jobtitel
                      </label>
                      <input
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        placeholder="z. B. Frontend Developer"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Bevorzugte Standorte
                      </label>
                      <input
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        placeholder="z. B. Berlin, München"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Remote möglich?
                      </label>
                      <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                        <option>Egal</option>
                        <option>Ja, 100% Remote</option>
                        <option>Hybrid</option>
                        <option>Nein, On-site</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Min. Gehalt
                        </label>
                        <input
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                          placeholder="€"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Max. Gehalt
                        </label>
                        <input
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                          placeholder="€"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end border-t border-gray-100 pt-6">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Matching abgeschlossen!
                </h3>
                <p className="mt-2 text-gray-500">
                  Hier werden später die passenden Job-Angebote angezeigt.
                </p>
              </div>

              {/* Placeholder Results List */}
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-4"
                  >
                    <div>
                      <div className="h-4 w-48 rounded bg-gray-200"></div>
                      <div className="mt-2 h-3 w-32 rounded bg-gray-200"></div>
                    </div>
                    <div className="h-8 w-20 rounded bg-gray-200"></div>
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
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                Aktionen & Nächste Schritte
              </h3>
              <p className="mx-auto max-w-lg text-gray-500">
                Hier kannst du später Shortlists erstellen, Exporte starten und
                Notizen erfassen. Aktuell ist dies nur ein Platzhalter für den
                dritten Schritt im Flow.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  Shortlist speichern (später)
                </button>
                <button className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  Export vorbereiten (später)
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


