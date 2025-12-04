import { CrmActivity } from "@/types/crm";

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

export const crmActivities: CrmActivity[] = [
  {
    id: "1",
    type: "interview",
    title: "Interview geplant",
    description: "Erstgespräch für Frontend Developer Position vereinbart.",
    relatedToType: "candidate",
    relatedToName: "Max Mustermann",
    relatedToId: "c1",
    createdAt: today.toISOString(),
    actor: "Semir Derici",
    source: "Interview",
  },
  {
    id: "2",
    type: "task",
    title: "Aufgabe erledigt: Vertragsentwurf senden",
    description: "Entwurf wurde per E-Mail an den Kunden verschickt.",
    relatedToType: "company",
    relatedToName: "Tech Solutions AG",
    relatedToId: "comp1",
    createdAt: yesterday.toISOString(),
    actor: "Semir Derici",
    source: "Aufgabe",
  },
  {
    id: "3",
    type: "call",
    title: "Call mit Kunde",
    description: "Abstimmung über neue Anforderungen für Senior Backend Stelle.",
    relatedToType: "company",
    relatedToName: "InnovateX GmbH",
    relatedToId: "comp2",
    createdAt: twoDaysAgo.toISOString(),
    actor: "Maria Muster",
    source: "Kunden-Call",
  },
  {
    id: "4",
    type: "email",
    title: "E-Mail an Kandidatin",
    description: "Rückfrage bzgl. Verfügbarkeit im Dezember.",
    relatedToType: "candidate",
    relatedToName: "Lisa Schmidt",
    relatedToId: "c2",
    createdAt: lastWeek.toISOString(),
    actor: "Jonas Recruiter",
    source: "E-Mail",
  },
  {
    id: "5",
    type: "system",
    title: "Export erstellt",
    description: "Export 'Kandidatenliste Berlin Q4' wurde generiert.",
    relatedToType: "company",
    relatedToName: "Intern",
    createdAt: lastWeek.toISOString(),
    actor: "System",
    source: "System",
  },
  {
    id: "6",
    type: "note",
    title: "Notiz zu Job",
    description: "Budgetfreigabe für diese Stelle liegt jetzt vor (bis 95k).",
    relatedToType: "job",
    relatedToName: "Senior Frontend Dev",
    relatedToId: "j1",
    createdAt: twoWeeksAgo.toISOString(),
    actor: "Semir Derici",
    source: "Notiz",
  },
  {
    id: "7",
    type: "task",
    title: "Aufgabe erstellt: Feedback einholen",
    description: "Erinnerung für Follow-up nach Interview.",
    relatedToType: "job",
    relatedToName: "DevOps Engineer",
    relatedToId: "j2",
    createdAt: lastMonth.toISOString(),
    actor: "Semir Derici",
    source: "Aufgabe",
  },
  {
    id: "8",
    type: "interview",
    title: "Zweitgespräch durchgeführt",
    description: "Technischer Deep Dive war sehr positiv.",
    relatedToType: "candidate",
    relatedToName: "Tim Tester",
    relatedToId: "c3",
    createdAt: lastMonth.toISOString(),
    actor: "Maria Muster",
    source: "Interview",
  },
];


