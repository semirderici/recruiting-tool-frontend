# Einstellungen (Settings)

Die Einstellungsseite dient zur Verwaltung von Benutzerprofilen, Unternehmensbranding, API-Zugriffen und Benutzerrollen.

## Struktur

Die Seite ist in vier Haupt-Tabs unterteilt:

1.  **Profil & Account**: Verwaltung persönlicher Daten (Name, E-Mail, Sprache, Zeitzone).
2.  **Branding**: Anpassung des visuellen Auftritts (Firmenname, Farben, Logo).
3.  **API & Integrationen**: Verwaltung von API-Schlüsseln und externen Integrationen (CRM, E-Mail-Finder).
4.  **Rollen & Rechte**: Übersicht über Benutzerrollen und deren Berechtigungen.

## Dateipfad

- Seite: `src/app/einstellungen/page.tsx`

## Geplante Backend-Anbindung

Die folgenden Funktionen sind aktuell nur als Frontend-Dummy implementiert und sollen später mit einem Backend verbunden werden:

- **Supabase Auth**: Authentifizierung, Passwortänderung, 2FA.
- **Datenbank (Supabase)**:
    - Speichern von Benutzerprofilen (`profiles` Tabelle).
    - Speichern von Branding-Einstellungen pro Mandant/Tenant.
    - Speichern von API-Keys und Integrations-Status.
- **Row Level Security (RLS)**: Durchsetzung der Rollen und Rechte (Admin vs. Recruiter vs. Viewer) direkt auf Datenbankebene.
- **Storage**: Upload und Hosting von Firmenlogos.

