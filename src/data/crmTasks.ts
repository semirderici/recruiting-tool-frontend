import { CrmTask } from "@/types/crm";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const in3Days = new Date(today);
in3Days.setDate(today.getDate() + 3);
const lastWeek = new Date(today);
lastWeek.setDate(today.getDate() - 7);
const nextMonth = new Date(today);
nextMonth.setDate(today.getDate() + 30);

export const crmTasks: CrmTask[] = [
  {
    id: "1",
    title: "Erstgespräch führen",
    description: "Kennenlernen und Tech-Stack abklopfen",
    type: "interview",
    status: "open",
    priority: "high",
    relatedToType: "candidate",
    relatedToName: "Max Mustermann",
    relatedToId: "c1",
    dueDate: today.toISOString(), // Heute
    createdAt: lastWeek.toISOString(),
    owner: "Semir Derici",
  },
  {
    id: "2",
    title: "Vertragsentwurf senden",
    description: "Kunde wartet auf das finale Angebot",
    type: "offer",
    status: "in_progress",
    priority: "high",
    relatedToType: "company",
    relatedToName: "Tech Solutions AG",
    relatedToId: "comp1",
    dueDate: tomorrow.toISOString(), // Morgen
    createdAt: lastWeek.toISOString(),
    owner: "Semir Derici",
  },
  {
    id: "3",
    title: "Feedback einholen",
    description: "Nachfassen bezüglich Frontend-Entwickler Position",
    type: "follow_up",
    status: "overdue",
    priority: "medium",
    relatedToType: "job",
    relatedToName: "Senior Frontend Dev",
    relatedToId: "j1",
    dueDate: lastWeek.toISOString(), // Überfällig
    createdAt: lastWeek.toISOString(),
    owner: "Maria Muster",
  },
  {
    id: "4",
    title: "Kunden-Meeting vorbereiten",
    description: "Quartalsplanung und Bedarfsanalyse",
    type: "client_call",
    status: "open",
    priority: "medium",
    relatedToType: "company",
    relatedToName: "InnovateX GmbH",
    relatedToId: "comp2",
    dueDate: in3Days.toISOString(), // Diese Woche
    createdAt: today.toISOString(),
    owner: "Semir Derici",
  },
  {
    id: "5",
    title: "Reisekostenabrechnung",
    description: "Belege vom Kundentermin einreichen",
    type: "general",
    status: "completed",
    priority: "low",
    relatedToType: "company",
    relatedToName: "Intern",
    dueDate: lastWeek.toISOString(),
    createdAt: lastWeek.toISOString(),
    owner: "Semir Derici",
  },
  {
    id: "6",
    title: "Active Sourcing LinkedIn",
    description: "Neue Kandidaten für DevOps Rolle suchen",
    type: "general",
    status: "open",
    priority: "medium",
    relatedToType: "job",
    relatedToName: "DevOps Engineer",
    relatedToId: "j2",
    dueDate: nextMonth.toISOString(), // Später
    createdAt: today.toISOString(),
    owner: "Jonas Recruiter",
  },
  {
    id: "7",
    title: "Absage versenden",
    description: "Kandidat passt nicht ins Budget",
    type: "follow_up",
    status: "open",
    priority: "low",
    relatedToType: "candidate",
    relatedToName: "Lisa Schmidt",
    relatedToId: "c2",
    dueDate: today.toISOString(), // Heute
    createdAt: today.toISOString(),
    owner: "Semir Derici",
  },
];


