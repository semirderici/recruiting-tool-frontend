# AITONOM Recruit

Das **AITONOM Recruit** ist ein modernes Frontend für eine Recruiting- & Matching-Plattform. Es ermöglicht das Verwalten von Kandidaten und Jobs, das Durchführen von Research-Flows (Matching) sowie das Erstellen von Anonymisierungen und Exporten.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Sprache:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Charts:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)

## Projektstruktur

- `src/app`: App Router Seiten und Layouts.
- `src/components`: Wiederverwendbare UI-Komponenten (z.B. `SidebarLayout`, `DashboardCard`).
- `src/components/charts`: Diagramm-Komponenten basierend auf Recharts.
- `src/data`: Statische Dummy-Daten für Kandidaten, Jobs und Exporte.
- `src/types`: TypeScript Interfaces und Typ-Definitionen.
- `src/lib`: Hilfsfunktionen (z.B. `cn` für Tailwind-Klassen).

## Hauptbereiche

1.  **Dashboard** (`/`): Überblick über KPIs, Trends und aktuelle Aktivitäten.
2.  **Kandidaten** (`/candidates`): Liste und Filterung von Kandidatenprofilen.
3.  **Jobs & Firmen** (`/jobs`): Verwaltung von Stellenanzeigen.
4.  **Research** (`/research`): Matching-Flows (CV → Jobs, Job → Kandidaten).
5.  **Erstellung** (`/erstellung`): KI-gestützte Erstellung von Jobanzeigen und Profilen.
6.  **Anonymisierung** (`/anonymisierung`): Tools zum Anonymisieren von CVs und Jobs.
7.  **Exporte** (`/exporte`): Download von Listen und Reports.
8.  **Einstellungen** (`/einstellungen`): Profil, Branding und Rechteverwaltung.

## Lokale Installation & Start

1.  Repository klonen:
    ```bash
    git clone <repo-url>
    ```

2.  Abhängigkeiten installieren:
    ```bash
    npm install
    ```

3.  Entwicklungsserver starten:
    ```bash
    npm run dev
    ```

4.  Öffne [http://localhost:3000](http://localhost:3000) in deinem Browser.
