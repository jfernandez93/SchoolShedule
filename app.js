const tabs = document.querySelectorAll("[data-program-target]");
const panels = document.querySelectorAll("[data-program-panel]");
const printButton = document.getElementById("print-view");
const summaryTitle = document.getElementById("program-summary-title");
const summaryText = document.getElementById("program-summary-text");
const fitBadge = document.getElementById("program-fit-badge");
const fitCaption = document.getElementById("program-fit-caption");

const programMeta = {
  cpp: {
    title: "CPP EMSET",
    summary:
      "Best if you want the strongest mechanical-electrical blend. Your main missing prep is physics, chemistry, statics, dynamics, materials, circuits, and graphics.",
    fitLabel: "Strong Match",
    fitClass: "fit-strong",
    fitCaption:
      "You already have a solid start for this path, but the engineering lower-division chain is still unfinished.",
  },
  csulb: {
    title: "CSULB Electrical Engineering",
    summary:
      "Best if you want a more math-intensive and theory-heavy electrical engineering path. Your biggest gaps are PHYS 201, PHYS 202, and likely several lower-division EE core courses after transfer.",
    fitLabel: "Reach Match",
    fitClass: "fit-medium",
    fitCaption:
      "You are academically in range, but this path currently has the largest stack of unverified or still-missing lower-division major prep.",
  },
  eet: {
    title: "CSULB Electronics Engineering Technology",
    summary:
      "Best if you want a hands-on electronics, circuits, programming, and instrumentation path. This looks friendlier to your current transcript than CSULB EE, especially if your physics sequence aligns cleanly.",
    fitLabel: "Strong Match",
    fitClass: "fit-strong",
    fitCaption:
      "This option appears to line up well with your current preparation, though the exact physics articulation should still be confirmed.",
  },
};

function setActiveProgram(program) {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.programTarget === program;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.setAttribute("tabindex", isActive ? "0" : "-1");
  });

  panels.forEach((panel) => {
    const isActive = panel.dataset.programPanel === program;
    panel.classList.toggle("active", isActive);
    panel.toggleAttribute("hidden", !isActive);
    panel.setAttribute("aria-hidden", String(!isActive));
  });

  const meta = programMeta[program];
  if (meta && summaryTitle && summaryText && fitBadge && fitCaption) {
    summaryTitle.textContent = meta.title;
    summaryText.textContent = meta.summary;
    fitBadge.textContent = meta.fitLabel;
    fitBadge.className = `fit-badge ${meta.fitClass}`;
    fitCaption.textContent = meta.fitCaption;
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setActiveProgram(tab.dataset.programTarget);
  });

  tab.addEventListener("keydown", (event) => {
    const orderedTabs = Array.from(tabs);
    const currentIndex = orderedTabs.indexOf(tab);

    if (event.key === "ArrowRight") {
      const next = orderedTabs[(currentIndex + 1) % orderedTabs.length];
      next.focus();
      setActiveProgram(next.dataset.programTarget);
    }

    if (event.key === "ArrowLeft") {
      const previous = orderedTabs[(currentIndex - 1 + orderedTabs.length) % orderedTabs.length];
      previous.focus();
      setActiveProgram(previous.dataset.programTarget);
    }
  });
});

if (printButton) {
  printButton.addEventListener("click", () => {
    window.print();
  });
}

setActiveProgram("cpp");
