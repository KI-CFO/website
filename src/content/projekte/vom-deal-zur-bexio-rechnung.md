---
title: "Vom gewonnenen Deal zur Bexio-Rechnung"
description: "Wie ein Rechnungsplan aus HubSpot-Deals entsteht: KI extrahiert die Zahlungsbedingungen, ein Mensch gibt frei, und Bexio-Entwürfe entstehen per Knopfdruck — ohne dass je eine Rechnung ungeprüft rausgeht."
pubDate: 2026-08-14
tools: ["HubSpot", "Google Sheets", "Bexio", "Apps Script", "Claude", "n8n"]
draft: true
---

## Ausgangslage

Ein Beratungsunternehmen mit heterogenen Zahlungsbedingungen: Meilensteine,
Teilrechnungen, Schwellenwerte, Verlängerungen. Der Engpass war nicht das
Erstellen der Rechnungen — das dauert in Bexio wenige Minuten. Der Engpass war,
dass die Zahlungsbedingungen an unstrukturierten Orten lebten: in Vertrags-PDFs,
in E-Mail-Nebenabreden, in Köpfen. Jede Rechnung begann damit, die Antwort auf
«was dürfen wir wann verrechnen?» neu herzuleiten.

## Die Kernidee: ein Rechnungsplan

Die Lösung ist kein Rechnungs-Roboter, sondern eine Struktur: ein
**Rechnungsplan** — eine Zeile für jede Rechnung, die je existieren soll. Er
entsteht einmal beim Deal-Abschluss, wird von einem Menschen geprüft, und alles
Weitere liest nur noch daraus ab:

```
Deal gewonnen → KI extrahiert Bedingungen → Mensch prüft → RECHNUNGSPLAN
                                                              ↓
                        Termin fällig → Bexio-Entwurf → Mensch gibt frei → Versand
```

Als Datenspeicher dient bewusst ein Google Sheet, keine Datenbank. Ein
Rechnungsplan besteht zur Hälfte aus Ausnahmen, und Ausnahmen muss ein Mensch
ansehen und direkt korrigieren können — dafür ist ein Sheet das bessere Werkzeug.

## Was schon läuft

- Die Billing-Tabs im Finanz-Workbook: Rechnungsplan, Kontakte, Log, Übersicht.
- Ein Knopf im Sheet erstellt aus einer geprüften Zeile einen **Bexio-Entwurf** —
  Ende zu Ende getestet, inklusive Schutz gegen Doppelrechnungen: Wer zweimal
  drückt, bekommt trotzdem nur eine Rechnung.
- Zahlungskonditionen und Positionsdaten kommen direkt aus HubSpot — keine
  PDF-Extraktion im Hauptpfad nötig.

## Die Regeln, die das Ganze tragen

Ein Sheet hat keine Datenbank-Disziplin — also muss die Disziplin in den Code.
Vier Regeln haben sich als tragend erwiesen:

1. **Nie eine Zeile über ihre Zeilennummer ansprechen.** Jemand sortiert, und
   plötzlich zeigt alles auf die falsche Zeile. Jede Zeile trägt eine unveränderliche
   ID, und jeder Zugriff läuft über diese ID.
2. **Mensch und Maschine schreiben nie in dieselbe Zelle.** Spalten sind nach
   Besitzer aufgeteilt: Der Mensch besitzt die Bedingungen, die Maschine den
   Ausführungsstatus.
3. **Beim Lesen validieren, nie dem Sheet vertrauen.** Jede Zeile wird vor der
   Verarbeitung geprüft; was die Prüfung nicht besteht, wird markiert und
   übersprungen — nie halb verarbeitet.
4. **Keine Rechnung erreicht einen Kunden ohne menschliche Freigabe.** Die KI
   schlägt vor, der Mensch entscheidet. Eine falsche Rechnung kostet mehr als eine
   langsame.

## Stolpersteine

- Der erste Entwurf sah eine PDF-Extraktion der Verträge vor. In der Praxis
  standen die relevanten Daten bereits strukturiert im CRM — die KI-Extraktion
  wanderte vom Hauptpfad in die Ausnahmebehandlung.
- Deutschsprachige Oberfläche, englische Feldnamen im Code: Wer beides mischt,
  verliert. Die Trennung (Anzeige Deutsch, Schlüssel Englisch) musste explizit
  entschieden werden.

## Nächster Schritt

Der Import-Workflow in n8n: Deal gewonnen in HubSpot → Vorschlag für den
Rechnungsplan entsteht automatisch → Freigabe per Slack. Dazu mehr im nächsten
Beitrag.
