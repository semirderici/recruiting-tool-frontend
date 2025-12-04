export type AnonymizationScope = "cv" | "job";

export interface AnonymizationHistoryItem {
  id: string;
  scope: AnonymizationScope;
  title: string;
  createdAt: string; // ISO-String
  lines: number;
  tags: string[];
}

export const anonymizationHistoryCv: AnonymizationHistoryItem[] = [
  {
    id: "cv-1",
    scope: "cv",
    title: "Senior Frontend Developer – Max M.",
    createdAt: "2025-12-02T17:21:00.000Z",
    lines: 48,
    tags: ["React", "Remote", "5+ Jahre"],
  },
  {
    id: "cv-2",
    scope: "cv",
    title: "DevOps Engineer – Lisa S.",
    createdAt: "2025-11-28T10:05:00.000Z",
    lines: 39,
    tags: ["AWS", "Kubernetes"],
  },
];

export const anonymizationHistoryJob: AnonymizationHistoryItem[] = [
  {
    id: "job-1",
    scope: "job",
    title: "Senior Frontend Developer (React)",
    createdAt: "2025-12-01T09:30:00.000Z",
    lines: 32,
    tags: ["Frontend", "Berlin"],
  },
  {
    id: "job-2",
    scope: "job",
    title: "Data Analyst – Analytics & Co",
    createdAt: "2025-11-25T14:45:00.000Z",
    lines: 27,
    tags: ["SQL", "Power BI"],
  },
];

