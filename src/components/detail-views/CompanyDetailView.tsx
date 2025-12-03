"use client";

import React, { useState } from "react";
import { Company } from "@/types/company";
import { dummyJobs } from "@/data/jobs";
import Link from "next/link";
import {
  Users,
  MapPin,
  Calendar,
  Building2,
  Mail,
  Phone,
  Clock,
  ExternalLink,
} from "lucide-react";

interface CompanyDetailViewProps {
  company: Company;
}

export function CompanyDetailView({ company }: CompanyDetailViewProps) {
  const [activeTab, setActiveTab] = useState("uebersicht");

  // Filter jobs for this company
  // In a real app we'd filter by ID, but for dummy data match by name or string
  const companyJobs = dummyJobs.filter((j) =>
    j.company.includes(company.name)
  );

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <nav className="-mb-px flex space-x-8 min-w-max" aria-label="Tabs">
          {[
            { id: "uebersicht", label: "Übersicht" },
            { id: "kontakte", label: "Kontakte" },
            { id: "jobs", label: "Jobs" },
            { id: "historie", label: "Historie" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              } whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === "uebersicht" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Über das Unternehmen
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {company.description}
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="text-xs text-gray-500">Mitarbeiter</div>
                  <div className="mt-1 font-semibold text-gray-900">
                    {company.size}
                  </div>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="text-xs text-gray-500">Standort</div>
                  <div className="mt-1 font-semibold text-gray-900">
                    {company.location}
                  </div>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="text-xs text-gray-500">Gründung</div>
                  <div className="mt-1 font-semibold text-gray-900">
                    {company.createdAt.split("-")[0]}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Ansprechpartner
              </h2>
              {company.contacts.map((contact, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {contact.name}
                    </div>
                    <div className="text-xs text-gray-500">{contact.role}</div>
                    <div className="mt-1 text-xs text-gray-500">
                      {contact.email}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "kontakte" && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {company.contacts.map((contact, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <span className="font-bold">
                    {contact.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{contact.name}</h3>
                  <p className="text-sm text-gray-500">{contact.role}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {contact.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4 text-gray-400" />
                  {contact.phone}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "jobs" && (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Titel
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Standort
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">
                  Aktion
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {companyJobs.map((job) => (
                <tr key={job.id}>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {job.title}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{job.location}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
              {companyJobs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    Keine Jobs für diese Firma gefunden.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "historie" && (
        <div className="flow-root rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <ul role="list" className="-mb-8">
            {[
              { text: "Firma angelegt", date: "2023-01-15" },
              { text: "Erster Job veröffentlicht", date: "2023-02-01" },
              { text: "Vertrag erneuert", date: "2023-06-01" },
            ].map((event, eventIdx) => (
              <li key={eventIdx}>
                <div className="relative pb-8">
                  {eventIdx !== 2 ? (
                    <span
                      className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 ring-8 ring-white">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-500">{event.text}</p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        {event.date}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

