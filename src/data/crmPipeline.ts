import { CrmPipelineItem } from "@/types/crm";

const today = new Date();

const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(today.getDate() - 2);

const lastWeek = new Date(today);
lastWeek.setDate(today.getDate() - 7);

const twoWeeksAgo = new Date(today);
twoWeeksAgo.setDate(today.getDate() - 14);

const lastMonth = new Date(today);
lastMonth.setDate(today.getDate() - 30);

export const crmPipelineItems: CrmPipelineItem[] = [
  {
    id: "p1",
    candidateName: "Max Mustermann",
    jobTitle: "Senior Frontend Developer",
    companyName: "Tech Solutions AG",
    stage: "interview",
    createdAt: lastWeek.toISOString(),
    updatedAt: yesterday.toISOString(),
    source: "LinkedIn",
    tags: ["React", "TypeScript", "Remote"],
  },
  {
    id: "p2",
    candidateName: "Lisa Schmidt",
    jobTitle: "DevOps Engineer",
    companyName: "Cloudify GmbH",
    stage: "contacted",
    createdAt: twoWeeksAgo.toISOString(),
    updatedAt: twoDaysAgo.toISOString(),
    source: "Active Sourcing",
    tags: ["AWS", "Kubernetes"],
  },
  {
    id: "p3",
    candidateName: "Tim Tester",
    jobTitle: "Backend Developer (Python)",
    companyName: "DataWorks AG",
    stage: "offer",
    createdAt: lastMonth.toISOString(),
    updatedAt: yesterday.toISOString(),
    source: "Empfehlung",
    tags: ["Python", "FastAPI"],
  },
  {
    id: "p4",
    candidateName: "Sarah Weber",
    jobTitle: "Product Owner",
    companyName: "InnovateX GmbH",
    stage: "new",
    createdAt: today.toISOString(),
    updatedAt: today.toISOString(),
    source: "Karriereseite",
    tags: ["Agile", "Scrum"],
  },
  {
    id: "p5",
    candidateName: "Jonas Richter",
    jobTitle: "Data Analyst",
    companyName: "Analytics & Co",
    stage: "hired",
    createdAt: lastMonth.toISOString(),
    updatedAt: lastWeek.toISOString(),
    source: "Jobbörse",
    tags: ["SQL", "Power BI"],
  },
  {
    id: "p6",
    candidateName: "Emily Klein",
    jobTitle: "HR Business Partner",
    companyName: "PeopleFirst AG",
    stage: "rejected",
    createdAt: twoWeeksAgo.toISOString(),
    updatedAt: lastWeek.toISOString(),
    source: "Headhunter",
    tags: ["HR", "Stakeholder Management"],
  },
  {
    id: "p7",
    candidateName: "John Doe",
    jobTitle: "Fullstack Developer",
    companyName: "Webflow Solutions",
    stage: "interview",
    createdAt: lastWeek.toISOString(),
    updatedAt: today.toISOString(),
    source: "GitHub",
    tags: ["React", "Node.js"],
  },
];

