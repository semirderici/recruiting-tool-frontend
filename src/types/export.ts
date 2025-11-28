export type ExportType = "kandidaten" | "jobs" | "matching" | "report";
export type ExportFormat = "csv" | "xlsx" | "pdf";
export type ExportStatus = "geplant" | "in_arbeit" | "fertig" | "fehlgeschlagen";

export interface ExportJob {
  id: string;
  name: string;
  type: ExportType;
  format: ExportFormat;
  createdAt: string;
  createdBy: string;
  relatedCount: number;
  status: ExportStatus;
}


