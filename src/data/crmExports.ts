import { CrmExport } from "@/types/crm";

const now = new Date();

const daysAgo = (days: number) => {
  const d = new Date(now);
  d.setDate(d.getDate() - days);
  return d.toISOString();
};

export const crmExports: CrmExport[] = [
  {
    id: "exp-1",
    title: "Kandidatenliste – React Frontend",
    description: "Alle aktiven React-Frontend-Kandidaten der letzten 30 Tage.",
    type: "candidate_list",
    format: "csv",
    status: "completed",
    createdAt: daysAgo(2),
    finishedAt: daysAgo(2),
    createdBy: "Semir Derici",
    rowCount: 24,
    candidateCount: 24,
    scope: "Filter: Skill=React, Zeitraum=30 Tage",
  },
  {
    id: "exp-2",
    title: "Jobliste – Aktive Mandate",
    description: "Übersicht aller aktuell offenen Jobs mit Pipeline-Phase.",
    type: "job_list",
    format: "xlsx",
    status: "completed",
    createdAt: daysAgo(5),
    finishedAt: daysAgo(5),
    createdBy: "Semir Derici",
    rowCount: 5,
    jobCount: 5,
    scope: "Status=Offen, On Hold",
  },
  {
    id: "exp-3",
    title: "Matching-Report – Senior Frontend Developer",
    description: "Matching zwischen Senior Frontend Job und Kandidaten-Pipeline.",
    type: "matching_report",
    format: "pdf",
    status: "running",
    createdAt: daysAgo(0),
    createdBy: "Semir Derici",
    rowCount: 10,
    candidateCount: 10,
    jobCount: 1,
    scope: "Job: Senior Frontend Developer",
  },
  {
    id: "exp-4",
    title: "Aktivitäten-Log – letzte Woche",
    description: "Calls, Interviews und Notizen der letzten 7 Tage.",
    type: "activity_log",
    format: "google_sheets",
    status: "failed",
    createdAt: daysAgo(7),
    finishedAt: daysAgo(7),
    createdBy: "System",
    rowCount: 42,
    scope: "Zeitraum=7 Tage, alle Kunden",
  },
];

