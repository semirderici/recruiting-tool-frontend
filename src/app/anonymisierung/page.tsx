import React from "react";
import Link from "next/link";
import { SidebarLayout } from "@/components/SidebarLayout";
import { FileText, Building, ArrowRight } from "lucide-react";

export default function AnonymizationPage() {
  return (
    <SidebarLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-900">Anonymisierung</h1>
          <p className="mt-2 text-lg text-gray-600">
            Bereite Dokumente für die anonyme Weitergabe vor.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Card 1: CV Anonymization */}
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <FileText className="h-7 w-7" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              CV anonymisieren
            </h2>
            <p className="mb-6 text-gray-600">
              Lebensläufe anonymisieren (Name, Kontaktdaten, Firma, Fotos). Ideal für anonyme Kandidatenvorstellung.
            </p>
            <ul className="mb-8 space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                Entfernt oder ersetzt personenbezogene Daten
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                Optional: neutrale Rollenbezeichnungen
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                Exportierbar für Matching oder Versand
              </li>
            </ul>
            <div className="mt-auto">
              <Link
                href="/anonymisierung/cv"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Flow starten
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Job Anonymization */}
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
              <Building className="h-7 w-7" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Jobanzeige anonymisieren
            </h2>
            <p className="mb-6 text-gray-600">
              Stellenanzeigen für anonyme Arbeitgeberdarstellung aufbereiten.
            </p>
            <ul className="mb-8 space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                Entfernt Firmenname und Markenbegriffe
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                Ersetzt Namen durch neutrale Platzhalter
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                Geeignet für Vermittler und Headhunter
              </li>
            </ul>
            <div className="mt-auto">
              <Link
                href="/anonymisierung/job"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
              >
                Flow starten
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}


