const tabs = document.querySelectorAll("[data-program-target]");
const panels = document.querySelectorAll("[data-program-panel]");

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

setActiveProgram("cpp");
