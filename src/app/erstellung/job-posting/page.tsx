"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SidebarLayout } from "@/components/SidebarLayout";
import { ChevronLeft, Info } from "lucide-react";

interface JobDraftFormValues {
  briefing: string;
  jobTitle: string;
  company: string;
  location: string;
  tonality: "Neutral" | "Locker" | "Förmlich";
  isAnonymous: boolean;
}

export default function JobPostingPage() {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<JobDraftFormValues>({
    briefing: "",
    jobTitle: "",
    company: "",
    location: "",
    tonality: "Neutral",
    isAnonymous: false,
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const generateDraft = () => {
    // Simple dummy generation logic
    const draft = `
Stellenanzeige: ${formData.jobTitle || "Jobtitel"}
Standort: ${formData.location || "Standort"}
${formData.isAnonymous ? "(Anonyme Anzeige)" : `Arbeitgeber: ${formData.company}`}

Wir suchen dich!

Über uns:
${
  formData.company
    ? `Willkommen bei ${formData.company}. Wir sind ein führendes Unternehmen in unserer Branche.`
    : "Ein innovatives Unternehmen sucht Verstärkung."
}

Deine Aufgaben:
${
  formData.briefing
    ? `- Basierend auf deinem Briefing: ${formData.briefing}`
    : "- Spannende Projekte umsetzen\n- Verantwortung übernehmen\n- Im Team wachsen"
}

Das bringst du mit:
- Fundierte Erfahrung im Bereich ${formData.jobTitle || "der ausgeschriebenen Stelle"}
- Teamgeist und Kommunikationsstärke
- Sehr gute Deutsch- und Englischkenntnisse

Das bieten wir:
- Attraktives Gehalt
- Flexible Arbeitszeiten
- Modernes Equipment

Klingt gut? Dann bewirb dich jetzt!
    `.trim();

    setGeneratedDraft(draft);
    setActiveStep(2);
  };

  const finalizeDraft = () => {
    // Demo action
    alert("Jobanzeige wurde in dieser Demo noch nicht gespeichert.");
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
          <h1 className="text-2xl font-bold text-gray-900">Jobanzeige erstellen</h1>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                  activeStep >= 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                1
              </div>
              <div
                className={`ml-2 text-sm font-medium ${
                  activeStep >= 1 ? "text-blue-600" : "text-gray-500"
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
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                2
              </div>
              <div
                className={`ml-2 text-sm font-medium ${
                  activeStep >= 2 ? "text-blue-600" : "text-gray-500"
                }`}
              >
                Entwurf
              </div>
              <div className="mx-4 h-0.5 flex-1 bg-gray-200" />
            </div>
            <div className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                  activeStep >= 3
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                3
              </div>
              <div
                className={`ml-2 text-sm font-medium ${
                  activeStep >= 3 ? "text-blue-600" : "text-gray-500"
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
                  Briefing / Stichpunkte
                </h3>
                <textarea
                  name="briefing"
                  value={formData.briefing}
                  onChange={handleInputChange}
                  rows={12}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="z. B. Senior Frontend Developer, React, Remote möglich, 80–90k, Mittelständler, kleines Team..."
                />
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <h3 className="mb-4 text-sm font-semibold text-gray-900">
                  Details
                </h3>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Jobtitel
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Firma
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Standort
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Tonalität
                  </label>
                  <select
                    name="tonality"
                    value={formData.tonality}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  >
                    <option value="Neutral">Neutral</option>
                    <option value="Locker">Locker</option>
                    <option value="Förmlich">Förmlich</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isAnonymous"
                    name="isAnonymous"
                    checked={formData.isAnonymous}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                  <label
                    htmlFor="isAnonymous"
                    className="text-sm font-medium text-gray-700"
                  >
                    Anzeige anonymisieren
                  </label>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={generateDraft}
                    className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Entwurf generieren &rarr;
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Entwurf
              </h3>
              <div className="mb-6 rounded-md bg-gray-50 p-6">
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">
                  {generatedDraft}
                </pre>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setActiveStep(1)}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Zurück zur Eingabe
                </button>
                <button
                  onClick={() => setActiveStep(3)}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                className="mb-6 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
              <div className="mb-6 flex items-start gap-3 rounded-md bg-blue-50 p-4">
                <Info className="h-5 w-5 text-blue-400" />
                <p className="text-sm text-blue-700">
                  Hinweis: In einer späteren Version kannst du diesen Entwurf direkt
                  als Job in dein CRM übernehmen oder als PDF/Word exportieren.
                </p>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setActiveStep(2)}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
