"use client";

import React, { useState } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import { ArrowLeft, ChevronRight, FileText, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function JobPostingCreationPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    briefing: "",
    title: "",
    company: "",
    location: "",
    tonality: "Neutral",
    isAnonymous: false,
  });

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
            Jobanzeige erstellen
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
                    ? "border-orange-600 bg-orange-600 text-white"
                    : "border-gray-300 bg-white text-gray-500"
                }`}
              >
                1
              </div>
              <span
                className={`text-xs font-medium ${
                  step >= 1 ? "text-orange-600" : "text-gray-500"
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
                    ? "border-orange-600 bg-orange-600 text-white"
                    : "border-gray-300 bg-white text-gray-500"
                }`}
              >
                2
              </div>
              <span
                className={`text-xs font-medium ${
                  step >= 2 ? "text-orange-600" : "text-gray-500"
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
                    ? "border-orange-600 bg-orange-600 text-white"
                    : "border-gray-300 bg-white text-gray-500"
                }`}
              >
                3
              </div>
              <span
                className={`text-xs font-medium ${
                  step >= 3 ? "text-orange-600" : "text-gray-500"
                }`}
              >
                Feinschliff
              </span>
            </div>
          </div>
        </div>

        {/* Content based on step */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          {step === 1 && (
            <div className="space-y-8">
              <div className="grid gap-8 md:grid-cols-2">
                {/* Left Column: Briefing */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Briefing / Stichpunkte
                  </h3>
                  <textarea
                    name="briefing"
                    value={formData.briefing}
                    onChange={handleInputChange}
                    className="block min-h-[300px] w-full flex-1 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    placeholder="z. B. Senior Frontend Developer, React, Remote möglich, 80–90k, Mittelständler, kleines Team..."
                  />
                </div>

                {/* Right Column: Form Fields */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Jobtitel
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                        placeholder="z. B. Senior Frontend Engineer"
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
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                        placeholder="z. B. TechCorp GmbH"
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
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                        placeholder="z. B. Berlin"
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
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                      >
                        <option>Neutral</option>
                        <option>Locker</option>
                        <option>Sehr professionell</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="isAnonymous"
                        name="isAnonymous"
                        checked={formData.isAnonymous}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                      />
                      <label
                        htmlFor="isAnonymous"
                        className="text-sm text-gray-700"
                      >
                        Anzeige anonymisieren
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end border-t border-gray-100 pt-6">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 rounded-md bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Entwurf generieren
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Preview Card */}
                <div className="col-span-2 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
                  <div className="mb-4 border-b border-gray-200 pb-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {formData.title || "Stellenanzeige Titel"}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {formData.isAnonymous
                        ? "Unser Kunde (Anonym)"
                        : formData.company || "Firmenname"}{" "}
                      • {formData.location || "Standort"}
                    </p>
                  </div>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      <strong>Über uns:</strong> Wir sind ein führendes
                      Unternehmen in unserer Branche und suchen Verstärkung für
                      unser Team. {formData.tonality === "Locker"
                        ? "Du passt zu uns, wenn du Bock auf coole Projekte hast!"
                        : "Wir bieten Ihnen ein professionelles Umfeld."}
                    </p>
                    <p>
                      <strong>Deine Aufgaben:</strong>
                    </p>
                    <ul className="list-disc pl-5">
                      <li>Entwicklung und Wartung von Softwarelösungen</li>
                      <li>Zusammenarbeit im interdisziplinären Team</li>
                      <li>
                        Weiterentwicklung bestehender Features (basierend auf:{" "}
                        {formData.briefing.slice(0, 50)}...)
                      </li>
                    </ul>
                    <p>
                      <strong>Das bringst du mit:</strong>
                    </p>
                    <ul className="list-disc pl-5">
                      <li>Abgeschlossenes Studium oder Ausbildung</li>
                      <li>Erfahrung in relevanten Technologien</li>
                      <li>Teamfähigkeit und Kommunikationsstärke</li>
                    </ul>
                    <p>
                      <strong>Wir bieten:</strong>
                    </p>
                    <ul className="list-disc pl-5">
                      <li>Attraktives Gehaltspaket</li>
                      <li>Flexible Arbeitszeiten</li>
                      <li>Modernes Equipment</li>
                    </ul>
                  </div>
                </div>

                {/* Sidebar Info */}
                <div className="col-span-1 space-y-6">
                  <div className="rounded-lg border border-gray-200 bg-white p-4">
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">
                      Generierte Details
                    </h3>
                    <dl className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Tonalität:</dt>
                        <dd className="font-medium text-gray-900">
                          {formData.tonality}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Anonymisiert:</dt>
                        <dd className="font-medium text-gray-900">
                          {formData.isAnonymous ? "Ja" : "Nein"}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Länge:</dt>
                        <dd className="font-medium text-gray-900">
                          ca. 350 Wörter
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
                    <p className="font-medium">KI-Hinweis:</p>
                    <p className="mt-1">
                      Der Text wurde basierend auf deinen Stichpunkten generiert.
                      Du kannst ihn im nächsten Schritt verfeinern.
                    </p>
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
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Weiter zum Feinschliff
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Main Edit Area */}
                <div className="col-span-2">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    Finale Version bearbeiten
                  </h3>
                  <textarea
                    className="block min-h-[500px] w-full rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    defaultValue={`# ${
                      formData.title || "Stellenanzeige Titel"
                    }\n\n## Über uns\nWir sind ein führendes Unternehmen...\n\n## Deine Aufgaben\n- Entwicklung und Wartung...\n- Zusammenarbeit...\n\n## Dein Profil\n- Erfahrung...\n- Teamfähigkeit...\n\n## Wir bieten\n- Gehalt...\n- Flexibilität...`}
                  />
                </div>

                {/* Variants */}
                <div className="col-span-1 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    KI-Varianten
                  </h3>
                  <div className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-orange-300 hover:shadow-md">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        Kurz & Knapp
                      </span>
                      <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                        200 Wörter
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Fokussiert auf die wesentlichen Fakten, ideal für Mobile.
                    </p>
                  </div>
                  <div className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-orange-300 hover:shadow-md">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        Benefits-Fokus
                      </span>
                      <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                        400 Wörter
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Hebt die Vorteile und Unternehmenskultur besonders hervor.
                    </p>
                  </div>
                  <div className="mt-8 border-t border-gray-100 pt-6">
                    <button className="w-full rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      Als Vorlage speichern
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center justify-center sm:justify-start"
                >
                  Zurück zum Entwurf
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-md bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  Speichern & Veröffentlichen
                  <CheckCircle className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}


