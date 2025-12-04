"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SidebarLayout } from "@/components/SidebarLayout";
import { crmCompanies } from "@/data/crmCompanies";
import { crmJobs } from "@/data/crmJobs";
import {
  CrmCompany,
  CrmCompanyStatus,
  CrmJobStatus,
  CrmPipelineStageId,
} from "@/types/crm";
import {
  Building2,
  MapPin,
  Globe,
  Users,
  Briefcase,
  ArrowLeft,
  FileText,
  StickyNote,
  Activity,
  ExternalLink,
  Calendar,
  ArrowRight,
} from "lucide-react";

const statusLabel: Record<CrmCompanyStatus, string> = {
  prospect: "Prospect",
  active: "Aktiv",
  inactive: "Inaktiv",
};

const statusClass: Record<CrmCompanyStatus, string> = {
  prospect: "bg-blue-50 text-blue-700 ring-blue-600/20",
  active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  inactive: "bg-gray-50 text-gray-700 ring-gray-500/10",
};

const jobStatusLabel: Record<CrmJobStatus, string> = {
  open: "Offen",
  on_hold: "Pausiert",
  closed: "Geschlossen",
  draft: "Entwurf",
};

const pipelineLabel: Record<CrmPipelineStageId, string> = {
  new: "Neu",
  contacted: "Kontaktiert",
  interview: "Interview",
  offer: "Angebot",
  hired: "Eingestellt",
  rejected: "Abgesagt",
};

type CompanyDetailTab = "jobs" | "candidates" | "notes" | "documents" | "activities";

export default function CompanyDetailPage() {
  const params = useParams();
  const companyId = params?.id as string | undefined;
  const [activeTab, setActiveTab] = useState<CompanyDetailTab>("jobs");

  const company = useMemo<CrmCompany | undefined>(
    () => crmCompanies.find((c) => c.id === companyId),
    [companyId],
  );

  const companyJobs = useMemo(
    () => (company ? crmJobs.filter((j) => j.companyId === company.id) : []),
    [company],
  );

  const activeJobsCount = companyJobs.filter((j) => j.status !== "closed").length;

  if (!company) {
    return (
      <SidebarLayout>
        <div className="mx-auto max-w-3xl">
          <div className="mb-4">
            <Link
              href="/companies"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Zur Firmenliste
            </Link>
          </div>
          <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-sm text-red-800">
            Firma wurde nicht gefunden.
          </div>
        </div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <div className="mx-auto max-w-7xl">
        {/* Back Link */}
        <div className="mb-4">
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Zur Firmenliste
          </Link>
        </div>

        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-1 items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {company.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {company.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5" />
                  {company.industry}
                </span>
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-blue-600"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    Website
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-end lg:w-auto">
            <span
              className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${statusClass[company.status]}`}
            >
              {statusLabel[company.status]}
            </span>
            {company.source && (
              <span className="inline-flex items-center justify-center rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                Quelle: {company.source}
              </span>
            )}
          </div>
        </div>

        {/* Grid Info-Karten */}
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4 mb-8">
          {/* Firma & Kontakt */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <Building2 className="h-4 w-4 text-gray-400" />
              Firma & Kontakt
            </h2>
            <dl className="mt-3 space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <dt className="text-xs text-gray-500">Ort</dt>
                <dd>{company.location}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-xs text-gray-500">Branche</dt>
                <dd>{company.industry}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-xs text-gray-500">Größe</dt>
                <dd>{company.size ?? "–"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-xs text-gray-500">Erstellt</dt>
                <dd>{new Date(company.createdAt).toLocaleDateString("de-DE")}</dd>
              </div>
            </dl>
          </div>

          {/* Nächste Schritte */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <Calendar className="h-4 w-4 text-gray-400" />
              Nächste Schritte
            </h2>
            <div className="mt-3 space-y-3 text-sm text-gray-700">
              <div>
                <p className="text-xs text-gray-500">Nächste Aktion</p>
                <p className="font-medium">Feedback einsammeln</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Offene Aufgaben</p>
                <p className="font-medium">2 offene Aufgaben</p>
              </div>
            </div>
          </div>

          {/* Pipeline & Status */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <Activity className="h-4 w-4 text-gray-400" />
              Pipeline & Status
            </h2>
            <div className="mt-3 space-y-2 text-sm text-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Status</span>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${statusClass[company.status]}`}>
                  {statusLabel[company.status]}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Aktive Jobs</span>
                <span className="font-medium">{activeJobsCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Kandidaten</span>
                <span className="font-medium">5 (Dummy)</span>
              </div>
            </div>
            <div className="mt-3">
              <Link href="/jobs" className="text-xs font-medium text-blue-600 hover:text-blue-500 flex items-center gap-1">
                Alle Jobs anzeigen <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Aktivitäten (kurz) */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <Activity className="h-4 w-4 text-gray-400" />
              Letzte Aktivitäten
            </h2>
            <ul className="mt-3 space-y-3">
              <li className="flex gap-2">
                <div className="relative mt-1">
                  <div className="h-2 w-2 rounded-full bg-blue-400 ring-4 ring-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900">Call mit HR</p>
                  <p className="text-[10px] text-gray-500">Gestern · Semir Derici</p>
                </div>
              </li>
              <li className="flex gap-2">
                <div className="relative mt-1">
                  <div className="h-2 w-2 rounded-full bg-gray-300 ring-4 ring-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900">Vertrag gesendet</p>
                  <p className="text-[10px] text-gray-500">Vor 3 Tagen · System</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Tab-Bereich */}
        <section className="mt-8">
          {/* Tab-Leiste */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex gap-6 text-sm">
              {[
                { id: "jobs" as CompanyDetailTab, label: "Jobs", icon: Briefcase },
                { id: "candidates" as CompanyDetailTab, label: "Kandidaten", icon: Users },
                { id: "notes" as CompanyDetailTab, label: "Notizen", icon: StickyNote },
                { id: "documents" as CompanyDetailTab, label: "Dokumente", icon: FileText },
                { id: "activities" as CompanyDetailTab, label: "Aktivitäten", icon: Activity },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={
                      "flex items-center gap-2 border-b-2 px-1 pb-2 text-sm font-medium transition-colors " +
                      (isActive
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300")
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab-Content */}
          <div className="pt-4">
            {/* Jobs */}
            {activeTab === "jobs" && (
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50 text-gray-500">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Job</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Standort</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Pipeline</th>
                      <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {companyJobs.length > 0 ? (
                      companyJobs.map((job) => (
                        <tr key={job.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{job.title}</td>
                          <td className="px-6 py-4 text-gray-700">{job.location}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                              {jobStatusLabel[job.status]}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-700">{pipelineLabel[job.pipelineStage]}</td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              href={`/jobs/${job.id}`}
                              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs font-medium"
                            >
                              Details <ArrowRight className="h-3 w-3" />
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                          Keine Jobs für diese Firma gefunden.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Kandidaten (Dummy) */}
            {activeTab === "candidates" && (
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50 text-gray-500">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Rolle</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Pipeline</th>
                      <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Aktion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Max Mustermann</td>
                      <td className="px-6 py-4 text-gray-700">Senior Frontend Dev</td>
                      <td className="px-6 py-4"><span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">Aktiv</span></td>
                      <td className="px-6 py-4 text-gray-700">Interview</td>
                      <td className="px-6 py-4 text-right">
                        <Link href="/candidates/max-mustermann" className="text-blue-600 hover:text-blue-800 text-xs font-medium">Profil öffnen</Link>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Lisa Schmidt</td>
                      <td className="px-6 py-4 text-gray-700">DevOps Engineer</td>
                      <td className="px-6 py-4"><span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">Aktiv</span></td>
                      <td className="px-6 py-4 text-gray-700">Kontaktiert</td>
                      <td className="px-6 py-4 text-right">
                        <Link href="/candidates/lisa-schmidt" className="text-blue-600 hover:text-blue-800 text-xs font-medium">Profil öffnen</Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Notizen */}
            {activeTab === "notes" && (
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">Notizen</h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Editor folgt später</span>
                </div>
                <ul className="space-y-4">
                  <li className="border-l-2 border-blue-200 pl-3">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm text-gray-900">Strategie-Meeting Q4</p>
                      <span className="text-xs text-gray-400">01.12.2023</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">Semir Derici</p>
                    <p className="mt-2 text-sm text-gray-700">
                      Kunde möchte verstärkt im Bereich AI/ML rekrutieren. Budgetfreigabe erwartet für Januar.
                    </p>
                  </li>
                  <li className="border-l-2 border-gray-200 pl-3">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm text-gray-900">Onboarding neuer Ansprechpartner</p>
                      <span className="text-xs text-gray-400">15.11.2023</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">Semir Derici</p>
                    <p className="mt-2 text-sm text-gray-700">
                      Herr Müller ist neuer Head of Engineering. Sehr angenehmes Erstgespräch.
                    </p>
                  </li>
                </ul>
              </div>
            )}

            {/* Dokumente */}
            {activeTab === "documents" && (
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">Dokumente</h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Upload folgt</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-md border border-gray-100 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">Rahmenvertrag_2024.pdf</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">2MB · vor 2 Wochen</span>
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700">aktuell</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-md border border-gray-100 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">Konditionen_Anlage.pdf</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">1.5MB · vor 2 Wochen</span>
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700">aktuell</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Aktivitäten */}
            {activeTab === "activities" && (
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                 <h3 className="text-sm font-semibold text-gray-900 mb-4">Aktivitäten-Historie</h3>
                 <ul className="space-y-6 border-l border-gray-200 ml-2 pl-4 py-2">
                    <li className="relative">
                      <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-blue-500 ring-4 ring-white" />
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-gray-500">Heute, 10:00 Uhr</span>
                        <p className="text-sm font-medium text-gray-900">Meeting mit HR-Abteilung</p>
                        <p className="text-sm text-gray-600">Besprechung der offenen Vakanzen für Q1/2024.</p>
                      </div>
                    </li>
                    <li className="relative">
                      <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-gray-300 ring-4 ring-white" />
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-gray-500">01.12.2023</span>
                        <p className="text-sm font-medium text-gray-900">E-Mail Ausgang</p>
                        <p className="text-sm text-gray-600">Profile von Max Mustermann und Lisa Schmidt versendet.</p>
                      </div>
                    </li>
                    <li className="relative">
                      <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-gray-300 ring-4 ring-white" />
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-gray-500">20.11.2023</span>
                        <p className="text-sm font-medium text-gray-900">Vertrag unterzeichnet</p>
                        <p className="text-sm text-gray-600">Rahmenvertrag wurde beidseitig unterschrieben zurückgesendet.</p>
                      </div>
                    </li>
                 </ul>
              </div>
            )}
          </div>
        </section>
      </div>
    </SidebarLayout>
  );
}
