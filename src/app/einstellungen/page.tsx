"use client";

import React, { useState } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import { 
  User, 
  Palette, 
  Link as LinkIcon, 
  ShieldCheck,
  Save,
  RotateCcw,
  Upload,
  Key,
  ExternalLink,
  Info
} from "lucide-react";

type TabId = "profile" | "branding" | "api" | "roles";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  const tabs = [
    { id: "profile", label: "Profil & Account", icon: User },
    { id: "branding", label: "Branding", icon: Palette },
    { id: "api", label: "API & Integrationen", icon: LinkIcon },
    { id: "roles", label: "Rollen & Rechte", icon: ShieldCheck },
  ];

  return (
    <SidebarLayout>
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Einstellungen</h1>
          <p className="mt-1 text-sm text-gray-500">
            Verwalte Profil, Branding und Integrationen deines Recruiting-Tools.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabId)}
                  className={`
                    flex items-center gap-2 whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors
                    ${
                      isActive
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }
                  `}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-blue-500" : "text-gray-400"}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "branding" && <BrandingTab />}
          {activeTab === "api" && <ApiTab />}
          {activeTab === "roles" && <RolesTab />}
        </div>
      </div>
    </SidebarLayout>
  );
}

function ProfileTab() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="col-span-2 md:col-span-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">Vorname</label>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            defaultValue="Semir"
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">Nachname</label>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            defaultValue="Derici"
          />
        </div>
        <div className="col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">E-Mail-Adresse</label>
          <input
            type="email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            defaultValue="semir@example.com"
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">Sprache</label>
          <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
            <option>Deutsch</option>
            <option>Englisch</option>
          </select>
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">Zeitzone</label>
          <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
            <option>Europe/Berlin</option>
            <option>Europe/Zurich</option>
            <option>Europe/London</option>
          </select>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-100 pt-6">
        <h3 className="mb-4 text-lg font-medium text-gray-900">Sicherheit</h3>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            Passwortänderung und 2-Faktor-Authentifizierung werden später ergänzt.
          </p>
          <button
            disabled
            className="cursor-not-allowed rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 ring-1 ring-inset ring-gray-200"
          >
            Passwort ändern (später)
          </button>
        </div>
      </div>

      <div className="mt-8 flex justify-end border-t border-gray-100 pt-6">
        <button
          onClick={() => console.log("Save profile")}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Save className="h-4 w-4" />
          Änderungen speichern
        </button>
      </div>
    </div>
  );
}

function BrandingTab() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">Branding & Darstellung</h2>
      
      <div className="space-y-6">
        <div className="max-w-md">
          <label className="mb-1 block text-sm font-medium text-gray-700">Firmenname</label>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            placeholder="Dein Firmenname"
          />
        </div>

        <div className="max-w-md">
          <label className="mb-1 block text-sm font-medium text-gray-700">Primärfarbe</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              className="h-10 w-20 cursor-pointer rounded border border-gray-300 p-1"
              defaultValue="#2563eb"
            />
            <span className="font-mono text-sm text-gray-500">#2563eb</span>
          </div>
        </div>

        <div className="max-w-md">
          <label className="mb-1 block text-sm font-medium text-gray-700">Logo</label>
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 transition-colors hover:bg-gray-100">
            <Upload className="mb-3 h-8 w-8 text-gray-400" />
            <span className="text-sm font-semibold text-gray-900">Logo hochladen (später)</span>
            <span className="mt-1 text-xs text-gray-500">PNG, JPG, SVG bis 2MB</span>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Logos werden später im System und in PDF-Reports verwendet.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <RotateCcw className="h-4 w-4" />
          Auf Standard zurücksetzen
        </button>
        <button
          onClick={() => console.log("Save branding")}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Save className="h-4 w-4" />
          Branding speichern
        </button>
      </div>
    </div>
  );
}

function ApiTab() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* API Access Card */}
      <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Key className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">API-Zugriff</h2>
        </div>
        <p className="mb-6 text-sm text-gray-600">
          Verwende API-Schlüssel, um externe Systeme mit dem Research- & Matching-Tool zu verbinden.
        </p>
        
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-700">Aktueller API-Key</label>
          <div className="relative">
            <input
              type="text"
              readOnly
              defaultValue="••••••••••••••••••••••••••••"
              className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-500 bg-gray-50 ring-1 ring-inset ring-gray-300 font-mono text-sm"
            />
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            disabled
            className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-400 shadow-sm ring-1 ring-inset ring-gray-200 cursor-not-allowed"
          >
            Neuen API-Key generieren (später)
          </button>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
          >
            API-Dokumentation öffnen
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Integrations Card */}
      <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
            <LinkIcon className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Integrationen</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start justify-between rounded-lg border border-gray-100 bg-gray-50 p-4">
            <div>
              <h3 className="font-medium text-gray-900">CRM / ATS</h3>
              <p className="text-xs text-gray-500 mt-1">z.B. Recruitee, Personio</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
              Geplant
            </span>
          </div>

          <div className="flex items-start justify-between rounded-lg border border-gray-100 bg-gray-50 p-4">
            <div>
              <h3 className="font-medium text-gray-900">E-Mail-Finder</h3>
              <p className="text-xs text-gray-500 mt-1">z.B. Hunter.io</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              Optional
            </span>
          </div>

          <div className="flex items-start justify-between rounded-lg border border-gray-100 bg-gray-50 p-4">
            <div>
              <h3 className="font-medium text-gray-900">n8n / Automatisierung</h3>
              <p className="text-xs text-gray-500 mt-1">Workflows & Trigger</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
              In Vorbereitung
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RolesTab() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Rollen & Rechte</h2>
        <p className="mt-1 text-sm text-gray-500">
          Verwalte die Rollen in deinem Account. Die Logik wird später im Backend umgesetzt.
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Rolle
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Beschreibung
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Typische Berechtigungen
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr>
              <td className="whitespace-nowrap px-6 py-4">
                <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
                  Admin
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Voller Zugriff auf alle Bereiche
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Alles sehen, verwalten, löschen
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap px-6 py-4">
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  Recruiter
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Operative Nutzung im Recruiting-Alltag
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Kandidaten, Jobs, Matching, Exporte
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap px-6 py-4">
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  Viewer
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Nur lesender Zugriff für Stakeholder/Kunden
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                Nur Lesezugriff auf ausgewählte Bereiche
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-start gap-2 rounded-md bg-blue-50 p-4 text-sm text-blue-700">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          Rollen- und Rechteverwaltung wird später mit Supabase-RLS und einem Backend-Modul umgesetzt.
        </p>
      </div>
    </div>
  );
}

