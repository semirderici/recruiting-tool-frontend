"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import { anonymizeDemoText } from "@/utils/anonymizeDemo";
import { anonymizationHistoryJob } from "@/data/anonymizationHistory";
import { ShieldCheck, Building2, UploadCloud, ChevronLeft } from "lucide-react";

export default function AnonymizeJobPage() {
  const [inputText, setInputText] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [touched, setTouched] = useState(false);

  const anonymizedText = useMemo(
    () => (inputText ? anonymizeDemoText(inputText) : ""),
    [inputText]
  );

  return (
    <SidebarLayout>
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <Link
            href="/anonymisierung"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Zurück zur Übersicht</span>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Stellenanzeige anonymisieren
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Unternehmensname und vertrauliche Details entfernen – ideal für
            anonyme Suchmandate.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Linke Spalte: Eingabe */}
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-gray-500" />
                  <h2 className="text-base font-semibold text-gray-900">
                    Eingabe
                  </h2>
                </div>
              </div>
              <div className="p-4">
                {/* Upload Demo */}
                <div className="mb-4 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 p-6 text-center">
                  <UploadCloud className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    Hier wird später der Import von Stellenanzeigen angebunden.
                  </p>
                  <button
                    type="button"
                    className="mt-4 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Datei auswählen (Demo)
                  </button>
                </div>

                {/* Textarea */}
                <div className="mb-4">
                  <label
                    htmlFor="job-text"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Oder Text einfügen
                  </label>
                  <textarea
                    id="job-text"
                    value={inputText}
                    onChange={(e) => {
                      setInputText(e.target.value);
                      if (!touched) setTouched(true);
                    }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                    rows={12}
                    placeholder="Füge hier den Text der Stellenanzeige ein..."
                  />
                </div>

                {/* Notes */}
                <div className="mb-4">
                  <label
                    htmlFor="notes"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Notizen (optional)
                  </label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                    rows={2}
                    placeholder="Interne Anmerkungen..."
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setTouched(true)}
                    className="rounded-md bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                  >
                    Anonymisieren (Demo)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Rechte Spalte: Vorschau */}
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 px-4 py-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-cyan-600" />
                  <h2 className="text-base font-semibold text-gray-900">
                    Anonymisierte Vorschau
                  </h2>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-4 rounded-md bg-cyan-50 p-3 text-sm text-cyan-700">
                  Dies ist nur eine Demo-Anonymisierung im Frontend. Echte Daten
                  werden hier noch nicht verarbeitet.
                </div>
                <div className="max-h-[600px] overflow-y-auto rounded-md border border-gray-200 bg-gray-50 p-4">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
                    {anonymizedText ||
                      "Noch keine Eingabe vorhanden. Füge links eine Stellenanzeige ein, um die anonymisierte Vorschau zu sehen."}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            Letzte Anonymisierungen (Demo)
          </h2>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Titel
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Datum
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Umfang
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tags
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {anonymizationHistoryJob.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString("de-DE")}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {item.lines} Zeilen
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
