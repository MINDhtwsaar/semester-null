(function () {
  "use strict";

  const lessons = window.LESSONS || [];
  let index = 0;
  let ran = false;
  let selectedOption = null;

  const els = {
    moduleLabel: document.getElementById("module-label"),
    stepLabel: document.getElementById("step-label"),
    progressFill: document.getElementById("progress-fill"),
    eyebrow: document.getElementById("task-eyebrow"),
    title: document.getElementById("task-title"),
    body: document.getElementById("task-body"),
    codeBlock: document.querySelector("#code-block code"),
    btnRun: document.getElementById("btn-run"),
    btnPrev: document.getElementById("btn-prev"),
    btnNext: document.getElementById("btn-next"),
    outputHeading: document.getElementById("output-heading"),
    outputBadge: document.getElementById("output-badge"),
    quiz: document.getElementById("quiz"),
    quizPrompt: document.getElementById("quiz-prompt"),
    quizOptions: document.getElementById("quiz-options"),
    quizFeedback: document.getElementById("quiz-feedback"),
    outputResult: document.getElementById("output-result"),
    resultCaption: document.getElementById("result-caption"),
    resultNote: document.getElementById("result-note"),
    dataTable: document.getElementById("data-table"),
  };

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /** Lightweight Python syntax coloring for display only. */
  function highlightPython(source) {
    const lines = source.split("\n");
    return lines
      .map(function (line) {
        const commentIdx = findCommentStart(line);
        let codePart = line;
        let commentPart = "";
        if (commentIdx !== -1) {
          codePart = line.slice(0, commentIdx);
          commentPart = line.slice(commentIdx);
        }

        const slots = [];
        function park(raw, cls) {
          const key = "@@@" + String.fromCharCode(65 + slots.length) + "@@@";
          slots.push('<span class="' + cls + '">' + escapeHtml(raw) + "</span>");
          return key;
        }

        let working = codePart.replace(/(["'])(?:\\.|(?!\1).)*\1/g, function (m) {
          return park(m, "tok-str");
        });

        let html = escapeHtml(working)
          .replace(
            /\b(print|for|in|len)\b/g,
            '<span class="tok-kw">$1</span>'
          )
          .replace(/\b(\d+)\b/g, '<span class="tok-num">$1</span>')
          .replace(/\[(\d+)\]/g, '[<span class="tok-idx">$1</span>]');

        slots.forEach(function (value, i) {
          const key = "@@@" + String.fromCharCode(65 + i) + "@@@";
          html = html.split(key).join(value);
        });

        if (commentPart) {
          html += '<span class="tok-cmt">' + escapeHtml(commentPart) + "</span>";
        }
        return html;
      })
      .join("\n");
  }

  function findCommentStart(line) {
    let inSingle = false;
    let inDouble = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === "'" && !inDouble) inSingle = !inSingle;
      else if (ch === '"' && !inSingle) inDouble = !inDouble;
      else if (ch === "#" && !inSingle && !inDouble) return i;
    }
    return -1;
  }

  function highlightKey(row, col) {
    return row + ":" + col;
  }

  function renderTable(result) {
    const columns = result.columns || [];
    const rows = result.rows || [];
    const highlightSet = new Set(
      (result.highlight || []).map(function (h) {
        return highlightKey(h.row, h.col);
      })
    );
    const rowHighlight = new Set(result.rowHighlight || []);

    let html = "<thead><tr>";
    columns.forEach(function (col) {
      html += "<th>" + escapeHtml(col) + "</th>";
    });
    html += "</tr></thead><tbody>";

    rows.forEach(function (row, rowIdx) {
      const rowClass = rowHighlight.has(rowIdx) ? ' class="row-highlight"' : "";
      html += "<tr" + rowClass + ">";
      row.forEach(function (cell, colIdx) {
        const classes = [];
        if (
          colIdx === 0 &&
          (columns[0] === "index" || columns[0] === "zeile" || columns[0] === "#")
        ) {
          classes.push("col-index");
        }
        if (highlightSet.has(highlightKey(rowIdx, colIdx))) {
          classes.push("cell-highlight");
        }
        const classAttr = classes.length ? ' class="' + classes.join(" ") + '"' : "";
        html += "<td" + classAttr + ">" + escapeHtml(cell) + "</td>";
      });
      html += "</tr>";
    });
    html += "</tbody>";

    els.dataTable.innerHTML = html;
    els.resultCaption.textContent = result.caption || "";
    els.resultNote.textContent = result.note || "";
    els.outputResult.classList.remove("hidden");
  }

  function renderQuiz(quiz, revealed) {
    els.quizPrompt.textContent = quiz.prompt;
    els.quizOptions.innerHTML = "";

    quiz.options.forEach(function (label, i) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-option";
      btn.setAttribute("role", "radio");
      btn.dataset.index = String(i);

      const letter = String.fromCharCode(65 + i);
      btn.innerHTML =
        '<span class="quiz-letter">' +
        letter +
        '</span><span class="quiz-label">' +
        escapeHtml(label) +
        "</span>";

      if (selectedOption === i) {
        btn.classList.add("is-selected");
        btn.setAttribute("aria-checked", "true");
      } else {
        btn.setAttribute("aria-checked", "false");
      }

      if (revealed) {
        btn.disabled = true;
        if (i === quiz.correct) {
          btn.classList.add("is-correct");
        } else if (selectedOption === i) {
          btn.classList.add("is-wrong");
        }
      } else {
        btn.addEventListener("click", function () {
          selectOption(i);
        });
      }

      els.quizOptions.appendChild(btn);
    });

    if (revealed) {
      const correctLabel = quiz.options[quiz.correct];
      const ok = selectedOption === quiz.correct;
      els.quizFeedback.classList.remove("hidden");
      els.quizFeedback.classList.toggle("is-ok", ok);
      els.quizFeedback.classList.toggle("is-fail", !ok);
      els.quizFeedback.textContent = ok
        ? "Richtig — " + correctLabel
        : "Nicht ganz — richtig ist: " + correctLabel;
    } else {
      els.quizFeedback.classList.add("hidden");
      els.quizFeedback.textContent = "";
      els.quizFeedback.classList.remove("is-ok", "is-fail");
    }
  }

  function selectOption(i) {
    if (ran) return;
    selectedOption = i;
    const lesson = lessons[index];
    renderQuiz(lesson.quiz, false);
    updateNav();
  }

  function clearResult() {
    els.outputResult.classList.add("hidden");
    els.dataTable.innerHTML = "";
    els.resultCaption.textContent = "";
    els.resultNote.textContent = "";
  }

  function updateNav() {
    const total = lessons.length;
    const current = index + 1;
    els.stepLabel.textContent = current + " / " + total;
    els.progressFill.style.width = (current / total) * 100 + "%";

    els.btnPrev.disabled = index === 0;
    els.btnNext.disabled = !ran || index >= total - 1;
    els.btnRun.disabled = ran ? false : selectedOption === null;

    if (ran) {
      els.btnRun.textContent = "Erneut ausführen";
      els.btnRun.classList.add("done");
      els.outputHeading.textContent = "Auflösung";
      els.outputBadge.textContent = "Tabelle";
    } else {
      els.btnRun.textContent = "Ausführen";
      els.btnRun.classList.remove("done");
      els.outputHeading.textContent = "Frage";
      els.outputBadge.textContent = "Multiple Choice";
    }

    if (index === total - 1 && ran) {
      els.btnNext.textContent = "Fertig";
      els.btnNext.disabled = true;
    } else {
      els.btnNext.textContent = "Weiter";
    }
  }

  function renderLesson() {
    const lesson = lessons[index];
    if (!lesson) return;

    els.moduleLabel.textContent = lesson.module;
    els.eyebrow.textContent = lesson.eyebrow;
    els.title.textContent = lesson.title;
    els.body.innerHTML = lesson.body;
    els.codeBlock.innerHTML = highlightPython(lesson.code);

    ran = false;
    selectedOption = null;
    clearResult();
    renderQuiz(lesson.quiz, false);
    updateNav();
  }

  function runLesson() {
    const lesson = lessons[index];
    if (!lesson) return;
    if (selectedOption === null) return;

    ran = true;
    renderQuiz(lesson.quiz, true);
    renderTable(lesson.result);
    updateNav();

    // Scroll result into view on smaller screens
    els.outputResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function go(delta) {
    const next = index + delta;
    if (next < 0 || next >= lessons.length) return;
    if (delta > 0 && !ran) return;
    index = next;
    renderLesson();
  }

  els.btnRun.addEventListener("click", runLesson);
  els.btnPrev.addEventListener("click", function () {
    go(-1);
  });
  els.btnNext.addEventListener("click", function () {
    go(1);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      runLesson();
    }
  });

  if (!lessons.length) {
    els.title.textContent = "Keine Aufgaben gefunden";
    els.body.textContent = "lessons.js konnte nicht geladen werden.";
    return;
  }

  renderLesson();
})();
