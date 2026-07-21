/**
 * Strukturen — Array vs. Tabelle als Brücke zu DB/SQL.
 */
window.LESSONS = [
  {
    id: "st-array",
    module: "Array",
    eyebrow: "Schritt 1 · Liste",
    title: "Viele Werte in einer Liste",
    body:
      "Ein <strong>Array</strong> speichert Werte hintereinander. " +
      "Zugriff über den Index: <code>namen[2]</code>.",
    code: `namen = ["Anna", "Ben", "Carla"]
print(namen[2])  # Carla`,
    quiz: {
      prompt: "Womit greifst du einen Array-Wert an?",
      options: ["Mit dem Index", "Nur mit SQL", "Nur mit Farben", "Gar nicht"],
      correct: 0,
    },
    result: {
      caption: "> namen als Spalte",
      columns: ["index", "wert"],
      rows: [
        [0, "Anna"],
        [1, "Ben"],
        [2, "Carla"],
      ],
      highlight: [{ row: 2, col: 1 }],
      note: "Eine Spalte — klar und einfach.",
    },
  },
  {
    id: "st-2d",
    module: "2D",
    eyebrow: "Schritt 2 · Zeile/Spalte",
    title: "Array wie eine Tabelle",
    body:
      "Ein 2D-Array ist eine <strong>Liste von Zeilen</strong>. " +
      "Jede innere Liste hat dieselben Spalten — fast wie in MySQL.",
    code: `personen = [
    ["Anna", "Müller"],
    ["Ben", "Zwaniger"],
    ["Carla", "Annenheim"]
]
# personen[Zeile][Spalte]`,
    quiz: {
      prompt: "Was ist personen[1][0]?",
      options: ["Anna", "Ben", "Müller", "Carla"],
      correct: 1,
    },
    result: {
      caption: "> personen als Tabelle",
      columns: ["zeile", "vorname", "nachname"],
      rows: [
        [0, "Anna", "Müller"],
        [1, "Ben", "Zwaniger"],
        [2, "Carla", "Annenheim"],
      ],
      highlight: [{ row: 1, col: 1 }],
      note: "Zeile 1, Spalte 0 → Ben.",
    },
  },
  {
    id: "st-table",
    module: "Tabelle",
    eyebrow: "Schritt 3 · DB-Sicht",
    title: "Gleiche Daten, andere Form",
    body:
      "In einer Datenbank heißen die Zeilen oft <strong>Datensätze</strong> " +
      "und die Spalten <strong>Felder</strong>. Inhaltlich dasselbe wie dein 2D-Array — " +
      "nur dauerhaft gespeichert und per SQL abfragbar.",
    code: `-- Tabelle personen
-- vorname | nachname
-- Anna    | Müller
-- Ben     | Zwaniger`,
    quiz: {
      prompt: "Was entspricht einer Array-Zeile in einer Tabelle am ehesten?",
      options: ["Ein Datensatz (Zeile)", "Nur der Tabellenname", "Nur SQL-Fehler", "Ein Button"],
      correct: 0,
    },
    result: {
      caption: "> Mapping",
      columns: ["Array", "Tabelle"],
      rows: [
        ["innere Liste", "Zeile / Datensatz"],
        ["Spalten-Index", "Feld / Spalte"],
        ["personen[i][j]", "Wert in Zeile i, Spalte j"],
      ],
      note: "Gleiche Struktur — unterschiedliche Werkzeuge.",
    },
  },
  {
    id: "st-ops",
    module: "Operationen",
    eyebrow: "Schritt 4 · Tun",
    title: "Was du mit beiden machst",
    body:
      "Ausgeben, filtern, sortieren — im Array per Schleife/Pseudocode, " +
      "in der DB oft per <code>SELECT</code>, <code>WHERE</code>, <code>ORDER BY</code>.",
    code: `# Array: for + if
# SQL:   SELECT … WHERE … ORDER BY …`,
    quiz: {
      prompt: "Welcher SQL-Teil filtert Zeilen?",
      options: ["FROM", "WHERE", "TABLE", "INT"],
      correct: 1,
    },
    result: {
      caption: "> Operationen",
      columns: ["Ziel", "Array-Idee", "SQL"],
      rows: [
        ["alles zeigen", "Schleife", "SELECT *"],
        ["filtern", "if / WENN", "WHERE"],
        ["ordnen", "Sortieren", "ORDER BY"],
      ],
      highlight: [{ row: 1, col: 2 }],
      note: "Als Nächstes: echte Befehle tippen — gegen eine kleine JSON-Datenbank.",
    },
  },
  {
    id: "st-why",
    module: "Warum DB?",
    eyebrow: "Schritt 5 · Dauerhaft",
    title: "Array im Programm, Tabelle in der DB",
    body:
      "Ein Array lebt meist nur, solange das Programm läuft. " +
      "Eine Datenbank <strong>bewahrt</strong> Daten und macht sie für viele Abfragen verfügbar.",
    code: `Array  → schnell im Code, oft temporär
MySQL  → gespeichert, abfragbar, teilbar`,
    quiz: {
      prompt: "Was kann eine DB besser als ein flüchtiges Array?",
      options: [
        "Nur schöner aussehen",
        "Daten dauerhaft speichern und abfragen",
        "Python ersetzen",
        "Touch-Eingaben",
      ],
      correct: 1,
    },
    result: {
      caption: "> Merksatz",
      columns: ["ort", "rolle"],
      rows: [
        ["Array", "Struktur im Programm"],
        ["Tabelle/DB", "gespeicherte, abfragbare Daten"],
      ],
      note: "Bereit für den MySQL-Blitz — tippen wie im Terminal.",
    },
  },
];
