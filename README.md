# Array Lab

Einfache Lernumgebung für Arrays (1D + 2D) — Playgrounds-Layout, Deutsch, MySQL-ähnliche Tabellenausgabe.

## Website

```bash
cd web
python3 -m http.server 8080
```

Dann im Browser: [http://localhost:8080](http://localhost:8080)

Oder `web/index.html` direkt öffnen.

**Bedienung:** Aufgabe lesen → **Ausführen** → Tabelle rechts → **Weiter**

## iPad-App

1. `ios/ArrayLab.xcodeproj` in Xcode öffnen
2. Team unter Signing wählen
3. iPad-Simulator (Landscape) oder Gerät starten

Die App lädt die gebündelten Dateien aus `ios/ArrayLab/WebContent/`.

Nach Änderungen an der Website:

```bash
cp web/* ios/ArrayLab/WebContent/
```

## Inhalt

1. Einfaches Array anlegen, Index, Länge, Schleife
2. Mehrdimensionales Array (`personen`) mit Zeile/Spalte
