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
