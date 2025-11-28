"use client";

import React, { useState } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import { ArrowLeft, ChevronRight, User, CheckCircle, Download, Database } from "lucide-react";
import Link from "next/link";

export default function CandidateProfileCreationPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    cvText: "",
    targetRole: "",
    level: "Mid-Level",
    focus: "",
    profileType: "Kurzprofil",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <SidebarLayout>
      <div className="mx-auto max-w-5xl">
        {/* Header / Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/erstellung"
            className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zur Übersicht
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Kandidatenprofil erstellen
          </h1>
        </div>

        {/* Stepper */}
        <div className="mb-10">
          <div className="relative flex items-center justify-between">
            <div className="absolute left-0 top-1/2 -z-10 h-0.5 w-full -translate-y-1/2 bg-gray-200" />

            {/* Step 1 */}
            <div className="flex flex-col items-center gap-2 bg-gray-50 px-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                  step >= 1
                    ? "border-teal-600 bg-teal-600 text-white"
                    : "border-gray-300 bg-white text-gray-500"
                }`}
              >
                1
              </div>
              <span
                className={`text-xs font-medium ${
                  step >= 1 ? "text-teal-600" : "text-gray-500"
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
                    ? "border-teal-600 bg-teal-600 text-white"
                    : "border-gray-300 bg-white text-gray-500"
                }`}
              >
                2
              </div>
              <span
                className={`text-xs font-medium ${
                  step >= 2 ? "text-teal-600" : "text-gray-500"
                }`}
              >
                Entwurf
              </span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-2 bg-gray-50 px-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                  step >= 3
                    ? "border-teal-600 bg-teal-600 text-white"
                    : "border-gray-300 bg-white text-gray-500"
                }`}
              >
                3
              </div>
              <span
                className={`text-xs font-medium ${
                  step >= 3 ? "text-teal-600" : "text-gray-500"
                }`}
              >
                Struktur
              </span>
            </div>
          </div>
        </div>

        {/* Content based on step */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          {step === 1 && (
            <div className="space-y-8">
              <div className="grid gap-8 md:grid-cols-2">
                {/* Left Column: CV Text */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Lebenslauf / Freitext
                  </h3>
                  <textarea
                    name="cvText"
                    value={formData.cvText}
                    onChange={handleInputChange}
                    className="block min-h-[300px] w-full flex-1 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                    placeholder="Füge hier den CV-Text oder Notizen ein..."
                  />
                </div>

                {/* Right Column: Form Fields */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Zielprofil-Daten
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Gewünschte Zielrolle
                      </label>
                      <input
                        type="text"
                        name="targetRole"
                        value={formData.targetRole}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                        placeholder="z. B. Product Owner"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Level
                      </label>
                      <select
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                      >
                        <option>Junior</option>
                        <option>Mid-Level</option>
                        <option>Senior</option>
                        <option>Lead / C-Level</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Schwerpunkte
                      </label>
                      <input
                        type="text"
                        name="focus"
                        value={formData.focus}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                        placeholder="z. B. E-Commerce, Mobile Apps"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Profil-Typ
                      </label>
                      <select
                        name="profileType"
                        value={formData.profileType}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                      >
                        <option>Kurzprofil</option>
                        <option>Detailprofil</option>
                        <option>Anonymisiertes Profil</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-4 rounded-lg bg-teal-50 p-4 text-sm text-teal-800">
                    <p className="font-medium">Hinweis:</p>
                    <p className="mt-1">
                      Die KI extrahiert automatisch Skills, Stationen und Ausbildung aus dem Text.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end border-t border-gray-100 pt-6">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 rounded-md bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Profil-Entwurf erzeugen
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
                <div className="flex items-start justify-between border-b border-gray-100 pb-6">
                  <div className="flex gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl font-bold text-gray-500">
                      XX
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Max Mustermann (Generiert)
                      </h2>
                      <p className="text-gray-500">
                        {formData.targetRole || "Zielrolle"} • {formData.level}
                      </p>
                      <div className="mt-2 flex gap-2">
                        <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                          Verfügbar ab sofort
                        </span>
                        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                          Remote
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-8 md:grid-cols-3">
                  <div className="col-span-2 space-y-6">
                    <div>
                      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                        Kurzbeschreibung
                      </h3>
                      <p className="text-gray-700">
                        Erfahrener {formData.targetRole} mit Fokus auf{" "}
                        {formData.focus || "diverse Bereiche"}. Hat in den letzten Jahren
                        erfolgreich Projekte geleitet und Teams aufgebaut. 
                        (Hier steht der generierte Zusammenfassungstext...)
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                        Berufserfahrung (Auszug)
                      </h3>
                      <ul className="space-y-4 border-l-2 border-gray-100 pl-4">
                        <li className="relative">
                          <div className="absolute -left-[21px] top-1.5 h-3 w-3 rounded-full bg-gray-300" />
                          <p className="font-semibold text-gray-900">Senior Developer @ TechCorp</p>
                          <p className="text-sm text-gray-500">2020 – Heute</p>
                          <p className="mt-1 text-sm text-gray-600">Verantwortlich für Frontend-Architektur...</p>
                        </li>
                        <li className="relative">
                          <div className="absolute -left-[21px] top-1.5 h-3 w-3 rounded-full bg-gray-300" />
                          <p className="font-semibold text-gray-900">Developer @ StartUp Inc.</p>
                          <p className="text-sm text-gray-500">2018 – 2020</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="col-span-1 space-y-6">
                    <div>
                      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                        Kernkompetenzen
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {["React", "TypeScript", "Node.js", "Team Leadership"].map(skill => (
                           <span key={skill} className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                             {skill}
                           </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                        Sprachen
                      </h3>
                      <ul className="text-sm text-gray-700">
                        <li>Deutsch (Muttersprache)</li>
                        <li>Englisch (Verhandlungssicher)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between border-t border-gray-100 pt-6">
                <button
                  onClick={() => setStep(1)}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Zurück zur Eingabe
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 rounded-md bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Weiter zur Strukturansicht
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Data Structure Table */}
                <div className="col-span-2 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                  <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                    <h3 className="text-base font-semibold text-gray-900">
                      Extrahierte Daten (Strukturiert)
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {[
                      { label: "Name", value: "Max Mustermann" },
                      { label: "Rolle", value: formData.targetRole },
                      { label: "Level", value: formData.level },
                      { label: "Skills", value: "React, TS, Node, Leadership" },
                      { label: "Erfahrung (Jahre)", value: "5+" },
                      { label: "Standort", value: "Berlin (vermutet)" },
                      { label: "Verfügbarkeit", value: "Sofort" },
                    ].map((row, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-3 gap-4 px-6 py-4 text-sm hover:bg-gray-50"
                      >
                        <div className="font-medium text-gray-500">
                          {row.label}
                        </div>
                        <div className="col-span-2 text-gray-900">
                          {row.value || "-"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="col-span-1 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Aktionen
                  </h3>
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                    <Download className="h-4 w-4" />
                    Als CV-Template exportieren
                  </button>
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                    <Database className="h-4 w-4" />
                    In Matching übernehmen
                  </button>
                  <div className="mt-8 border-t border-gray-100 pt-6">
                     <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-700">
                       <CheckCircle className="h-4 w-4" />
                       Profil speichern
                     </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between border-t border-gray-100 pt-6">
                <button
                  onClick={() => setStep(2)}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Zurück zum Entwurf
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}


