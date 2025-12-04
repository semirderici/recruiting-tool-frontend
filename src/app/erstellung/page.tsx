"use client";

import React from "react";
import Link from "next/link";
import { SidebarLayout } from "@/components/SidebarLayout";
import { FilePlus, User, ArrowRight } from "lucide-react";

export default function CreationPage() {
  return (
    <SidebarLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-900">Erstellung</h1>
          <p className="mt-2 text-lg text-gray-600">
            KI-gestützte Erstellung von Jobanzeigen und Kandidatenprofilen.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Card 1: Job Posting */}
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FilePlus className="h-7 w-7" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Jobanzeige erstellen
            </h2>
            <div className="mb-6 flex-1 text-gray-600">
              <ul className="list-inside list-disc space-y-2 text-sm">
                <li>Stichpunkte eingeben – KI generiert einen ersten Entwurf.</li>
                <li>Tonalität wählen (neutral, locker, förmlich).</li>
                <li>Optional anonymisierte Anzeige für verdeckte Suche.</li>
              </ul>
            </div>
            <div className="mt-auto">
              <Link
                href="/erstellung/job-posting"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Flow starten
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Candidate Profile */}
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <User className="h-7 w-7" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Kandidatenprofil erstellen
            </h2>
            <div className="mb-6 flex-1 text-gray-600">
              <ul className="list-inside list-disc space-y-2 text-sm">
                <li>CV-Stichpunkte oder Kurzprofil eingeben.</li>
                <li>Rolle, Seniorität, Standort und Skills definieren.</li>
                <li>Geeignet für Kandidatenexposé & Matching.</li>
              </ul>
            </div>
            <div className="mt-auto">
              <Link
                href="/erstellung/candidate-profile"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
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
