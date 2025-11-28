import React from "react";
import Link from "next/link";
import { SidebarLayout } from "@/components/SidebarLayout";
import { FilePlus, FileText, User, ArrowRight } from "lucide-react";

export default function CreationPage() {
  return (
    <SidebarLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-900">Erstellung</h1>
          <p className="mt-2 text-lg text-gray-600">
            Nutze KI, um Jobanzeigen oder Kandidatenprofile zu erstellen.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Card 1: Job Posting */}
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <FileText className="h-7 w-7" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Jobanzeige erstellen
            </h2>
            <p className="mb-6 text-gray-600">
              Erstelle ansprechende Stellenanzeigen basierend auf Stichpunkten und
              KI-Templates.
            </p>
            <ul className="mb-8 space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Aus Stichpunkten eine strukturierte Anzeige generieren
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Verschiedene Tonalitäten (neutral, locker, formal)
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Optional anonymisierte Anzeige
              </li>
            </ul>
            <div className="mt-auto">
              <Link
                href="/erstellung/job-posting"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Flow starten
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Candidate Profile */}
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <User className="h-7 w-7" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Kandidatenprofil erstellen
            </h2>
            <p className="mb-6 text-gray-600">
              Wandle Lebensläufe oder Notizen in strukturierte Profile um.
            </p>
            <ul className="mb-8 space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                CV oder Freitext in strukturiertes Profil umwandeln
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                Skills, Erfahrungen, Branchen automatisch extrahieren
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                Direkt mit Matching kombinierbar
              </li>
            </ul>
            <div className="mt-auto">
              <Link
                href="/erstellung/candidate-profile"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
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


