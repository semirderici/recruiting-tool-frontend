"use client";

import React, { useState } from "react";
import { Candidate } from "@/types/candidate";
import {
  MapPin,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  FileText,
  Clock,
  Plus,
} from "lucide-react";

interface CandidateDetailViewProps {
  candidate: Candidate;
}

export function CandidateDetailView({ candidate }: CandidateDetailViewProps) {
  const [activeTab, setActiveTab] = useState("profil");

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <nav className="-mb-px flex space-x-8 min-w-max" aria-label="Tabs">
          {[
            { id: "profil", label: "Profil" },
            { id: "notizen", label: "Notizen" },
            { id: "dokumente", label: "Dokumente" },
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

      {/* Tab Content */}
      {activeTab === "profil" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Card */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Kontakt & Infos
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Standort</div>
                    <div className="text-sm font-medium text-gray-900">
                      {candidate.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">E-Mail</div>
                    <div className="text-sm font-medium text-gray-900">
                      {candidate.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Telefon</div>
                    <div className="text-sm font-medium text-gray-900">
                      {candidate.phone}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Aktualisiert</div>
                    <div className="text-sm font-medium text-gray-900">
                      {candidate.lastUpdated}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Card */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {candidate.topSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-500/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Resume Preview */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Lebenslauf
              </h2>
              <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 text-gray-400">
                <span className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  CV-Vorschau nicht verfügbar
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            {/* Notes Card */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Notizen</h2>
              <p className="text-sm text-gray-500 italic">
                Erstgespräch positiv. Kandidat wirkt sehr motiviert.
              </p>
              <button className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
                <Plus className="h-4 w-4" />
                Notiz hinzufügen
              </button>
            </div>

            {/* AI Analysis */}
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-6">
              <h3 className="mb-2 font-semibold text-blue-900">AI Analysis</h3>
              <p className="text-sm text-blue-800">
                Dieser Kandidat passt sehr gut zu offenen Senior-Rollen im Bereich
                Frontend-Entwicklung. Starke Übereinstimmung bei React und
                TypeScript.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "notizen" && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-center py-12">
            <h3 className="text-sm font-medium text-gray-900">Keine Notizen</h3>
            <p className="mt-1 text-sm text-gray-500">
              Füge eine erste Notiz zu diesem Kandidaten hinzu.
            </p>
          </div>
        </div>
      )}

      {activeTab === "dokumente" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["Lebenslauf.pdf", "Zeugnisse.pdf", "Anschreiben.pdf"].map((doc) => (
            <div
              key={doc}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="text-sm font-medium text-gray-900">{doc}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "historie" && (
        <div className="flow-root rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <ul role="list" className="-mb-8">
            {[
              { text: "Profil erstellt", date: "vor 2 Tagen" },
              { text: "Zu 'Frontend Dev' gematcht", date: "vor 1 Tag" },
              { text: "Status auf 'In Kontakt' gesetzt", date: "vor 4 Stunden" },
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
                        <p className="text-sm text-gray-500">
                          {event.text}
                        </p>
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

