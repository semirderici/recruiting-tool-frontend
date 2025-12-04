"use client";

import React, { useState } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import {
  User,
  Palette,
  KeyRound,
  ShieldCheck,
  Save,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

import { settingsUserProfile } from "@/data/settingsProfile";
import { settingsBranding } from "@/data/settingsBranding";
import { settingsApiKeys } from "@/data/settingsApiKeys";

import { SettingsUserProfile, SettingsBranding } from "@/types/crm";

export default function SettingsPage() {
  // Local state for profile
  const [profile, setProfile] = useState<SettingsUserProfile>(settingsUserProfile);
  const [profileMessage, setProfileMessage] = useState<string>("");

  // Local state for branding
  const [branding, setBranding] = useState<SettingsBranding>(settingsBranding);
  const [brandingMessage, setBrandingMessage] = useState<string>("");

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = () => {
    setProfileMessage("Dies ist aktuell nur eine Demo – Änderungen werden nicht dauerhaft gespeichert.");
    setTimeout(() => setProfileMessage(""), 5000);
  };

  const handleBrandingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBranding((prev) => ({ ...prev, [name]: value }));
  };

  const saveBranding = () => {
    setBrandingMessage("Branding wurde in dieser Demo aktualisiert (nicht persistiert).");
    setTimeout(() => setBrandingMessage(""), 5000);
  };

  return (
    <SidebarLayout>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Einstellungen</h1>
          <p className="mt-1 text-sm text-gray-500">
            Verwalte dein Profil, Branding und Integrationen.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column: Profile & Branding */}
          <div className="space-y-6">
            {/* Profil Karte */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <User className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Profil</h2>
              </div>

              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                  {profile.avatarInitials}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{profile.name}</h3>
                  <p className="text-sm text-gray-500">{profile.role === "admin" ? "Administrator" : profile.role}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="mb-1 block text-sm font-medium text-gray-700">
                    Rolle
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={profile.role}
                    onChange={handleProfileChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="admin">Admin</option>
                    <option value="recruiter">Recruiter</option>
                    <option value="viewer">Nur Lesen</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Zeitzone
                    </label>
                    <input
                      type="text"
                      disabled
                      value={profile.timezone}
                      className="block w-full rounded-md border-gray-200 bg-gray-50 text-gray-500 shadow-sm sm:text-sm cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Sprache
                    </label>
                    <input
                      type="text"
                      disabled
                      value={profile.language === "de" ? "Deutsch" : profile.language}
                      className="block w-full rounded-md border-gray-200 bg-gray-50 text-gray-500 shadow-sm sm:text-sm cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={saveProfile}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Save className="h-4 w-4" />
                  Änderungen speichern
                </button>
                {profileMessage && (
                  <p className="mt-2 text-center text-xs text-amber-600 animate-pulse">
                    {profileMessage}
                  </p>
                )}
              </div>
            </div>

            {/* Branding Karte */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <Palette className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Branding</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="productName" className="mb-1 block text-sm font-medium text-gray-700">
                    Produktname
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={branding.productName}
                    onChange={handleBrandingChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="companyName" className="mb-1 block text-sm font-medium text-gray-700">
                    Firmenname
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={branding.companyName}
                    onChange={handleBrandingChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Primärfarbe
                    </label>
                    <div className="flex items-center gap-2">
                      <span
                        className="h-6 w-6 rounded-full border border-gray-200 shadow-sm"
                        style={{ backgroundColor: branding.primaryColor }}
                      />
                      <input
                        type="text"
                        name="primaryColor"
                        value={branding.primaryColor}
                        onChange={handleBrandingChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Akzentfarbe
                    </label>
                    <div className="flex items-center gap-2">
                      <span
                        className="h-6 w-6 rounded-full border border-gray-200 shadow-sm"
                        style={{ backgroundColor: branding.accentColor }}
                      />
                      <input
                        type="text"
                        name="accentColor"
                        value={branding.accentColor}
                        onChange={handleBrandingChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <span className="mb-2 block text-sm font-medium text-gray-700">Logo</span>
                  <div className="flex items-center justify-center rounded-md border-2 border-dashed border-gray-300 px-6 py-8">
                    <div className="text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-gray-400">
                        <User className="h-6 w-6" />
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        Logo-Upload folgt in einer späteren Version
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={saveBranding}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  <Save className="h-4 w-4" />
                  Branding aktualisieren (Demo)
                </button>
                {brandingMessage && (
                  <p className="mt-2 text-center text-xs text-purple-600 animate-pulse">
                    {brandingMessage}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: API Keys & Roles */}
          <div className="space-y-6">
            {/* API Keys Karte */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <KeyRound className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">API-Keys & Integrationen</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="border-b border-gray-100 text-xs font-medium uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="py-2 pr-4">Service</th>
                      <th className="py-2 pr-4">Status</th>
                      <th className="py-2 pr-4">Zuletzt</th>
                      <th className="py-2 text-right">Aktion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {settingsApiKeys.map((key) => (
                      <tr key={key.id}>
                        <td className="py-3 pr-4">
                          <div className="font-medium text-gray-900">{key.service}</div>
                          <div className="text-xs text-gray-500">{key.description}</div>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {key.scopes.map((scope) => (
                              <span
                                key={scope}
                                className="inline-flex items-center rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600"
                              >
                                {scope}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 pr-4 align-top">
                          {key.status === "active" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                              <CheckCircle2 className="h-3 w-3" /> Aktiv
                            </span>
                          )}
                          {key.status === "pending" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                              <HelpCircle className="h-3 w-3" /> Pending
                            </span>
                          )}
                          {key.status === "error" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
                              <AlertCircle className="h-3 w-3" /> Fehler
                            </span>
                          )}
                        </td>
                        <td className="py-3 pr-4 align-top text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {key.lastUsed}
                          </div>
                        </td>
                        <td className="py-3 text-right align-top">
                          <button
                            type="button"
                            title="Kommt später"
                            disabled
                            className="text-xs font-medium text-gray-400 cursor-not-allowed hover:text-gray-500"
                          >
                            Verwalten
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Rollen & Rechte Karte */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Rollen & Rechte</h2>
              </div>

              <div className="space-y-4 text-sm text-gray-600">
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Aktuell bist du als <span className="font-semibold text-gray-900">Admin</span> angemeldet.
                  </li>
                  <li>
                    In einer späteren Version kannst du hier Recruiter und Viewer verwalten.
                  </li>
                  <li>
                    Rechte wirken sich auf Zugriff auf Kandidaten, Jobs, Exporte und Integrationen aus.
                  </li>
                </ul>

                <div className="mt-4 flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 p-3">
                  <span className="font-medium text-gray-700">Team-Funktionen aktivieren</span>
                  <div className="relative inline-flex h-6 w-11 cursor-not-allowed items-center rounded-full bg-gray-200">
                    <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
