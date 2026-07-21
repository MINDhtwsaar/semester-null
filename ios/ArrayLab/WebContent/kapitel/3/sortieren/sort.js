(function () {
  "use strict";

  var STORAGE_KEY = "semester-null-progress-sortieren";
  var START_ARRAY = [5, 2, 8, 1, 4];

  // Große Pseudocode-Blöcke — wenige, lesbare Häppchen
  var CORRECT = ["passes", "neighbors", "result"];

  var BLOCKS = [
    {
      id: "passes",
      title: "Durchläufe",
      lines: [
        "FÜR jeden Durchlauf von vorne bis hinten",
        "    // äußere Wiederholung über das Array",
        "    … innere Schritte …",
        "ENDE FÜR",
      ],
    },
    {
      id: "neighbors",
      title: "Nachbarn vergleichen",
      lines: [
        "FÜR jedes Paar a[j] und a[j+1]",
        "    WENN a[j] > a[j+1] DANN",
        "        TAUSCHE a[j] MIT a[j+1]",
        "    ENDE WENN",
        "ENDE FÜR",
      ],
    },
    {
      id: "result",
      title: "Ergebnis",
      lines: [
        "// Nach allen Durchläufen:",
        "Array ist aufsteigend sortiert",
        "AUSGEBE a",
      ],
    },
    {
      id: "wrong-dir",
      title: "Falsche Richtung",
      lines: [
        "FÜR jedes Paar a[j] und a[j+1]",
        "    WENN a[j] < a[j+1] DANN",
        "        TAUSCHE a[j] MIT a[j+1]",
        "    ENDE WENN",
        "ENDE FÜR",
      ],
    },
    {
      id: "wrong-ends",
      title: "Nur Enden tauschen",
      lines: [
        "TAUSCHE a[0] MIT a[n-1]",
        "// einmal vertauschen reicht nicht",
      ],
    },
  ];

  var byId = {};
  BLOCKS.forEach(function (b) {
    byId[b.id] = b;
  });

  var programIds = [];
  var drag = null;

  var els = {
    palette: document.getElementById("palette"),
    program: document.getElementById("program"),
    programEmpty: document.getElementById("program-empty"),
    feedback: document.getElementById("feedback"),
    arrayViz: document.getElementById("array-viz"),
    stepsWrap: document.getElementById("steps-wrap"),
    stepsCaption: document.getElementById("steps-caption"),
    stepsTable: document.getElementById("steps-table"),
    stepsNote: document.getElementById("steps-note"),
    btnRun: document.getElementById("btn-run"),
    btnReset: document.getElementById("btn-reset"),
  };

  function shuffle(list) {
    var arr = list.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
    return arr;
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function saveSolved() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ completed: 1, total: 1 })
    );
  }

  function createBlockEl(id, from) {
    var meta = byId[id];
    var el = document.createElement("button");
    el.type = "button";
    el.className = "code-block-chip code-block-chip-lg";
    el.dataset.id = id;
    el.dataset.from = from;

    var linesHtml = meta.lines
      .map(function (line) {
        return '<div class="chip-line">' + escapeHtml(line) + "</div>";
      })
      .join("");

    el.innerHTML =
      '<span class="chip-grip" aria-hidden="true"></span>' +
      '<span class="chip-body">' +
      '<span class="chip-title">' +
      escapeHtml(meta.title) +
      "</span>" +
      '<span class="chip-code">' +
      linesHtml +
      "</span>" +
      "</span>";

    el.addEventListener("pointerdown", onPointerDown);
    return el;
  }

  function renderPalette() {
    els.palette.innerHTML = "";
    var used = {};
    programIds.forEach(function (id) {
      used[id] = true;
    });
    shuffle(
      BLOCKS.map(function (b) {
        return b.id;
      })
    ).forEach(function (id) {
      if (used[id]) return;
      els.palette.appendChild(createBlockEl(id, "palette"));
    });
  }

  function renderProgram() {
    els.program.querySelectorAll(".code-block-chip").forEach(function (n) {
      n.remove();
    });
    els.programEmpty.classList.toggle("hidden", programIds.length > 0);
    programIds.forEach(function (id, index) {
      var el = createBlockEl(id, "program");
      el.dataset.index = String(index);
      els.program.appendChild(el);
    });
  }

  function renderArray(values, highlight) {
    els.arrayViz.innerHTML = "";
    values.forEach(function (v, i) {
      var cell = document.createElement("div");
      cell.className = "array-cell";
      if (highlight && highlight.indexOf(i) !== -1) {
        cell.classList.add("is-hot");
      }
      cell.innerHTML =
        '<span class="array-idx">' +
        i +
        '</span><span class="array-val">' +
        v +
        "</span>";
      els.arrayViz.appendChild(cell);
    });
  }

  function clearOutputSoft() {
    els.stepsWrap.classList.add("hidden");
    els.stepsTable.innerHTML = "";
    els.stepsCaption.textContent = "";
    els.stepsNote.textContent = "";
    renderArray(START_ARRAY, null);
  }

  function onPointerDown(e) {
    if (e.button != null && e.button !== 0) return;
    var chip = e.currentTarget;
    var id = chip.dataset.id;
    var from = chip.dataset.from;
    var fromIndex = from === "program" ? Number(chip.dataset.index) : -1;

    var rect = chip.getBoundingClientRect();
    var ghost = chip.cloneNode(true);
    ghost.classList.add("chip-ghost");
    ghost.style.width = rect.width + "px";
    ghost.style.left = rect.left + "px";
    ghost.style.top = rect.top + "px";
    document.body.appendChild(ghost);
    chip.classList.add("is-dragging");

    drag = {
      id: id,
      from: from,
      fromIndex: fromIndex,
      ghost: ghost,
      originX: e.clientX,
      originY: e.clientY,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };

    chip.setPointerCapture(e.pointerId);
    chip.addEventListener("pointermove", onPointerMove);
    chip.addEventListener("pointerup", onPointerUp);
    chip.addEventListener("pointercancel", onPointerUp);
    e.preventDefault();
  }

  function onPointerMove(e) {
    if (!drag) return;
    drag.ghost.style.left = e.clientX - drag.offsetX + "px";
    drag.ghost.style.top = e.clientY - drag.offsetY + "px";
    els.program.classList.toggle(
      "is-drop-target",
      hit(els.program, e.clientX, e.clientY)
    );
    els.palette.classList.toggle(
      "is-drop-target",
      hit(els.palette, e.clientX, e.clientY)
    );
  }

  function hit(el, x, y) {
    var r = el.getBoundingClientRect();
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  }

  function insertIndexAtPoint(x, y) {
    var chips = els.program.querySelectorAll(".code-block-chip");
    for (var i = 0; i < chips.length; i++) {
      var r = chips[i].getBoundingClientRect();
      if (y < r.top + r.height / 2) return i;
    }
    return programIds.length;
  }

  function onPointerUp(e) {
    if (!drag) return;
    var chip = e.currentTarget;
    chip.releasePointerCapture(e.pointerId);
    chip.removeEventListener("pointermove", onPointerMove);
    chip.removeEventListener("pointerup", onPointerUp);
    chip.removeEventListener("pointercancel", onPointerUp);
    chip.classList.remove("is-dragging");

    var id = drag.id;
    var from = drag.from;
    var fromIndex = drag.fromIndex;
    var overProgram = hit(els.program, e.clientX, e.clientY);
    var overPalette = hit(els.palette, e.clientX, e.clientY);

    if (drag.ghost && drag.ghost.parentNode) {
      drag.ghost.parentNode.removeChild(drag.ghost);
    }
    els.program.classList.remove("is-drop-target");
    els.palette.classList.remove("is-drop-target");

    if (overProgram) {
      var insertAt = insertIndexAtPoint(e.clientX, e.clientY);
      if (from === "program") {
        programIds.splice(fromIndex, 1);
        if (insertAt > fromIndex) insertAt -= 1;
        programIds.splice(insertAt, 0, id);
      } else {
        programIds.splice(insertAt, 0, id);
      }
      renderProgram();
      renderPalette();
      setFeedback(
        "muted",
        "Pseudocode aktualisiert. Tippe auf Ausführen, wenn die Reihenfolge stimmt."
      );
    } else if (overPalette && from === "program") {
      programIds.splice(fromIndex, 1);
      renderProgram();
      renderPalette();
      setFeedback("muted", "Block zurück zu den Bausteinen.");
    }

    drag = null;
    clearOutputSoft();
  }

  function setFeedback(kind, text) {
    els.feedback.className = "sort-feedback " + kind;
    els.feedback.innerHTML = text;
  }

  function sequencesEqual(a, b) {
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  function bubbleSteps(input) {
    var a = input.slice();
    var steps = [];
    steps.push({ label: "Start", arr: a.slice(), hot: [] });
    var n = a.length;
    for (var i = 0; i < n - 1; i++) {
      for (var j = 0; j < n - 1 - i; j++) {
        if (a[j] > a[j + 1]) {
          var tmp = a[j];
          a[j] = a[j + 1];
          a[j + 1] = tmp;
          steps.push({
            label: "TAUSCHE a[" + j + "] ↔ a[" + (j + 1) + "]",
            arr: a.slice(),
            hot: [j, j + 1],
          });
        }
      }
    }
    steps.push({ label: "Fertig · AUSGEBE a", arr: a.slice(), hot: [] });
    return steps;
  }

  function showSteps(steps) {
    els.stepsWrap.classList.remove("hidden");
    els.stepsCaption.textContent = "> Pseudocode ausgeführt auf [5, 2, 8, 1, 4]";
    var html =
      "<thead><tr><th>#</th><th>aktion</th><th>array</th></tr></thead><tbody>";
    steps.forEach(function (step, i) {
      html +=
        "<tr><td class=\"col-index\">" +
        i +
        "</td><td>" +
        escapeHtml(step.label) +
        "</td><td>" +
        escapeHtml("[" + step.arr.join(", ") + "]") +
        "</td></tr>";
    });
    html += "</tbody>";
    els.stepsTable.innerHTML = html;
    els.stepsNote.textContent =
      "Große Blöcke, kleine Wirkung: Nachbarn tauschen, bis alles stimmt.";
  }

  function runAnimation(steps) {
    var i = 0;
    function tick() {
      if (i >= steps.length) return;
      renderArray(steps[i].arr, steps[i].hot);
      i += 1;
      if (i < steps.length) setTimeout(tick, 520);
    }
    tick();
  }

  function run() {
    if (!programIds.length) {
      setFeedback(
        "is-fail",
        "Noch kein Pseudocode — ziehe die großen Blöcke nach rechts."
      );
      return;
    }

    if (!sequencesEqual(programIds, CORRECT)) {
      setFeedback(
        "is-fail",
        "Reihenfolge noch nicht stimmig. Tipp: erst Durchläufe, dann Nachbarn vergleichen, dann Ergebnis."
      );
      clearOutputSoft();
      return;
    }

    saveSolved();
    setFeedback(
      "is-ok",
      "Stimmt — das ist Bubblesort als Pseudocode. Rechts siehst du die Wirkung."
    );
    var steps = bubbleSteps(START_ARRAY);
    showSteps(steps);
    runAnimation(steps);
  }

  function reset() {
    programIds = [];
    renderProgram();
    renderPalette();
    setFeedback(
      "muted",
      "Lege zuerst den Pseudocode links, dann <strong>Ausführen</strong>."
    );
    clearOutputSoft();
  }

  els.btnRun.addEventListener("click", run);
  els.btnReset.addEventListener("click", reset);

  reset();
})();
