"use client";

import React, { useState } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import { ArrowLeft, ChevronRight, CheckCircle, Copy } from "lucide-react";
import Link from "next/link";

const SAMPLE_JOB = `Senior Frontend Developer (m/w/d)
InnovateX GmbH
München Innenstadt

Wir suchen dich!
InnovateX ist ein führender Anbieter von Cloud-Lösungen. Wir arbeiten mit Technologien wie React, TypeScript und AWS.

Deine Aufgaben:
- Weiterentwicklung unserer SaaS-Plattform
- Mentoring von Junior-Entwicklern

Wir bieten:
- Attraktives Gehalt (80.000 - 95.000 €)
- Modernes Büro im Herzen von München
- MacBook Pro und iPhone
`;

export default function JobAnonymizationPage() {
  const [step, setStep] = useState(1);
  const [jobRawText, setJobRawText] = useState(SAMPLE_JOB);
  const [jobAnonymizedText, setJobAnonymizedText] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  // Options state
  const [options, setOptions] = useState({
    anonymizeCompany: true,
    removeBrands: true,
    generalizeLocation: true,
    removeSalary: false,
  });

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setOptions((prev) => ({ ...prev, [name]: checked }));
  };

  const processAnonymization = () => {
    let text = jobRawText;

    if (options.anonymizeCompany) {
      text = text
        .replace(/InnovateX GmbH/g, "Technologieunternehmen (Mittelstand)")
        .replace(/InnovateX/g, "Unser Unternehmen");
    }

    if (options.generalizeLocation) {
      text = text
        .replace(/München Innenstadt/g, "Großraum München")
        .replace(/im Herzen von München/g, "in zentraler Lage");
    }

    if (options.removeBrands) {
      text = text
        .replace(/MacBook Pro/g, "Modernes Notebook")
        .replace(/iPhone/g, "Firmenhandy")
        .replace(/AWS/g, "Cloud-Technologien");
    }

    if (options.removeSalary) {
      text = text.replace(/\(80\.000 - 95\.000 €\)/g, "(Gehalt nach Vereinbarung)");
    }

    setJobAnonymizedText(text);
    setStep(2);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jobAnonymizedText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <SidebarLayout>
      <div className="mx-auto max-w-6xl">
        {/* Header / Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/anonymisierung"
            className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zur Übersicht
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Jobanzeige anonymisieren
          </h1>
          <p className="mt-1 text-gray-500">
            Stellenanzeigen für anonyme Arbeitgeberdarstellung aufbereiten.
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-10 max-w-3xl overflow-x-auto pb-4">
          <div className="relative flex min-w-[320px] items-center justify-between px-2">
            <div className="absolute left-0 top-1/2 -z-10 h-0.5 w-full -translate-y-1/2 bg-gray-200" />
            {[
              { id: 1, label: "Eingabe" },
              { id: 2, label: "Vorschau" },
              { id: 3, label: "Export" },
            ].map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-2 bg-gray-50 px-2">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                    step >= s.id
                      ? "border-cyan-600 bg-cyan-600 text-white"
                      : "border-gray-300 bg-white text-gray-500"
                  }`}
                >
                  {s.id}
                </div>
                <span
                  className={`text-xs font-medium ${
                    step >= s.id ? "text-cyan-600" : "text-gray-500"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          {step === 1 && (
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Jobanzeige einfügen
                </h3>
                <textarea
                  value={jobRawText}
                  onChange={(e) => setJobRawText(e.target.value)}
                  className="block min-h-[400px] w-full flex-1 rounded-md border-0 py-3 font-mono text-sm text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600"
                  placeholder="Füge hier die Stellenanzeige ein..."
                />
              </div>

              <div className="flex flex-col gap-6">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    Optionen
                  </h3>
                  <div className="space-y-4">
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="anonymizeCompany"
                        checked={options.anonymizeCompany}
                        onChange={handleOptionChange}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600"
                      />
                      <span className="text-sm text-gray-700">
                        Firmennamen anonymisieren
                      </span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="removeBrands"
                        checked={options.removeBrands}
                        onChange={handleOptionChange}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600"
                      />
                      <span className="text-sm text-gray-700">
                        Produkt-/Markennamen entfernen
                      </span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="generalizeLocation"
                        checked={options.generalizeLocation}
                        onChange={handleOptionChange}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600"
                      />
                      <span className="text-sm text-gray-700">
                        Exakte Standorte grob halten
                      </span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="removeSalary"
                        checked={options.removeSalary}
                        onChange={handleOptionChange}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600"
                      />
                      <span className="text-sm text-gray-700">
                        Gehaltsrange entfernen
                      </span>
                    </label>
                  </div>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    onClick={processAnonymization}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:w-auto"
                  >
                    Anonymisierung durchführen
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-gray-700">Original</h3>
                  <div className="h-[500px] overflow-y-auto rounded-md border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-600 whitespace-pre-wrap">
                    {jobRawText}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-cyan-700">
                    Anonymisierte Version
                  </h3>
                  <div className="h-[500px] overflow-y-auto rounded-md border-2 border-cyan-100 bg-white p-4 font-mono text-sm text-gray-900 whitespace-pre-wrap shadow-sm">
                    {jobAnonymizedText}
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center justify-center sm:justify-start"
                >
                  Zur Eingabe zurück
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-cyan-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                >
                  Weiter zu Export & Aktionen
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle className="h-8 w-8" />
                </div>
              </div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                Anonymisierung abgeschlossen
              </h2>
              <p className="mb-8 text-gray-600">
                Die Stellenanzeige wurde erfolgreich anonymisiert und kann nun
                verwendet werden.
              </p>

              <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
                <h3 className="mb-4 text-left text-sm font-semibold text-gray-900">
                  Export & nächste Schritte
                </h3>
                <p className="mb-6 text-left text-sm text-gray-600">
                  Nutze die anonymisierte Anzeige für Kunden-Freigaben oder
                  Portale ohne Arbeitgeber-Branding.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center justify-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <Copy className="h-4 w-4" />
                    {copySuccess ? "Kopiert!" : "In Zwischenablage kopieren"}
                  </button>
                  <button
                    disabled
                    className="flex cursor-not-allowed items-center justify-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-400 shadow-sm ring-1 ring-inset ring-gray-200"
                  >
                    Für Export vormerken (später)
                  </button>
                </div>
              </div>

              <button
                onClick={() => setStep(1)}
                className="text-sm font-medium text-cyan-600 hover:text-cyan-700"
              >
                Neue Jobanzeige anonymisieren
              </button>
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}


