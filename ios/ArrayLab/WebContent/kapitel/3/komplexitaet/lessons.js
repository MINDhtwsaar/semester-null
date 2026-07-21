/**
 * Komplexität light — Aufwand ohne Big-O-Ballast.
 */
window.LESSONS = [
  {
    id: "cx-idea",
    module: "Aufwand",
    eyebrow: "Schritt 1 · Idee",
    title: "Wie teuer ist ein Ablauf?",
    body:
      "<strong>Komplexität</strong> meint hier: Wie wächst die Arbeit, " +
      "wenn die Datenmenge wächst? Mehr Einträge → oft mehr Schritte.",
    code: `# kleines Array: wenig Arbeit
# großes Array: mehr Arbeit

n = Anzahl der Einträge`,
    quiz: {
      prompt: "Was meint Aufwand hier vor allem?",
      options: [
        "Wie schön der Code aussieht",
        "Wie die Arbeit mit mehr Daten wächst",
        "Nur die Dateigröße auf der Festplatte",
        "Nur die Farbe der UI",
      ],
      correct: 1,
    },
    result: {
      caption: "> Aufwand",
      columns: ["n (Einträge)", "Tendenz"],
      rows: [
        ["klein", "schnell fertig"],
        ["groß", "braucht länger"],
      ],
      note: "Wir zählen grob Schritte — nicht Sekunden auf einem Gerät.",
    },
  },
  {
    id: "cx-linear",
    module: "Linear",
    eyebrow: "Schritt 2 · Einmal durch",
    title: "Ein Durchlauf",
    body:
      "Einmal über alle Elemente laufen (Suche, Summe, Ausgabe) " +
      "braucht etwa <strong>n Schritte</strong> bei n Einträgen — " +
      "verdoppelt sich n, verdoppelt sich die Arbeit ungefähr.",
    code: `FÜR i VON 0 BIS n-1
    AUSGEBE a[i]
ENDE FÜR
# ≈ n Schritte`,
    quiz: {
      prompt: "Array doppelt so lang — grober Aufwand beim einmaligen Durchlauf?",
      options: ["Halb so viel", "Ungefähr doppelt", "Immer gleich", "Null"],
      correct: 1,
    },
    result: {
      caption: "> Ein Durchlauf",
      columns: ["n", "Schritte (ca.)"],
      rows: [
        [5, 5],
        [10, 10],
        [100, 100],
      ],
      note: "Lineares Wachstum: Schritte ≈ Anzahl der Elemente.",
    },
  },
  {
    id: "cx-nested",
    module: "Verschachtelt",
    eyebrow: "Schritt 3 · Doppelt",
    title: "Schleife in Schleife",
    body:
      "Bubblesort vergleicht viele Paare: äußere und innere Schleife. " +
      "Grobe Idee: bei n Elementen können das <strong>viel mehr als n</strong> " +
      "Vergleiche sein — Arbeit wächst schneller.",
    code: `FÜR i …
    FÜR j …
        vergleiche / tausche
    ENDE FÜR
ENDE FÜR
# viele Paar-Vergleiche`,
    quiz: {
      prompt: "Zwei verschachtelte Schleifen über n Elemente bedeuten oft …",
      options: [
        "Immer genau 2 Schritte",
        "Deutlich mehr Arbeit als ein Durchlauf",
        "Weniger Arbeit als Suchen",
        "Gar keine Vergleiche",
      ],
      correct: 1,
    },
    result: {
      caption: "> Grober Vergleich",
      columns: ["Ablauf", "Arbeit (Idee)"],
      rows: [
        ["1× durchs Array", "≈ n"],
        ["Bubblesort-Paare", "deutlich mehr als n"],
      ],
      highlight: [{ row: 1, col: 1 }],
      note: "Kein Formelstress — nur das Gefühl: verschachtelt = teurer.",
    },
  },
  {
    id: "cx-tradeoff",
    module: "Abwägen",
    eyebrow: "Schritt 4 · Trade-off",
    title: "Sortieren jetzt, suchen später",
    body:
      "Manchmal lohnt sich teures Sortieren, wenn du danach " +
      "<strong>oft suchst</strong>. Einmal investieren, mehrfach sparen — " +
      "wie aufräumen, bevor du etwas findest.",
    code: `# Option A: jedes Mal linear suchen
# Option B: einmal sortieren, dann klüger suchen`,
    quiz: {
      prompt: "Wann kann Sortieren trotz Mehraufwand sinnvoll sein?",
      options: [
        "Nie",
        "Wenn danach oft gesucht wird",
        "Nur bei einem einzigen Wert",
        "Nur ohne Computer",
      ],
      correct: 1,
    },
    result: {
      caption: "> Abwägen",
      columns: ["Situation", "Tendenz"],
      rows: [
        ["1× suchen", "linear reicht oft"],
        ["oft suchen", "Sortieren kann sich lohnen"],
      ],
      note: "Als Nächstes: Array und Tabelle — zwei Sichten auf dieselben Daten.",
    },
  },
];
