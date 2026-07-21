/**
 * Pseudocode — geführte Aufgaben.
 * Rechts: Multiple Choice → Ausführen löst auf und zeigt Tabelle.
 */
window.LESSONS = [
  {
    id: "pc-idea",
    module: "Idee",
    eyebrow: "Schritt 1 · Was ist das?",
    title: "Pseudocode",
    body:
      "<strong>Pseudocode</strong> beschreibt einen Algorithmus in klaren Schritten — " +
      "fast wie normale Sprache, aber strukturiert. Noch keine echte Programmiersprache, " +
      "aber nah genug, um später Code daraus zu machen.",
    code: `ALGORITHMUS Begruessung
    AUSGEBE "Hallo"
ENDE`,
    quiz: {
      prompt: "Wozu dient Pseudocode vor allem?",
      options: [
        "Nur schöner aussehen",
        "Ablauf klar beschreiben",
        "Nur Zahlen speichern",
        "Nur Farben wählen",
      ],
      correct: 1,
    },
    result: {
      caption: "> Idee",
      columns: ["begriff", "bedeutung"],
      rows: [
        ["Algorithmus", "Schritte zur Lösung"],
        ["Pseudocode", "Strukturierte Zwischenform"],
        ["Programmcode", "Ausführbar in einer Sprache"],
      ],
      highlight: [{ row: 1, col: 0 }],
      note: "Erst denken und aufschreiben — dann programmieren.",
    },
  },
  {
    id: "pc-sequence",
    module: "Reihenfolge",
    eyebrow: "Schritt 2 · Sequenz",
    title: "Schritt für Schritt",
    body:
      "Ohne Schleife und ohne Verzweigung läuft alles <strong>der Reihe nach</strong>. " +
      "Oben zuerst, unten zuletzt — wie Zeilen in einer Tabelle.",
    code: `SETZE name ← "Anna"
AUSGEBE "Hallo"
AUSGEBE name`,
    quiz: {
      prompt: "Was passiert zuerst?",
      options: [
        'AUSGEBE name',
        'SETZE name ← "Anna"',
        'AUSGEBE "Hallo"',
        "Alles gleichzeitig",
      ],
      correct: 1,
    },
    result: {
      caption: "> Ablauf (Sequenz)",
      columns: ["#", "schritt", "wirkung"],
      rows: [
        [1, 'SETZE name ← "Anna"', "name speichern"],
        [2, 'AUSGEBE "Hallo"', "Text zeigen"],
        [3, "AUSGEBE name", "Anna zeigen"],
      ],
      highlight: [{ row: 0, col: 1 }],
      note: "Die Reihenfolge der Zeilen ist der Ablauf.",
    },
  },
  {
    id: "pc-variable",
    module: "Variable",
    eyebrow: "Schritt 3 · Speichern",
    title: "Werte merken",
    body:
      "Mit <code>SETZE</code> legst du einen Wert in eine Variable. " +
      "Später kannst du ihn lesen, ändern oder ausgeben — genau wie bei Datentypen.",
    code: `SETZE punkte ← 0
SETZE punkte ← punkte + 10
AUSGEBE punkte`,
    quiz: {
      prompt: "Welchen Wert hat punkte am Ende?",
      options: ["0", "10", "20", "Unbekannt"],
      correct: 1,
    },
    result: {
      caption: "> Variable punkte",
      columns: ["schritt", "punkte"],
      rows: [
        ["Start", 0],
        ["+ 10", 10],
        ["Ausgabe", 10],
      ],
      highlight: [{ row: 2, col: 1 }],
      note: "Die Variable hält den aktuellen Wert — Zeile für Zeile.",
    },
  },
  {
    id: "pc-if",
    module: "Verzweigung",
    eyebrow: "Schritt 4 · WENN",
    title: "Entscheiden",
    body:
      "Mit <code>WENN … DANN … SONST</code> wählst du einen Weg. " +
      "Nur einer der Zweige wird ausgeführt — abhängig von einer Bedingung (oft ein <code>bool</code>).",
    code: `SETZE punkte ← 15

WENN punkte >= 10 DANN
    AUSGEBE "Bestanden"
SONST
    AUSGEBE "Noch üben"
ENDE WENN`,
    quiz: {
      prompt: "Was wird bei punkte = 15 ausgegeben?",
      options: ["Noch üben", "Bestanden", "Nichts", "Fehler"],
      correct: 1,
    },
    result: {
      caption: "> WENN punkte >= 10",
      columns: ["bedingung", "wahr?", "zweig"],
      rows: [
        ["punkte >= 10", "True", "DANN → Bestanden"],
        ["punkte >= 10", "False", "SONST → Noch üben"],
      ],
      highlight: [{ row: 0, col: 2 }],
      note: "Hier ist die Bedingung wahr — der DANN-Zweig läuft.",
    },
  },
  {
    id: "pc-loop",
    module: "Schleife",
    eyebrow: "Schritt 5 · Wiederholen",
    title: "Über ein Array laufen",
    body:
      "Mit <code>FÜR JEDE</code> wiederholst du Schritte für jeden Eintrag — " +
      "ideal für Arrays. Das verbindet Pseudocode mit Datenstrukturen.",
    code: `SETZE namen ← ["Anna", "Ben", "Carla"]

FÜR JEDE name IN namen
    AUSGEBE name
ENDE FÜR`,
    quiz: {
      prompt: "Wie oft läuft der Schleifenkörper?",
      options: ["1×", "2×", "3×", "Unendlich"],
      correct: 2,
    },
    result: {
      caption: "> FÜR JEDE name IN namen",
      columns: ["runde", "name", "ausgabe"],
      rows: [
        [1, "Anna", "Anna"],
        [2, "Ben", "Ben"],
        [3, "Carla", "Carla"],
      ],
      note: "Drei Einträge im Array → drei Durchläufe.",
    },
  },
  {
    id: "pc-algo",
    module: "Algorithmus",
    eyebrow: "Schritt 6 · Zusammen",
    title: "Kleiner Algorithmus",
    body:
      "Sequenz, Variable, Verzweigung und Schleife ergeben zusammen einen Algorithmus. " +
      "Hier: Punkte zählen und am Ende prüfen, ob es reicht.",
    code: `SETZE summe ← 0
SETZE werte ← [4, 7, 2]

FÜR JEDE w IN werte
    SETZE summe ← summe + w
ENDE FÜR

WENN summe >= 10 DANN
    AUSGEBE "Ziel erreicht"
SONST
    AUSGEBE "Weiter sammeln"
ENDE WENN`,
    quiz: {
      prompt: "Was ist summe nach der Schleife?",
      options: ["4", "7", "13", "10"],
      correct: 2,
    },
    result: {
      caption: "> Summe der Werte",
      columns: ["schritt", "summe"],
      rows: [
        ["Start", 0],
        ["+ 4", 4],
        ["+ 7", 11],
        ["+ 2", 13],
        ["WENN >= 10", "Ziel erreicht"],
      ],
      highlight: [
        { row: 3, col: 1 },
        { row: 4, col: 1 },
      ],
      note: "4 + 7 + 2 = 13 → Bedingung wahr → Ziel erreicht.",
    },
  },
];
