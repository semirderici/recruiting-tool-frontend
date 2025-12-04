import { CrmJob } from "@/types/crm";

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const lastWeek = new Date(today);
lastWeek.setDate(today.getDate() - 7);

const twoWeeksAgo = new Date(today);
twoWeeksAgo.setDate(today.getDate() - 14);

const lastMonth = new Date(today);
lastMonth.setDate(today.getDate() - 30);

export const crmJobs: CrmJob[] = [
  {
    id: "j1",
    title: "Senior Frontend Developer",
    companyName: "Tech Solutions AG",
    companyId: "company-tech-solutions",
    location: "Berlin",
    employmentType: "Vollzeit",
    seniority: "Senior",
    status: "open",
    pipelineStage: "interview",
    source: "LinkedIn",
    salaryRange: "80–95k €",
    createdAt: lastMonth.toISOString(),
    updatedAt: yesterday.toISOString(),
    shortDescription: "Frontend-Fokus mit React & DX.",
    tags: ["React", "TypeScript", "Frontend"],
  },
  {
    id: "j2",
    title: "DevOps Engineer",
    companyName: "Cloudify GmbH",
    companyId: "company-cloudify",
    location: "München",
    employmentType: "Vollzeit",
    seniority: "Mid-Level",
    status: "open",
    pipelineStage: "contacted",
    source: "Active Sourcing",
    salaryRange: "75–90k €",
    createdAt: twoWeeksAgo.toISOString(),
    updatedAt: lastWeek.toISOString(),
    shortDescription: "Cloud-native DevOps mit Fokus auf Skalierbarkeit.",
    tags: ["AWS", "Kubernetes"],
  },
  {
    id: "j3",
    title: "Backend Developer (Python)",
    companyName: "DataWorks AG",
    companyId: "company-dataworks",
    location: "Hamburg",
    employmentType: "Vollzeit",
    seniority: "Senior",
    status: "open",
    pipelineStage: "offer",
    source: "Empfehlung",
    salaryRange: "85–100k €",
    createdAt: lastMonth.toISOString(),
    updatedAt: yesterday.toISOString(),
    shortDescription: "Backend-Fokus mit Python & FastAPI.",
    tags: ["Python", "FastAPI"],
  },
  {
    id: "j4",
    title: "Product Owner",
    companyName: "InnovateX GmbH",
    companyId: "company-innovatex",
    location: "Köln",
    employmentType: "Vollzeit",
    seniority: "Senior",
    status: "on_hold",
    pipelineStage: "new",
    source: "Karriereseite",
    salaryRange: "90–110k €",
    createdAt: lastWeek.toISOString(),
    updatedAt: lastWeek.toISOString(),
    shortDescription: "Strategischer Product Owner mit B2B-Fokus.",
    tags: ["Agile", "Scrum"],
  },
  {
    id: "j5",
    title: "Data Analyst",
    companyName: "Analytics & Co",
    companyId: "company-analytics-co",
    location: "Remote",
    employmentType: "Vollzeit",
    seniority: "Mid-Level",
    status: "closed",
    pipelineStage: "hired",
    source: "Jobbörse",
    salaryRange: "70–85k €",
    createdAt: lastMonth.toISOString(),
    updatedAt: lastWeek.toISOString(),
    shortDescription: "Analytiker mit Fokus auf Reporting & KPIs.",
    tags: ["SQL", "Power BI"],
  },
];
