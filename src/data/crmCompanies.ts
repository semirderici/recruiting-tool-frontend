import { CrmCompany } from "@/types/crm";

const today = new Date();
const daysAgo = (days: number) => {
  const d = new Date(today);
  d.setDate(today.getDate() - days);
  return d.toISOString();
};

export const crmCompanies: CrmCompany[] = [
  {
    id: "company-tech-solutions",
    name: "Tech Solutions AG",
    location: "Berlin",
    industry: "Software & IT",
    website: "https://tech-solutions.example.com",
    size: "51-200",
    status: "active",
    createdAt: daysAgo(120),
    updatedAt: daysAgo(1),
    source: "LinkedIn",
    notes: "Hauptkunde für Frontend- und DevOps-Rollen.",
  },
  {
    id: "company-cloudify",
    name: "Cloudify GmbH",
    location: "München",
    industry: "Cloud & DevOps",
    website: "https://cloudify.example.com",
    size: "11-50",
    status: "active",
    createdAt: daysAgo(90),
    updatedAt: daysAgo(3),
    source: "Active Sourcing",
    notes: "Sucht langfristig DevOps- und SRE-Profile.",
  },
  {
    id: "company-dataworks",
    name: "DataWorks AG",
    location: "Hamburg",
    industry: "Data & Analytics",
    website: "https://dataworks.example.com",
    size: "201-500",
    status: "prospect",
    createdAt: daysAgo(45),
    updatedAt: daysAgo(7),
    source: "Empfehlung",
    notes: "Neuer Ansprechpartner im Bereich Data Engineering.",
  },
  {
    id: "company-innovatex",
    name: "InnovateX GmbH",
    location: "Köln",
    industry: "Product & Innovation",
    website: "https://innovatex.example.com",
    size: "51-200",
    status: "active",
    createdAt: daysAgo(200),
    updatedAt: daysAgo(10),
    source: "Karriereseite",
    notes: "Regelmäßige Product Owner & PM Rollen.",
  },
  {
    id: "company-analytics-co",
    name: "Analytics & Co",
    location: "Remote / DACH",
    industry: "Analytics & BI",
    website: "https://analytics-co.example.com",
    size: "11-50",
    status: "inactive",
    createdAt: daysAgo(365),
    updatedAt: daysAgo(60),
    source: "Jobbörse",
    notes: "Projekt abgeschlossen, aktuell keine neuen Rollen.",
  },
];

