const tabs = document.querySelectorAll("[data-program-target]");
const panels = document.querySelectorAll("[data-program-panel]");
const printButton = document.getElementById("print-view");
const summaryTitle = document.getElementById("program-summary-title");
const summaryText = document.getElementById("program-summary-text");
const unitBadge = document.getElementById("program-unit-badge");
const fitBadge = document.getElementById("program-fit-badge");
const fitCaption = document.getElementById("program-fit-caption");
const quickReadTitle1 = document.getElementById("quick-read-title-1");
const quickReadText1 = document.getElementById("quick-read-text-1");
const quickReadTitle2 = document.getElementById("quick-read-title-2");
const quickReadText2 = document.getElementById("quick-read-text-2");
const quickReadTitle3 = document.getElementById("quick-read-title-3");
const quickReadText3 = document.getElementById("quick-read-text-3");

const programMeta = {
  cpp: {
    title: "CPP EMSET",
    units: "124 total units",
    summary:
      "Best if you want the strongest mechanical-electrical blend. Your main missing prep is physics, chemistry, statics, dynamics, materials, circuits, and graphics.",
    fitLabel: "Strong Match",
    fitClass: "fit-strong",
    fitCaption:
      "You already have a solid start for this path, but the engineering lower-division chain is still unfinished.",
    quickRead: [
      {
        title: "Transfer baseline",
        text: "You are already over the CSU 60-unit minimum and have the main admission communication courses completed.",
      },
      {
        title: "Biggest missing prep",
        text: "Your main gaps are chemistry, calculus II completion, trig-based physics, statics, dynamics, materials, circuits, and engineering graphics.",
      },
      {
        title: "Most important unlocks",
        text: "<strong>MATH 190</strong>, <strong>PHYS 201</strong>, <strong>PHYS 202</strong>, <strong>CHEM 111</strong>, and <strong>ENGR 235</strong> unlock most of the transfer-prep chain.",
      },
    ],
  },
  csulb: {
    title: "CSULB Electrical Engineering",
    units: "120 total units",
    summary:
      "Best if you want a more math-intensive and theory-heavy electrical engineering path. Your biggest gaps are PHYS 201, PHYS 202, and likely several lower-division EE core courses after transfer.",
    fitLabel: "Reach Match",
    fitClass: "fit-medium",
    fitCaption:
      "You are academically in range, but this path currently has the largest stack of unverified or still-missing lower-division major prep.",
    quickRead: [
      {
        title: "Transfer baseline",
        text: "Your GPA and completed communication courses put you in range, but CSULB EE is more selective on major-specific prep.",
      },
      {
        title: "Biggest missing prep",
        text: "The biggest near-term gaps are <strong>PHYS 201</strong>, then <strong>PHYS 202</strong>, plus likely several lower-division EE core classes after transfer.",
      },
      {
        title: "Most important unlocks",
        text: "<strong>MATH 190</strong>, <strong>PHYS 201</strong>, <strong>PHYS 202</strong>, and a verified path into the EE programming/circuits sequence matter most here.",
      },
    ],
  },
  eet: {
    title: "CSULB Electronics Engineering Technology",
    units: "120 total units",
    summary:
      "Best if you want a hands-on electronics, circuits, programming, and instrumentation path. This looks friendlier to your current transcript than CSULB EE, especially if your physics sequence aligns cleanly.",
    fitLabel: "Strong Match",
    fitClass: "fit-strong",
    fitCaption:
      "This option appears to line up well with your current preparation, though the exact physics articulation should still be confirmed.",
    quickRead: [
      {
        title: "Transfer baseline",
        text: "This path looks friendlier to your current transcript than CSULB EE, especially because you already have calculus I and the communication requirements done.",
      },
      {
        title: "Biggest missing prep",
        text: "The main open question is the exact CSULB physics mapping, especially whether your current physics work satisfies <strong>PHYS 100A</strong> and what you still need for the recommended next physics step.",
      },
      {
        title: "Most important unlocks",
        text: "A confirmed physics match, plus the first EET circuits and programming sequence, will shape how quickly you can move through the major after transfer.",
      },
    ],
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
  if (meta && summaryTitle && summaryText && unitBadge && fitBadge && fitCaption) {
    summaryTitle.textContent = meta.title;
    summaryText.textContent = meta.summary;
    unitBadge.textContent = meta.units;
    fitBadge.textContent = meta.fitLabel;
    fitBadge.className = `fit-badge ${meta.fitClass}`;
    fitCaption.textContent = meta.fitCaption;
  }

  if (
    meta &&
    meta.quickRead &&
    quickReadTitle1 &&
    quickReadText1 &&
    quickReadTitle2 &&
    quickReadText2 &&
    quickReadTitle3 &&
    quickReadText3
  ) {
    quickReadTitle1.textContent = meta.quickRead[0].title;
    quickReadText1.innerHTML = meta.quickRead[0].text;
    quickReadTitle2.textContent = meta.quickRead[1].title;
    quickReadText2.innerHTML = meta.quickRead[1].text;
    quickReadTitle3.textContent = meta.quickRead[2].title;
    quickReadText3.innerHTML = meta.quickRead[2].text;
  }
}

function getActiveProgram() {
  const activeTab = document.querySelector("[data-program-target].active");
  return activeTab ? activeTab.dataset.programTarget : "cpp";
}

function buildPrintDocument(program) {
  const meta = programMeta[program];
  const activePanel = document.querySelector(`[data-program-panel="${program}"]`);
  const transcriptSection = document.querySelector(".section:not(.overview)");
  const summarySection = document.querySelector(".program-summary-card");
  const overviewSection = document.querySelector(".overview");

  if (!meta || !activePanel) {
    return "";
  }

  const printStyles = `
    <style>
      body {
        font-family: Georgia, "Times New Roman", serif;
        color: #111;
        margin: 32px;
        line-height: 1.35;
      }
      h1, h2, h3 {
        margin: 0 0 10px;
        line-height: 1.15;
      }
      h1 { font-size: 28px; }
      h2 { font-size: 20px; margin-top: 28px; }
      h3 { font-size: 14px; }
      p { margin: 0 0 10px; }
      .meta-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin: 18px 0 22px;
      }
      .meta-card {
        border: 1px solid #ccc;
        padding: 14px;
      }
      .callout-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        margin-bottom: 20px;
      }
      .callout {
        border: 1px solid #ccc;
        padding: 12px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 12px 0 20px;
        font-size: 12px;
      }
      th, td {
        border: 1px solid #bbb;
        padding: 8px;
        vertical-align: top;
        text-align: left;
      }
      th {
        background: #f3f3f3;
      }
      .section {
        margin-bottom: 18px;
      }
      .section-kicker,
      .button,
      .print-button,
      .program-tab,
      .fit-badge,
      .inline-fit,
      .unit-badge {
        display: none !important;
      }
      @media print {
        body {
          margin: 18px;
        }
      }
    </style>
  `;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${meta.title} Print View</title>
      ${printStyles}
    </head>
    <body>
      <h1>Andrew Partida Transfer Planner</h1>
      <p><strong>Program:</strong> ${meta.title}</p>
      <p><strong>Total program size:</strong> ${meta.units}</p>
      <p><strong>Fit:</strong> ${meta.fitLabel}</p>
      <p>${meta.summary}</p>

      <div class="meta-grid">
        <div class="meta-card">
          <h3>Current assessment</h3>
          <p>${meta.fitCaption}</p>
        </div>
        <div class="meta-card">
          <h3>Transcript snapshot</h3>
          <p>Transferable units earned: 72.5</p>
          <p>Current GPA: 3.390</p>
          <p>Key in-progress course: MATH 190</p>
        </div>
      </div>

      ${overviewSection ? overviewSection.outerHTML : ""}
      ${summarySection ? summarySection.outerHTML : ""}
      ${transcriptSection ? transcriptSection.outerHTML : ""}
      ${activePanel.outerHTML}
    </body>
    </html>
  `;
}

function printSelectedProgram() {
  const program = getActiveProgram();
  const printWindow = window.open("", "_blank", "noopener,noreferrer,width=1100,height=900");

  if (!printWindow) {
    window.print();
    return;
  }

  printWindow.document.open();
  printWindow.document.write(buildPrintDocument(program));
  printWindow.document.close();
  printWindow.focus();

  const handlePrint = () => {
    printWindow.print();
  };

  if (printWindow.document.readyState === "complete") {
    handlePrint();
  } else {
    printWindow.addEventListener("load", handlePrint, { once: true });
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
    printSelectedProgram();
  });
}

setActiveProgram("cpp");
