/**
 * Geführte Aufgaben für Array Lab.
 * Rechts: Multiple Choice → Ausführen löst auf und zeigt Tabelle.
 */
window.LESSONS = [
  // ── Modul 1: Einfaches Array ──────────────────────────────────────────
  {
    id: "1d-create",
    module: "Einfaches Array",
    eyebrow: "Schritt 1 · Speichern",
    title: "Ein Array anlegen",
    body:
      "Ein <strong>Array</strong> speichert mehrere Werte in einer Liste. " +
      "Die eckigen Klammern <code>[]</code> fassen die Werte zusammen — " +
      "ähnlich wie eine Spalte in einer Tabelle.",
    code: `namen = ["Anna", "Ben", "Carla"]
print(namen)`,
    quiz: {
      prompt: "Wie viele Werte speichert dieses Array?",
      options: ["2", "3", "4", "1"],
      correct: 1,
    },
    result: {
      caption: "> SELECT * FROM namen;",
      columns: ["index", "wert"],
      rows: [
        [0, "Anna"],
        [1, "Ben"],
        [2, "Carla"],
      ],
      note: "Drei Werte, drei Zeilen. Der Index beginnt bei 0.",
    },
  },
  {
    id: "1d-access",
    module: "Einfaches Array",
    eyebrow: "Schritt 2 · Zugriff",
    title: "Einen Wert über den Index holen",
    body:
      "Mit <code>namen[Index]</code> liest du einen einzelnen Wert. " +
      "Der erste Eintrag hat Index <strong>0</strong>, nicht 1.",
    code: `namen = ["Anna", "Ben", "Carla"]

print(namen[0])
print(namen[2])`,
    quiz: {
      prompt: "Was gibt namen[0] aus?",
      options: ["Ben", "Carla", "Anna", "Fehler"],
      correct: 2,
    },
    result: {
      caption: "> namen[0]  und  namen[2]",
      columns: ["index", "wert"],
      rows: [
        [0, "Anna"],
        [1, "Ben"],
        [2, "Carla"],
      ],
      highlight: [
        { row: 0, col: 1 },
        { row: 2, col: 1 },
      ],
      note: "Gelb markiert: die Werte, die der Code ausgibt.",
    },
  },
  {
    id: "1d-length",
    module: "Einfaches Array",
    eyebrow: "Schritt 3 · Länge",
    title: "Wie viele Einträge stecken drin?",
    body:
      "<code>len(namen)</code> liefert die Anzahl der Elemente — " +
      "wie <code>COUNT(*)</code> in einer Tabelle.",
    code: `namen = ["Anna", "Ben", "Carla"]

anzahl = len(namen)
print(anzahl)`,
    quiz: {
      prompt: "Welchen Wert hat anzahl nach len(namen)?",
      options: ["2", "0", "3", "Anna"],
      correct: 2,
    },
    result: {
      caption: "> SELECT COUNT(*) FROM namen;  →  3",
      columns: ["ausdruck", "ergebnis"],
      rows: [["len(namen)", 3]],
      highlight: [{ row: 0, col: 1 }],
      note: "Länge 3 bedeutet: gültige Indizes sind 0, 1 und 2.",
    },
  },
  {
    id: "1d-loop",
    module: "Einfaches Array",
    eyebrow: "Schritt 4 · Ausgeben",
    title: "Alle Werte durchlaufen",
    body:
      "Mit einer Schleife gibst du jeden Eintrag aus — " +
      "Zeile für Zeile, wie ein <code>SELECT</code> über die ganze Tabelle.",
    code: `namen = ["Anna", "Ben", "Carla"]

for name in namen:
    print(name)`,
    quiz: {
      prompt: "In welcher Reihenfolge erscheinen die Ausgaben?",
      options: [
        "Carla, Ben, Anna",
        "Anna, Ben, Carla",
        "Nur Anna",
        "Zufällig",
      ],
      correct: 1,
    },
    result: {
      caption: "> for name in namen: print(name)",
      columns: ["#", "ausgabe"],
      rows: [
        [1, "Anna"],
        [2, "Ben"],
        [3, "Carla"],
      ],
      note: "Die Schleife geht der Reihe nach durch — von Index 0 bis zum Ende.",
    },
  },

  // ── Modul 2: Mehrdimensionales Array ─────────────────────────────────
  {
    id: "2d-create",
    module: "Mehrdimensionales Array",
    eyebrow: "Schritt 5 · Tabelle speichern",
    title: "Ein Array aus Arrays",
    body:
      "Ein <strong>zweidimensionales Array</strong> ist eine Liste von Listen — " +
      "wie eine Tabelle mit Zeilen und Spalten. Hier: Personen mit Vor- und Nachname.",
    code: `personen = [
    ["Anna", "Müller"],
    ["Ben", "Zwaniger"],
    ["Carla", "Annenheim"],
    ["David", "Karl"],
    ["Esther", "Schmidt"]
]`,
    quiz: {
      prompt: "Wie viele Zeilen (Personen) hat diese Tabelle?",
      options: ["2", "4", "5", "10"],
      correct: 2,
    },
    result: {
      caption: "> SELECT * FROM personen;",
      columns: ["zeile", "spalte_0 (vorname)", "spalte_1 (nachname)"],
      rows: [
        [0, "Anna", "Müller"],
        [1, "Ben", "Zwaniger"],
        [2, "Carla", "Annenheim"],
        [3, "David", "Karl"],
        [4, "Esther", "Schmidt"],
      ],
      note: "Jede innere Liste ist eine Zeile. Zwei Spalten: Vorname und Nachname.",
    },
  },
  {
    id: "2d-rule",
    module: "Mehrdimensionales Array",
    eyebrow: "Schritt 6 · Zeile und Spalte",
    title: "personen[Zeile][Spalte]",
    body:
      "Zuerst die <strong>Zeile</strong>, dann die <strong>Spalte</strong>. " +
      "Genau wie in einer Datenbank: Zeile finden, dann Spalte lesen.",
    code: `# personen[Zeile][Spalte]

personen[0][0]
personen[0][1]
personen[2][0]
personen[2][1]`,
    quiz: {
      prompt: "Was liefert personen[0][1]?",
      options: ["Anna", "Müller", "Carla", "Ben"],
      correct: 1,
    },
    result: {
      caption: "> personen[Zeile][Spalte]",
      columns: ["zeile", "spalte_0", "spalte_1"],
      rows: [
        [0, "Anna", "Müller"],
        [1, "Ben", "Zwaniger"],
        [2, "Carla", "Annenheim"],
        [3, "David", "Karl"],
        [4, "Esther", "Schmidt"],
      ],
      highlight: [
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 2, col: 1 },
        { row: 2, col: 2 },
      ],
      note: "Zeile 0 und Zeile 2 sind markiert — die Beispiele aus dem Code.",
    },
  },
  {
    id: "2d-lookup",
    module: "Mehrdimensionales Array",
    eyebrow: "Schritt 7 · Einzelwert",
    title: "Nur einen Nachnamen lesen",
    body:
      "Willst du nur den Nachnamen von Carla? " +
      "Zeile <strong>2</strong>, Spalte <strong>1</strong> → <code>personen[2][1]</code>.",
    code: `nachname = personen[2][1]
print(nachname)`,
    quiz: {
      prompt: "Was steht in personen[2][1]?",
      options: ["Carla", "Müller", "Annenheim", "Karl"],
      correct: 2,
    },
    result: {
      caption: "> personen[2][1]",
      columns: ["zeile", "spalte_0", "spalte_1"],
      rows: [
        [0, "Anna", "Müller"],
        [1, "Ben", "Zwaniger"],
        [2, "Carla", "Annenheim"],
        [3, "David", "Karl"],
        [4, "Esther", "Schmidt"],
      ],
      highlight: [{ row: 2, col: 2 }],
      rowHighlight: [2],
      note: "Eine Zelle — wie SELECT nachname FROM personen WHERE zeile = 2;",
    },
  },
  {
    id: "2d-row",
    module: "Mehrdimensionales Array",
    eyebrow: "Schritt 8 · Ganze Zeile",
    title: "Eine ganze Person ausgeben",
    body:
      "Nur ein Index holt die <strong>ganze innere Liste</strong> — " +
      "also eine komplette Zeile der Tabelle.",
    code: `person = personen[3]
print(person)`,
    quiz: {
      prompt: "Was enthält personen[3]?",
      options: [
        '["David", "Karl"]',
        '["Carla", "Annenheim"]',
        '"David"',
        '["Esther", "Schmidt"]',
      ],
      correct: 0,
    },
    result: {
      caption: "> personen[3]",
      columns: ["zeile", "spalte_0", "spalte_1"],
      rows: [
        [0, "Anna", "Müller"],
        [1, "Ben", "Zwaniger"],
        [2, "Carla", "Annenheim"],
        [3, "David", "Karl"],
        [4, "Esther", "Schmidt"],
      ],
      highlight: [
        { row: 3, col: 1 },
        { row: 3, col: 2 },
      ],
      rowHighlight: [3],
      note: "personen[3] ist selbst wieder ein Array: Vorname und Nachname.",
    },
  },
];
