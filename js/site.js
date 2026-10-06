(function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.querySelectorAll(".faq button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.parentElement;
      var open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  var advice = {
    wifi: "Start with a survey. We measure the dead zones and leave a written plan before anyone buys another mesh kit.",
    outage: "Start with a stabilize visit. Stop what is falling over, then decide if the network needs a rebuild.",
    backup: "Start with a restore test. A backup that has never been restored is a hope, not a system.",
    newspace: "Start before the walls close. A prewire visit is cheaper than fishing cable through finished rooms.",
    security: "Start with a baseline: MFA, admin accounts, email filtering, and what is actually exposed. No scare deck.",
    unsure: "Start with a walkthrough. You get a written scope, not a guess from the driveway."
  };

  var planner = document.querySelector("#planner");
  var out = document.querySelector("#plan-out");
  function renderPlan() {
    if (!planner || !out) return;
    var where = planner.querySelector("[name=where]").value;
    var pain = planner.querySelector("[name=pain]").value;
    var text = advice[pain] || advice.unsure;
    if (where === "both") {
      text = "One walkthrough, two sites. The office and the house get separate networks, and one person who knows both. " + text;
    }
    out.hidden = false;
    out.querySelector("p").textContent = text;
    var href = "/contact.html?where=" + encodeURIComponent(where) + "&pain=" + encodeURIComponent(pain);
    out.querySelector("a").setAttribute("href", href);
  }
  if (planner) {
    planner.addEventListener("change", renderPlan);
    planner.addEventListener("submit", function (e) {
      e.preventDefault();
      renderPlan();
    });
  }

  var params = new URLSearchParams(location.search);
  ["where", "pain"].forEach(function (key) {
    var el = document.querySelector("form.form [name='" + key + "']");
    if (el && params.get(key)) el.value = params.get(key);
  });

  var form = document.querySelector("form.form");
  if (form) {
    form.addEventListener("submit", function (e) {
      var email = form.querySelector("[name=email]");
      var note = form.querySelector("[name=message]");
      var error = form.querySelector(".error");
      var ok = email.value.indexOf("@") > 0 && note.value.trim().length > 8;
      if (!ok) {
        e.preventDefault();
        error.textContent = "Add a real email and a few words about what is going on.";
      }
    });
  }
})();
