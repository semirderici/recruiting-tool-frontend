"use client";

import React from "react";
import Link from "next/link";
import { SidebarLayout } from "@/components/SidebarLayout";
import { UserSearch, Briefcase, ArrowRight } from "lucide-react";

export default function ResearchPage() {
  return (
    <SidebarLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-900">Research</h1>
          <p className="mt-2 text-lg text-gray-600">
            KI-gestützte Suche nach passenden Jobs und Kandidaten.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Card 1: CV -> Jobs */}
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <UserSearch className="h-7 w-7" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900">CV → Jobs</h2>
            <div className="mb-6 flex-1 text-gray-600">
              <ul className="list-inside list-disc space-y-2 text-sm">
                <li>CV oder Profiltext eingeben.</li>
                <li>Passende Jobs mit Matching-Score finden.</li>
                <li>Treffer zu Jobdetail oder Export weiterleiten.</li>
              </ul>
            </div>
            <div className="mt-auto">
              <Link
                href="/research/cv-to-jobs"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Flow starten
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Job -> Candidates */}
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Briefcase className="h-7 w-7" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Job → Kandidaten
            </h2>
            <div className="mb-6 flex-1 text-gray-600">
              <ul className="list-inside list-disc space-y-2 text-sm">
                <li>Job auswählen oder Jobtext einfügen.</li>
                <li>Passende Kandidaten mit Score & Overlaps.</li>
                <li>Direkt in Pipeline oder Exposé übernehmen (später).</li>
              </ul>
            </div>
            <div className="mt-auto">
              <Link
                href="/research/job-to-candidates"
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
