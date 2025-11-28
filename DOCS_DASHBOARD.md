# Dashboard Dokumentation

Das Dashboard dient als zentrale Einstiegsseite und bietet einen Überblick über wichtige Kennzahlen und Aktivitäten im Recruiting-Tool.

## Dateien

- `src/app/page.tsx`: Die Hauptseite des Dashboards.
- `src/components/DashboardCard.tsx`: Wrapper-Komponente für Dashboard-Kacheln (z.B. Charts).
- `src/components/charts/CandidatesTrendChart.tsx`: Area-Chart für die Entwicklung der Kandidatenzahlen.
- `src/components/charts/JobsByStatusChart.tsx`: Balkendiagramm für die Verteilung von Jobs nach Status.

## Sektionen

### 1. KPI-Kacheln
Zeigt vier Hauptkennzahlen basierend auf Dummy-Daten:
- **Kandidaten gesamt**: Anzahl aller Einträge in `dummyCandidates`.
- **Aktive Jobs**: Anzahl der Jobs mit Status "Offen" oder "In Bearbeitung".
- **Ø Match-Score**: Durchschnittlicher `bestMatchScore` aller Kandidaten.
- **Erfolgreiche Exporte**: Anzahl der Exporte mit Status "fertig".

### 2. Trends & Entwicklung (Charts)
Visualisiert Daten mithilfe der `recharts`-Bibliothek:
- **Kandidaten pro Monat**: Zeigt die zeitliche Entwicklung der Kandidatenanzahl (aktuell Dummy-Daten).
- **Jobs nach Status**: Zeigt die Verteilung der Jobs (Offen, Besetzt, etc.) aggregiert aus `dummyJobs`.

### 3. Listen
Bietet Schnellzugriff auf aktuelle Datensätze:
- **Neueste Kandidaten**: Die ersten 5 Einträge aus `dummyCandidates`.
- **Letzte Exporte**: Die neuesten 5 Exporte aus `dummyExports`, sortiert nach Datum.

## Datenquellen
Aktuell werden alle Daten aus statischen Dummy-Dateien geladen (`src/data/*.ts`). In einer späteren Ausbaustufe sollen diese durch echte API-Calls an das Backend ersetzt werden.

