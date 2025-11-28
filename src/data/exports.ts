import { ExportJob } from "@/types/export";

export const dummyExports: ExportJob[] = [
  {
    id: "EXP-001",
    name: "Kandidatenliste Berlin Q4",
    type: "kandidaten",
    format: "csv",
    createdAt: "2023-11-25T10:30:00",
    createdBy: "Semir Derici",
    relatedCount: 45,
    status: "fertig",
  },
  {
    id: "EXP-002",
    name: "Senior Devs Shortlist",
    type: "matching",
    format: "pdf",
    createdAt: "2023-11-26T14:15:00",
    createdBy: "Semir Derici",
    relatedCount: 12,
    status: "fertig",
  },
  {
    id: "EXP-003",
    name: "Alle offenen Jobs",
    type: "jobs",
    format: "xlsx",
    createdAt: "2023-11-27T09:00:00",
    createdBy: "Semir Derici",
    relatedCount: 8,
    status: "in_arbeit",
  },
  {
    id: "EXP-004",
    name: "Monatsreport November",
    type: "report",
    format: "pdf",
    createdAt: "2023-11-27T09:05:00",
    createdBy: "System",
    relatedCount: 1,
    status: "geplant",
  },
  {
    id: "EXP-005",
    name: "Archivierte Kandidaten 2022",
    type: "kandidaten",
    format: "csv",
    createdAt: "2023-10-15T11:20:00",
    createdBy: "Semir Derici",
    relatedCount: 120,
    status: "fertig",
  },
];


