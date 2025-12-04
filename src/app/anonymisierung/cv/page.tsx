"use client";

import React, { useState } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import { ArrowLeft, ChevronRight, CheckCircle, Copy } from "lucide-react";
import Link from "next/link";

const SAMPLE_CV = `Max Mustermann
Musterstraße 12, 10115 Berlin
Telefon: +49 170 1234567
E-Mail: max.mustermann@example.com
LinkedIn: linkedin.com/in/maxmustermann

Berufserfahrung:

01/2020 – Heute
Senior Consultant SAP bei TechCorp GmbH, München
- Leitung von ERP-Einführungsprojekten
- Teamführung von 5 Mitarbeitern

05/2016 – 12/2019
Software Engineer bei InnovateX Solutions
- Entwicklung von Microservices
`;

export default function CvAnonymizationPage() {
  const [step, setStep] = useState(1);
  const [rawText, setRawText] = useState(SAMPLE_CV);
  const [anonymizedText, setAnonymizedText] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  // Options state
  const [options, setOptions] = useState({
    removeName: true,
    removeContact: true,
    anonymizeCompany: true,
    generalizeLocation: true,
    neutralizeRoles: false,
  });

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setOptions((prev) => ({ ...prev, [name]: checked }));
  };

  const processAnonymization = () => {
    let text = rawText;

    if (options.removeName) {
      text = text.replace(/Max Mustermann/g, "Kandidat A");
    }

    if (options.removeContact) {
      text = text
        .replace(/\+49 \d+ \d+/g, "+49 *** ***")
        .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "***@***.de")
        .replace(/linkedin\.com\/in\/[a-zA-Z0-9]+/g, "linkedin.com/in/***")
        .replace(/Musterstraße 12, 10115/g, "***");
    }

    if (options.generalizeLocation) {
      text = text.replace(/München/g, "Süddeutschland").replace(/Berlin/g, "Norddeutschland");
    }

    if (options.anonymizeCompany) {
      text = text
        .replace(/TechCorp GmbH/g, "Technologieunternehmen (Großkonzern)")
        .replace(/InnovateX Solutions/g, "Software-Dienstleister");
    }

    if (options.neutralizeRoles) {
      text = text
        .replace(/Senior Consultant SAP/g, "Senior Consultant (ERP)")
        .replace(/Software Engineer/g, "Softwareentwickler");
    }

    setAnonymizedText(text);
    setStep(2);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(anonymizedText);
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
          <h1 className="text-2xl font-bold text-gray-900">CV anonymisieren</h1>
          <p className="mt-1 text-gray-500">
            Entferne persönliche Daten und bereite den Lebenslauf für die Weitergabe vor.
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
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-gray-300 bg-white text-gray-500"
                  }`}
                >
                  {s.id}
                </div>
                <span
                  className={`text-xs font-medium ${
                    step >= s.id ? "text-indigo-600" : "text-gray-500"
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
                  CV-Text eingeben oder einfügen
                </h3>
                <textarea
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  className="block min-h-[400px] w-full flex-1 rounded-md border-0 py-3 font-mono text-sm text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  placeholder="Füge hier den Lebenslauf-Text ein (ohne Formatierung)..."
                />
              </div>

              <div className="flex flex-col gap-6">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    Anonymisierungs-Optionen
                  </h3>
                  <div className="space-y-4">
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="removeName"
                        checked={options.removeName}
                        onChange={handleOptionChange}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <span className="text-sm text-gray-700">
                        Name entfernen / ersetzen
                      </span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="removeContact"
                        checked={options.removeContact}
                        onChange={handleOptionChange}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <span className="text-sm text-gray-700">
                        Kontaktdaten anonymisieren (E-Mail, Telefon, etc.)
                      </span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="anonymizeCompany"
                        checked={options.anonymizeCompany}
                        onChange={handleOptionChange}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <span className="text-sm text-gray-700">
                        Firmennamen anonymisieren
                      </span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="generalizeLocation"
                        checked={options.generalizeLocation}
                        onChange={handleOptionChange}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <span className="text-sm text-gray-700">
                        Ortsangaben grob halten
                      </span>
                    </label>
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="neutralizeRoles"
                        checked={options.neutralizeRoles}
                        onChange={handleOptionChange}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <span className="text-sm text-gray-700">
                        Rollen neutralisieren (z. B. &quot;Senior Consultant (ERP)&quot;)
                      </span>
                    </label>
                  </div>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    onClick={processAnonymization}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
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
                    {rawText}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-indigo-700">Anonymisierte Version</h3>
                  <div className="h-[500px] overflow-y-auto rounded-md border-2 border-indigo-100 bg-white p-4 font-mono text-sm text-gray-900 whitespace-pre-wrap shadow-sm">
                    {anonymizedText}
                  </div>
                </div>
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
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
                Das Dokument wurde erfolgreich bearbeitet und kann nun verwendet werden.
              </p>

              <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
                <h3 className="mb-4 text-left text-sm font-semibold text-gray-900">
                  Export & nächste Schritte
                </h3>
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
                    Als Vorlage speichern (später)
                  </button>
                  <button
                    disabled
                    className="col-span-full flex cursor-not-allowed items-center justify-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-400 shadow-sm ring-1 ring-inset ring-gray-200"
                  >
                    In Matching übernehmen (später)
                  </button>
                </div>
              </div>

              <button
                onClick={() => setStep(1)}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Neuen CV anonymisieren
              </button>
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}


