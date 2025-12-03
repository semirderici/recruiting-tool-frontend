export type CompanyStatus = "active" | "prospect" | "inactive";

export interface Company {
  id: string;
  name: string;
  location: string;
  industry?: string;
  website?: string;
  size?: string;
  status?: CompanyStatus;
  tags?: string[];
  createdAt: string;
  updatedAt?: string;
  notes?: string;
  description: string;
  contacts: {
    name: string;
    role: string;
    email: string;
    phone: string;
  }[];
}
