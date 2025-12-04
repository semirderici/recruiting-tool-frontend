// src/data/settingsApiKeys.ts
import { SettingsApiKey } from "@/types/crm";

export const settingsApiKeys: SettingsApiKey[] = [
  {
    id: "k1",
    service: "OpenAI",
    description: "Für CV-Analyse und Job-Generierung.",
    status: "active",
    lastUsed: "02.12.2025, 17:21",
    scopes: ["cv_parsing", "matching", "draft_generation"],
  },
  {
    id: "k2",
    service: "Supabase",
    description: "Datenbank-Verbindung für Kandidaten.",
    status: "active",
    lastUsed: "02.12.2025, 17:20",
    scopes: ["read_candidates", "write_candidates"],
  },
  {
    id: "k3",
    service: "Google Sheets",
    description: "Export für Reporting-Zwecke.",
    status: "pending",
    lastUsed: "-",
    scopes: ["write_spreadsheets"],
  },
];

