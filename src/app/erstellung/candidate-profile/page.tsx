"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SidebarLayout } from "@/components/SidebarLayout";
import { ChevronLeft, Info } from "lucide-react";

interface CandidateProfileFormValues {
  briefing: string;
  role: string;
  seniority: "Junior" | "Professional" | "Senior" | "Lead";
  location: string;
  industry: string;
  skills: string;
}

export default function CandidateProfilePage() {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<CandidateProfileFormValues>({
    briefing: "",
    role: "",
    seniority: "Senior",
    location: "",
    industry: "",
    skills: "",
  });
  const [generatedDraft, setGeneratedDraft] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateDraft = () => {
    // Simple dummy generation logic
    const draft = `
Kandidatenprofil: ${formData.seniority} ${formData.role || "Developer"}

Zusammenfassung:
Ein erfahrener ${formData.role || "Experte"} mit Fokus auf ${
      formData.industry || "moderne Technologien"
    }. ${formData.location ? `Ansässig in ${formData.location}.` : ""}

Top-Skills:
${
  formData.skills
    ? formData.skills
        .split(",")
        .map((s) => `- ${s.trim()}`)
        .join("\n")
    : "- Keine spezifischen Skills angegeben"
}

Erfahrung & Stärken:
${
  formData.briefing
    ? `- ${formData.briefing}`
    : "- Langjährige Erfahrung in relevanten Projekten\n- Starke Problemlösungskompetenz\n- Teamplayer mit Drive"
}

Verfügbarkeit:
- Nach Absprache
    `.trim();

    setGeneratedDraft(draft);
    setActiveStep(2);
  };

  const finalizeDraft = () => {
    // Demo action
    alert("Kandidatenprofil wurde in dieser Demo noch nicht gespeichert.");
  };

  return (
    <SidebarLayout>
      <div className="mx-auto max-w-5xl">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/erstellung"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Zurück zur Übersicht</span>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Kandidatenprofil erstellen
          </h1>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                  activeStep >= 1
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                1
              </div>
              <div
                className={`ml-2 text-sm font-medium ${
                  activeStep >= 1 ? "text-purple-600" : "text-gray-500"
                }`}
              >
                Eingabe
              </div>
              <div className="mx-4 h-0.5 flex-1 bg-gray-200" />
            </div>
            <div className="flex flex-1 items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                  activeStep >= 2
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                2
              </div>
              <div
                className={`ml-2 text-sm font-medium ${
                  activeStep >= 2 ? "text-purple-600" : "text-gray-500"
                }`}
              >
                Profil-Entwurf
              </div>
              <div className="mx-4 h-0.5 flex-1 bg-gray-200" />
            </div>
            <div className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                  activeStep >= 3
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                3
              </div>
              <div
                className={`ml-2 text-sm font-medium ${
                  activeStep >= 3 ? "text-purple-600" : "text-gray-500"
                }`}
              >
                Feinschliff
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          {activeStep === 1 && (
            <div className="grid gap-8 md:grid-cols-2">
              {/* Left Column */}
              <div>
                <h3 className="mb-4 text-sm font-semibold text-gray-900">
                  CV-Infos / Stichpunkte
                </h3>
                <textarea
                  name="briefing"
                  value={formData.briefing}
                  onChange={handleInputChange}
                  rows={12}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  placeholder="Kurzbeschreibung zum Kandidaten, berufliche Stationen, Erfolge, Soft Skills..."
                />
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <h3 className="mb-4 text-sm font-semibold text-gray-900">
                  Details
                </h3>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Rolle
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    placeholder="z. B. Senior Backend Developer"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Seniorität
                  </label>
                  <select
                    name="seniority"
                    value={formData.seniority}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  >
                    <option value="Junior">Junior</option>
                    <option value="Professional">Professional</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Standort / Remote
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Branche / Umfeld
                  </label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Top-Skills (Komma-separiert)
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    placeholder="Java, Spring Boot, AWS..."
                  />
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={generateDraft}
                    className="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    Profil-Entwurf generieren &rarr;
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Profil-Entwurf
              </h3>
              <div className="mb-6 rounded-md bg-gray-50 p-6">
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">
                  {generatedDraft}
                </pre>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setActiveStep(1)}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Zurück zur Eingabe
                </button>
                <button
                  onClick={() => setActiveStep(3)}
                  className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  In Feinschliff übernehmen &rarr;
                </button>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Feinschliff
              </h3>
              <textarea
                value={generatedDraft}
                onChange={(e) => setGeneratedDraft(e.target.value)}
                rows={15}
                className="mb-6 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
              />
              <div className="mb-6 flex items-start gap-3 rounded-md bg-blue-50 p-4">
                <Info className="h-5 w-5 text-blue-400" />
                <p className="text-sm text-blue-700">
                  Hinweis: In einer späteren Version kannst du dieses Profil direkt
                  an Kunden versenden oder als PDF exportieren.
                </p>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setActiveStep(2)}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Zurück zum Entwurf
                </button>
                <button
                  onClick={finalizeDraft}
                  className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Fertigstellen (Demo)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}
