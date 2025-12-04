export type CrmTaskStatus = "open" | "in_progress" | "completed" | "overdue";
export type CrmTaskType = "general" | "interview" | "follow_up" | "client_call" | "offer";
export type CrmTaskPriority = "low" | "medium" | "high";
export type CrmTaskRelationType = "candidate" | "job" | "company";

export interface CrmTask {
  id: string;
  title: string;
  description?: string;
  type: CrmTaskType;
  status: CrmTaskStatus;
  priority: CrmTaskPriority;
  relatedToType: CrmTaskRelationType;
  relatedToId?: string;
  relatedToName: string;
  dueDate: string; // ISO-String
  createdAt: string; // ISO-String
  owner: string;
  notes?: string;
}

export type CrmActivityType = "task" | "interview" | "call" | "email" | "note" | "system";

export interface CrmActivity {
  id: string;
  type: CrmActivityType;
  title: string;
  description?: string;
  relatedToType: CrmTaskRelationType;
  relatedToId?: string;
  relatedToName: string;
  createdAt: string; // ISO-String
  actor: string;
  source?: string;
}

export type CrmPipelineStageId =
  | "new"
  | "contacted"
  | "interview"
  | "offer"
  | "hired"
  | "rejected";

export interface CrmPipelineStage {
  id: CrmPipelineStageId;
  label: string;
}

export interface CrmPipelineItem {
  id: string;
  candidateName: string;
  jobTitle: string;
  companyName: string;
  stage: CrmPipelineStageId;
  createdAt: string; // ISO-String
  updatedAt: string; // ISO-String
  source?: string;   // z. B. "LinkedIn", "Empfehlung"
  tags?: string[];   // Skills, Stichworte usw.
}

export type CrmCandidateStatus = "active" | "passive" | "placed";

export interface CrmCandidate {
  id: string; // z. B. "max-mustermann" (Slug für die URL)
  name: string;
  role: string;
  location?: string;
  status: CrmCandidateStatus;
  pipelineStage?: CrmPipelineStageId;
  source?: string;      // "LinkedIn", "Empfehlung", ...
  email?: string;
  phone?: string;
  company?: string;     // aktuelle oder Ziel-Firma
  salaryRange?: string; // z. B. "80–95k €"
  tags?: string[];      // Skills / Stichworte
  headline?: string;    // kurzer Einzeiler
}

export type CrmJobStatus = "open" | "on_hold" | "closed" | "draft";

export interface CrmJob {
  id: string;
  title: string;
  companyName: string;
  companyId?: string;        // Added for linking to companies
  location: string;
  employmentType: string;   // z. B. "Vollzeit", "Teilzeit"
  seniority: string;        // z. B. "Senior", "Mid-Level"
  status: CrmJobStatus;
  pipelineStage: CrmPipelineStageId; // nutzt die bestehende Pipeline-Stage-Typen
  source: string;            // z. B. "LinkedIn", "Jobbörse"
  salaryRange?: string;      // z. B. "80–95k €"
  createdAt: string;         // ISO-String
  updatedAt: string;         // ISO-String
  shortDescription?: string; // für Listenansicht
  tags?: string[];           // Tech-Stack, Fokus
}

export type CrmCompanyStatus = "prospect" | "active" | "inactive";

export type CrmCompanySize =
  | "1-10"
  | "11-50"
  | "51-200"
  | "201-500"
  | "500+";

export interface CrmCompany {
  id: string;
  name: string;
  location: string;
  industry: string;
  website?: string;
  size?: CrmCompanySize;
  status: CrmCompanyStatus;
  createdAt: string;  // ISO-String
  updatedAt: string;  // ISO-String
  source?: string;    // z. B. "LinkedIn", "Empfehlung"
  notes?: string;
}
