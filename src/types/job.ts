export type JobStatus = "Offen" | "In Bearbeitung" | "Besetzt" | "On Hold";
export type JobType = "Vollzeit" | "Teilzeit" | "Freelance" | "Praktikum";
export type JobSource = "Intern" | "Extern" | "CRM" | "Import";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  status: JobStatus;
  bestMatchScore: number;
  createdAt: string;
  source: JobSource;
  tags: string[];
}


