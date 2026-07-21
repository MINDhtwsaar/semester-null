# Semester Null · Lab

Einfache Lernumgebung für Programmier-Basics — Kapitel mit Aktivitäten, Multiple Choice + Tabellenausgabe.

## Website

```bash
cd web
python3 -m http.server 8080
```

Dann: [http://localhost:8080](http://localhost:8080)

**Live:** [https://mindhtwsaar.github.io/semester-null/](https://mindhtwsaar.github.io/semester-null/)

## Struktur

1. **Lab** (Start) → Kapitel  
2. **Kapitel 3 — Datenstrukturen und Algorithmen**  
   - Aktivität 01: Pseudocode  
   - Aktivität 02: Datentypen  
   - Aktivität 03: Arrays  
   - Aktivität 04: Sortieren (Bubblesort per Drag & Drop)  

Bedienung in den Übungen: Frage tippen → **Ausführen** → Auflösung + Tabelle → **Weiter**

## iPad-App

1. `ios/ArrayLab.xcodeproj` in Xcode öffnen  
2. Team unter Signing wählen  
3. iPad-Simulator oder Gerät starten  

Nach Web-Änderungen:

```bash
rm -rf ios/ArrayLab/WebContent && cp -R web ios/ArrayLab/WebContent
```
