(function () {
  "use strict";

  var STORAGE_KEY = "semester-null-progress-mysql";

  // Eingebettete JSON-DB (gleiche Daten wie db.json) — zuverlässig offline/iPad
  var EMBEDDED_DB = {
    personen: [
      { id: 1, vorname: "Anna", nachname: "Müller", alter: 22, stadt: "Saarbrücken" },
      { id: 2, vorname: "Ben", nachname: "Zwaniger", alter: 19, stadt: "Homburg" },
      { id: 3, vorname: "Carla", nachname: "Annenheim", alter: 24, stadt: "Saarbrücken" },
      { id: 4, vorname: "David", nachname: "Karl", alter: 21, stadt: "Neunkirchen" },
      { id: 5, vorname: "Esther", nachname: "Schmidt", alter: 23, stadt: "Homburg" },
    ],
    kurse: [
      { id: 1, titel: "Programmieren", ects: 5, pflicht: true },
      { id: 2, titel: "Datenbanken", ects: 5, pflicht: true },
      { id: 3, titel: "Design Thinking", ects: 3, pflicht: false },
      { id: 4, titel: "Mathe", ects: 5, pflicht: true },
    ],
  };

  var CHALLENGES = [
    {
      id: "show",
      eyebrow: "Challenge 1 · Überblick",
      title: "Welche Tabellen gibt es?",
      body:
        "Die Daten liegen als JSON vor — für dich wie MySQL-Tabellen. " +
        "Liste alle Tabellen mit <code>SHOW TABLES;</code>",
      hint: "Genau so tippen: SHOW TABLES;",
      check: function (db, result, sql) {
        return /SHOW\s+TABLES/i.test(MiniSQL.strip(sql));
      },
    },
    {
      id: "select-all",
      eyebrow: "Challenge 2 · Alles lesen",
      title: "Alle Personen anzeigen",
      body:
        "Hole alle Zeilen aus <code>personen</code> — wie <code>print</code> über ein 2D-Array.",
      hint: "SELECT * FROM personen;",
      expectSql: "SELECT * FROM personen",
    },
    {
      id: "where",
      eyebrow: "Challenge 3 · Filtern",
      title: "Nur Homburg",
      body:
        "Zeige Personen aus <strong>Homburg</strong>. " +
        "Filter = Suche mit Bedingung (<code>WHERE</code>).",
      hint: "SELECT * FROM personen WHERE stadt = 'Homburg';",
      expectSql: "SELECT * FROM personen WHERE stadt = 'Homburg'",
    },
    {
      id: "columns",
      eyebrow: "Challenge 4 · Spalten wählen",
      title: "Nur Name und Alter",
      body:
        "Manchmal brauchst du nicht alle Spalten. " +
        "Wähle <code>vorname</code> und <code>alter</code> aus <code>personen</code>.",
      hint: "SELECT vorname, alter FROM personen;",
      expectSql: "SELECT vorname, alter FROM personen",
    },
    {
      id: "order",
      eyebrow: "Challenge 5 · Sortieren",
      title: "Kurse nach ECTS",
      body:
        "Sortiere die Tabelle <code>kurse</code> nach <code>ects</code> absteigend " +
        "(große ECTS zuerst) — Erinnerung an Bubblesort, nur per Befehl.",
      hint: "SELECT * FROM kurse ORDER BY ects DESC;",
      expectSql: "SELECT * FROM kurse ORDER BY ects DESC",
    },
  ];

  var index = 0;
  var solved = {};
  var db = null;

  var els = {
    moduleLabel: document.getElementById("module-label"),
    stepLabel: document.getElementById("step-label"),
    progressFill: document.getElementById("progress-fill"),
    eyebrow: document.getElementById("task-eyebrow"),
    title: document.getElementById("task-title"),
    body: document.getElementById("task-body"),
    btnPrev: document.getElementById("btn-prev"),
    btnNext: document.getElementById("btn-next"),
    btnHint: document.getElementById("btn-hint"),
    btnRun: document.getElementById("btn-run"),
    sqlInput: document.getElementById("sql-input"),
    feedback: document.getElementById("feedback"),
    resultTable: document.getElementById("result-table"),
    resultNote: document.getElementById("result-note"),
  };

  function loadProgress() {
    try {
      var data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!data) return { completed: 0, solved: {} };
      return {
        completed: Number(data.completed) || 0,
        solved: data.solved || {},
      };
    } catch (e) {
      return { completed: 0, solved: {} };
    }
  }

  function saveProgress() {
    var count = Object.keys(solved).filter(function (k) {
      return solved[k];
    }).length;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        completed: count,
        total: CHALLENGES.length,
        solved: solved,
      })
    );
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function setFeedback(kind, text) {
    els.feedback.className = "sort-feedback " + kind;
    els.feedback.innerHTML = text;
  }

  function renderTable(result) {
    if (!result || !result.columns) {
      els.resultTable.innerHTML = "";
      return;
    }
    var html = "<thead><tr>";
    result.columns.forEach(function (col) {
      html += "<th>" + escapeHtml(col) + "</th>";
    });
    html += "</tr></thead><tbody>";
    if (!result.rows.length) {
      html +=
        '<tr><td colspan="' +
        result.columns.length +
        '"><em>0 rows</em></td></tr>';
    } else {
      result.rows.forEach(function (row) {
        html += "<tr>";
        row.forEach(function (cell) {
          html += "<td>" + escapeHtml(cell) + "</td>";
        });
        html += "</tr>";
      });
    }
    html += "</tbody>";
    els.resultTable.innerHTML = html;
    els.resultNote.textContent =
      result.rows.length +
      " row" +
      (result.rows.length === 1 ? "" : "s") +
      " in set";
  }

  function updateNav() {
    var total = CHALLENGES.length;
    var doneCount = Object.keys(solved).filter(function (k) {
      return solved[k];
    }).length;
    els.stepLabel.textContent = index + 1 + " / " + total;
    els.progressFill.style.width = ((doneCount / total) * 100).toFixed(1) + "%";
    els.btnPrev.disabled = index === 0;
    els.btnNext.disabled = !solved[CHALLENGES[index].id] || index >= total - 1;
    if (index === total - 1 && solved[CHALLENGES[index].id]) {
      els.btnNext.textContent = "Fertig";
      els.btnNext.disabled = true;
    } else {
      els.btnNext.textContent = "Weiter";
    }
  }

  function renderChallenge() {
    var ch = CHALLENGES[index];
    els.eyebrow.textContent = ch.eyebrow;
    els.title.textContent = ch.title;
    els.body.innerHTML = ch.body;
    els.moduleLabel.textContent = solved[ch.id] ? "Gelöst" : "JSON-DB abfragen";
    els.sqlInput.value = "";
    els.resultTable.innerHTML = "";
    els.resultNote.textContent = "";
    setFeedback(
      "muted",
      solved[ch.id]
        ? "Schon gelöst — du kannst trotzdem weiter experimentieren."
        : "Tippe den SQL-Befehl und tippe auf Ausführen."
    );
    updateNav();
  }

  function checkChallenge(result, sql) {
    var ch = CHALLENGES[index];
    if (ch.check) return ch.check(db, result, sql);
    if (ch.expectSql) {
      var expected = MiniSQL.runSQL(db, ch.expectSql);
      return MiniSQL.resultsEqual(result, expected);
    }
    return false;
  }

  function run() {
    var sql = els.sqlInput.value;
    try {
      var result = MiniSQL.runSQL(db, sql);
      renderTable(result);
      if (checkChallenge(result, sql)) {
        solved[CHALLENGES[index].id] = true;
        saveProgress();
        setFeedback("is-ok", "Richtig — Challenge geschafft.");
        updateNav();
      } else {
        setFeedback(
          "is-fail",
          "Query gelaufen, aber noch nicht die gesuchte Lösung. Tipp nutzen?"
        );
      }
    } catch (err) {
      els.resultTable.innerHTML = "";
      els.resultNote.textContent = "";
      setFeedback("is-fail", escapeHtml(err.message || String(err)));
    }
  }

  function go(delta) {
    var next = index + delta;
    if (next < 0 || next >= CHALLENGES.length) return;
    if (delta > 0 && !solved[CHALLENGES[index].id]) return;
    index = next;
    renderChallenge();
  }

  els.btnRun.addEventListener("click", run);
  els.btnPrev.addEventListener("click", function () {
    go(-1);
  });
  els.btnNext.addEventListener("click", function () {
    go(1);
  });
  els.btnHint.addEventListener("click", function () {
    setFeedback("muted", "Tipp: <code>" + escapeHtml(CHALLENGES[index].hint) + "</code>");
  });
  els.sqlInput.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      run();
    }
  });

  var saved = loadProgress();
  solved = saved.solved || {};
  index = 0;
  for (var i = 0; i < CHALLENGES.length; i++) {
    if (!solved[CHALLENGES[i].id]) {
      index = i;
      break;
    }
    index = i;
  }

  db = EMBEDDED_DB;
  // Optional: frische db.json nachladen, falls per HTTP verfügbar
  fetch("db.json")
    .then(function (r) {
      return r.ok ? r.json() : null;
    })
    .then(function (data) {
      if (data && data.personen) db = data;
    })
    .catch(function () {})
    .finally(function () {
      renderChallenge();
    });
})();
