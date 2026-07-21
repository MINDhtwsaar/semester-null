/**
 * Datentypen — geführte Aufgaben.
 * Rechts: Multiple Choice → Ausführen löst auf und zeigt Tabelle.
 */
window.LESSONS = [
  {
    id: "dt-int",
    module: "Ganzzahl",
    eyebrow: "Schritt 1 · int",
    title: "Ganzzahl",
    body:
      "Eine <strong>Ganzzahl</strong> speichert ganze Zahlen ohne Nachkommastellen — " +
      "zum Beispiel 3, 17 oder -5. Gut für Zähler, Punkte oder Positionen. " +
      "In vielen Sprachen heißt der Typ <code>int</code>.",
    code: `punkte = 17
position = -5
print(punkte)
print(position)`,
    quiz: {
      prompt: "Welcher Typ passt zu punkte = 17?",
      options: ["float", "string", "int", "bool"],
      correct: 2,
    },
    result: {
      caption: "> SELECT name, wert, typ FROM werte;",
      columns: ["name", "wert", "typ"],
      rows: [
        ["punkte", 17, "int"],
        ["position", -5, "int"],
      ],
      highlight: [
        { row: 0, col: 2 },
        { row: 1, col: 2 },
      ],
      note: "Keine Kommastelle → Ganzzahl → int.",
    },
  },
  {
    id: "dt-float",
    module: "Kommazahl",
    eyebrow: "Schritt 2 · float / double",
    title: "Kommazahl",
    body:
      "Eine <strong>Kommazahl</strong> speichert Werte mit Nachkommastellen — " +
      "zum Beispiel 3,14 oder 19,99. Gut für Messwerte, Preise und Durchschnitte. " +
      "Typisch: <code>float</code> oder <code>double</code>.",
    code: `pi = 3.14
preis = 19.99
print(pi)
print(preis)`,
    quiz: {
      prompt: "Welcher Typ passt zu preis = 19.99?",
      options: ["int", "float", "bool", "Nur Text"],
      correct: 1,
    },
    result: {
      caption: "> SELECT name, wert, typ FROM werte;",
      columns: ["name", "wert", "typ"],
      rows: [
        ["pi", 3.14, "float"],
        ["preis", 19.99, "float"],
      ],
      highlight: [
        { row: 0, col: 2 },
        { row: 1, col: 2 },
      ],
      note: "In Python sind Kommazahlen float. Andere Sprachen nutzen oft auch double.",
    },
  },
  {
    id: "dt-string",
    module: "Text",
    eyebrow: "Schritt 3 · string",
    title: "Text",
    body:
      "<strong>Text</strong> speichert Zeichenketten — Name, Ort oder Titel. " +
      "Gut für alles, was gelesen und angezeigt werden soll. " +
      "Typisch in Anführungszeichen, Typ oft <code>string</code>.",
    code: `name = "Anna"
ort = "Saarbrücken"
print(name)
print(ort)`,
    quiz: {
      prompt: 'Was ist der Typ von name = "Anna"?',
      options: ["int", "bool", "string", "float"],
      correct: 2,
    },
    result: {
      caption: "> SELECT name, wert, typ FROM werte;",
      columns: ["name", "wert", "typ"],
      rows: [
        ["name", "Anna", "string"],
        ["ort", "Saarbrücken", "string"],
      ],
      highlight: [
        { row: 0, col: 2 },
        { row: 1, col: 2 },
      ],
      note: "Anführungszeichen markieren Text — nicht rechnen, sondern lesen/anzeigen.",
    },
  },
  {
    id: "dt-bool",
    module: "Wahr / Falsch",
    eyebrow: "Schritt 4 · bool",
    title: "Wahr / Falsch",
    body:
      "Ein <strong>bool</strong> kennt nur zwei Zustände: wahr oder falsch — " +
      "zum Beispiel erledigt oder nicht erledigt. Gut für Entscheidungen und Zustände.",
    code: `erledigt = True
offen = False
print(erledigt)
print(offen)`,
    quiz: {
      prompt: "Wie viele mögliche Werte hat ein bool?",
      options: ["Unendlich viele", "10", "2", "1"],
      correct: 2,
    },
    result: {
      caption: "> SELECT name, wert, typ FROM werte;",
      columns: ["name", "wert", "typ"],
      rows: [
        ["erledigt", "True", "bool"],
        ["offen", "False", "bool"],
      ],
      highlight: [
        { row: 0, col: 2 },
        { row: 1, col: 2 },
      ],
      note: "Nur True oder False — ideal für Ja/Nein-Zustände.",
    },
  },
  {
    id: "dt-object",
    module: "Zusammengesetzter Wert",
    eyebrow: "Schritt 5 · Objekt",
    title: "Zusammengesetzter Wert",
    body:
      "Mehrere Datentypen können <strong>gemeinsam ein Objekt</strong> bilden — " +
      "zum Beispiel eine Aufgabe aus Text + Datum + Wahr/Falsch.",
    code: `aufgabe = {
    "titel": "Üben",
    "datum": "2026-07-21",
    "erledigt": False
}
print(aufgabe["titel"])
print(aufgabe["erledigt"])`,
    quiz: {
      prompt: "Was steckt in aufgabe zusammen?",
      options: [
        "Nur int-Werte",
        "string + Datum + bool",
        "Nur ein bool",
        "Nur float-Werte",
      ],
      correct: 1,
    },
    result: {
      caption: "> SELECT feld, wert, typ FROM aufgabe;",
      columns: ["feld", "wert", "typ"],
      rows: [
        ["titel", "Üben", "string"],
        ["datum", "2026-07-21", "string"],
        ["erledigt", "False", "bool"],
      ],
      note: "Ein Objekt bündelt verschiedene Typen zu einem sinnvollen Ganzen.",
    },
  },
  {
    id: "dt-merksatz",
    module: "Merksatz",
    eyebrow: "Schritt 6 · Überblick",
    title: "Merksatz",
    body:
      "<strong>Datentypen</strong> beschreiben einen Wert — etwa <code>int</code>, " +
      "<code>float</code>, <code>string</code> oder <code>bool</code>. " +
      "<strong>Datenstrukturen</strong> ordnen viele Werte für gemeinsame Arbeit " +
      "(zum Beispiel ein Array).",
    code: `# Datentyp: ein Wert
alter = 20          # int

# Datenstruktur: viele Werte
namen = ["Anna", "Ben", "Carla"]  # Array / Liste`,
    quiz: {
      prompt: "Was beschreibt einen einzelnen Wert?",
      options: [
        "Nur Datenstrukturen",
        "Datentypen",
        "Nur Arrays",
        "Nur Tabellen",
      ],
      correct: 1,
    },
    result: {
      caption: "> Merksatz",
      columns: ["begriff", "aufgabe"],
      rows: [
        ["Datentyp", "beschreibt einen Wert (int, float, string, bool)"],
        ["Datenstruktur", "ordnet viele Werte (z. B. Array)"],
      ],
      highlight: [{ row: 0, col: 0 }],
      note: "Als Nächstes: Arrays — viele Werte speichern und ausgeben.",
    },
  },
];
