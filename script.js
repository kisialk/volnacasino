(function () {
  "use strict";

  function initLogoFallback() {
    document.querySelectorAll(".site-logo img").forEach(function (img) {
      var link = img.closest(".site-logo");
      if (!link) return;

      function applyFallback() {
        link.classList.add("site-logo--text");
        img.style.display = "none";
        img.setAttribute("aria-hidden", "true");
      }

      img.addEventListener("error", applyFallback);
      img.addEventListener("load", function () {
        if (img.naturalWidth === 0 || img.naturalHeight === 0) {
          applyFallback();
        }
      });

      if (img.complete && (img.naturalWidth === 0 || img.naturalHeight === 0)) {
        applyFallback();
      }
    });
  }

  function initNav() {
    var toggle = document.querySelector(".menu-toggle");
    var nav = document.querySelector(".site-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      setOpen(!nav.classList.contains("is-open"));
    });

    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("is-open")) return;
      var t = e.target;
      if (toggle.contains(t) || nav.contains(t)) return;
      setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });
  }

  function boot() {
    initLogoFallback();
    initNav();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
