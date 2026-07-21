/**
 * Suchen — lineare Suche und Idee sortiert finden.
 */
window.LESSONS = [
  {
    id: "search-idea",
    module: "Suchen",
    eyebrow: "Schritt 1 · Ziel",
    title: "Einen Wert finden",
    body:
      "<strong>Suchen</strong> heißt: in vielen Werten den richtigen finden. " +
      "Im Array gehst du oft von links nach rechts — bis der Treffer da ist.",
    code: `namen = ["Anna", "Ben", "Carla", "David"]

# Gesucht: "Carla"`,
    quiz: {
      prompt: "Was ist das Ziel einer Suche?",
      options: [
        "Alles löschen",
        "Einen bestimmten Wert finden",
        "Nur sortieren",
        "Nur zählen ohne Treffer",
      ],
      correct: 1,
    },
    result: {
      caption: "> Suche nach \"Carla\"",
      columns: ["index", "wert", "treffer?"],
      rows: [
        [0, "Anna", "nein"],
        [1, "Ben", "nein"],
        [2, "Carla", "ja"],
        [3, "David", "—"],
      ],
      highlight: [{ row: 2, col: 1 }],
      note: "Ab dem Treffer kannst du aufhören — der Rest wird nicht mehr gebraucht.",
    },
  },
  {
    id: "search-linear",
    module: "Lineare Suche",
    eyebrow: "Schritt 2 · Der Reihe nach",
    title: "Lineare Suche",
    body:
      "Bei der <strong>linearen Suche</strong> prüfst du Index 0, dann 1, dann 2 … " +
      "Einfach und immer möglich — auch wenn das Array unsortiert ist.",
    code: `gesucht = "Ben"
gefunden = -1

FÜR i VON 0 BIS n-1
    WENN namen[i] == gesucht DANN
        gefunden ← i
        STOP
    ENDE WENN
ENDE FÜR`,
    quiz: {
      prompt: "Wo startet die lineare Suche typischerweise?",
      options: ["In der Mitte", "Am Ende", "Am Index 0", "Zufällig"],
      correct: 2,
    },
    result: {
      caption: "> Lineare Suche nach \"Ben\"",
      columns: ["schritt", "index", "vergleich"],
      rows: [
        [1, 0, "Anna == Ben? nein"],
        [2, 1, "Ben == Ben? ja"],
      ],
      highlight: [{ row: 1, col: 2 }],
      note: "Zwei Vergleiche — Treffer bei Index 1.",
    },
  },
  {
    id: "search-worst",
    module: "Aufwand",
    eyebrow: "Schritt 3 · Schlimmster Fall",
    title: "Wenn nichts passt",
    body:
      "Liegt der Wert ganz hinten — oder gar nicht im Array — prüfst du " +
      "<strong>fast alle</strong> oder <strong>alle</strong> Einträge. " +
      "Je länger das Array, desto mehr Arbeit.",
    code: `namen = ["Anna", "Ben", "Carla", "David", "Esther"]
# Gesucht: "Zoe" → kein Treffer`,
    quiz: {
      prompt: "Wie viele Vergleiche im schlimmsten Fall bei 5 Einträgen?",
      options: ["1", "2", "5", "0"],
      correct: 2,
    },
    result: {
      caption: "> Suche nach \"Zoe\"",
      columns: ["#", "wert", "treffer?"],
      rows: [
        [0, "Anna", "nein"],
        [1, "Ben", "nein"],
        [2, "Carla", "nein"],
        [3, "David", "nein"],
        [4, "Esther", "nein"],
      ],
      note: "Kein Treffer → alle 5 Positionen angeschaut.",
    },
  },
  {
    id: "search-sorted",
    module: "Sortiert",
    eyebrow: "Schritt 4 · Vorteil",
    title: "Wenn Daten sortiert sind",
    body:
      "Ist das Array <strong>sortiert</strong>, kannst du klüger suchen " +
      "(z. B. in der Mitte starten). Die Idee: Hälfte wegwerfen. " +
      "Deshalb war Sortieren vorher wichtig.",
    code: `zahlen = [1, 2, 4, 5, 8]   # sortiert
# Gesucht: 5 → Mitte prüfen, dann rechts weiter`,
    quiz: {
      prompt: "Was hilft bei schnellerer Suche besonders?",
      options: [
        "Unsortierte Daten",
        "Sortierte Daten",
        "Nur längere Arrays",
        "Nur Text statt Zahlen",
      ],
      correct: 1,
    },
    result: {
      caption: "> Idee: sortiert suchen",
      columns: ["zustand", "vorteil"],
      rows: [
        ["unsortiert", "nur linear sinnvoll"],
        ["sortiert", "Teile überspringen möglich"],
      ],
      highlight: [{ row: 1, col: 0 }],
      note: "Sortieren kostet Zeit — Suchen kann danach günstiger werden.",
    },
  },
  {
    id: "search-mysql",
    module: "Brücke",
    eyebrow: "Schritt 5 · Ausblick",
    title: "Suchen wie in einer Tabelle",
    body:
      "Später in SQL: <code>WHERE name = 'Carla'</code> sucht in einer Tabelle. " +
      "Gleiche Idee — Filter auf viele Zeilen — nur andere Schreibweise.",
    code: `-- Array-Denke:
finde "Carla" in namen

-- SQL-Denke:
SELECT * FROM personen WHERE vorname = 'Carla';`,
    quiz: {
      prompt: "Was entspricht einer Suche mit Bedingung in SQL am ehesten?",
      options: ["ORDER BY", "WHERE", "CREATE", "DROP"],
      correct: 1,
    },
    result: {
      caption: "> Array-Suche ↔ SQL",
      columns: ["konzept", "array", "sql"],
      rows: [
        ["alle Werte", "for … print", "SELECT *"],
        ["filtern", "if wert == x", "WHERE …"],
      ],
      highlight: [{ row: 1, col: 2 }],
      note: "Als Nächstes: wie teuer ist ein Algorithmus eigentlich?",
    },
  },
];
