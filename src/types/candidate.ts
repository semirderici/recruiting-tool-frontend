export type CandidateStatus = "Neu" | "In Kontakt" | "Vorgeschlagen" | "Platziert" | "Archiviert";

export interface Candidate {
  id: string;
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  status: CandidateStatus;
  topSkills: string[];
  bestMatchScore?: number;
  lastUpdated: string;
}


