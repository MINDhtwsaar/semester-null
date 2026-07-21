(function () {
  "use strict";

  function loadProgress(key) {
    try {
      var raw = localStorage.getItem("semester-null-progress-" + key);
      if (!raw) return { completed: 0 };
      var data = JSON.parse(raw);
      return { completed: Number(data.completed) || 0 };
    } catch (e) {
      return { completed: 0 };
    }
  }

  function fillCard(card, completed, total) {
    var pct = Math.round((completed / total) * 100);
    var label = card.querySelector(".module-progress-label");
    var fill = card.querySelector(".module-progress-fill");
    var cta = card.querySelector(".module-cta");

    if (label) label.textContent = completed + " / " + total;
    if (fill) fill.style.width = pct + "%";

    if (cta && card.hasAttribute("data-progress-key")) {
      if (completed >= total) cta.textContent = "Nochmal";
      else if (completed > 0) cta.textContent = "Weiter";
      else cta.textContent = "Starten";
    }

    var title = (card.querySelector("h2") || {}).textContent || "";
    card.setAttribute(
      "aria-label",
      title + ", Fortschritt " + completed + " von " + total
    );
  }

  document.querySelectorAll(".module-card[data-progress-key]").forEach(function (card) {
    var key = card.getAttribute("data-progress-key");
    var total = Number(card.getAttribute("data-total")) || 1;
    var completed = Math.min(loadProgress(key).completed, total);
    fillCard(card, completed, total);
  });

  document.querySelectorAll(".module-card[data-chapter-progress]").forEach(function (card) {
    var activities = [];
    try {
      activities = JSON.parse(card.getAttribute("data-activities") || "[]");
    } catch (e) {
      activities = [];
    }

    var completed = 0;
    var total = 0;
    activities.forEach(function (activity) {
      var activityTotal = Number(activity.total) || 0;
      total += activityTotal;
      completed += Math.min(loadProgress(activity.key).completed, activityTotal);
    });

    if (total < 1) total = 1;
    fillCard(card, completed, total);

    var cta = card.querySelector(".module-cta");
    if (cta) {
      if (completed >= total) cta.textContent = "Nochmal öffnen";
      else if (completed > 0) cta.textContent = "Weiter";
      else cta.textContent = "Aktivitäten öffnen";
    }
  });
})();
