(() => {
  const storageKey = "josavil-site-style-v1";
  const colorInputs = [...document.querySelectorAll("[data-color]")];
  const presetSelect = document.querySelector("#theme-preset");
  const colorControls = document.querySelector("#theme-colors");
  const status = document.querySelector("#theme-status");
  const resetButton = document.querySelector("#theme-reset");
  const root = document.documentElement;
  const customProperties = {
    "page-bg": "--page-bg",
    paper: "--paper",
    ink: "--ink",
    blue: "--blue",
    "blue-dark": "--blue-dark",
    orange: "--orange",
    line: "--line"
  };
  const colorNames = Object.keys(customProperties);
  const colors = {
    classic: {
      "page-bg": "#e8eff1", "page-pattern": "#c9d7dc", ink: "#263648", muted: "#647387",
      blue: "#176a9b", "blue-dark": "#104c73", paper: "#fffdf6", line: "#c9d6df", orange: "#e7833b",
      "header-start": "#227eaa", "header-mid": "#145277", "header-end": "#103f5d",
      "header-text": "#e6f4fb", "header-subtext": "#edf8ff",
      "action-start": "#2785b1", "action-end": "#17628c", "action-hover-start": "#e99555", "action-hover-end": "#d86f2a",
      "soft-surface": "#f0f7fa", "soft-border": "#cbdce5", "card-shadow": "#dce5e8",
      "tag-surface": "#edf4f6", "tag-text": "#435b69",
      "status-surface": "#e8f5df", "status-text": "#35622b", "status-border": "#c6dfb4",
      "grid-line": "#cbd8de", "grid-strong": "#657f8e", "error-surface": "#fff0ed",
      "error-text": "#a12525", "hint-surface": "#e8f5ff"
    },
    ocean: {
      "page-bg": "#e3f1f5", "page-pattern": "#b6d2dc", ink: "#203746", muted: "#55707e",
      blue: "#087e8b", "blue-dark": "#07535e", paper: "#f8feff", line: "#b6d2dc", orange: "#f29e4c",
      "header-start": "#1593a0", "header-mid": "#08717d", "header-end": "#064b57",
      "header-text": "#e9fcff", "header-subtext": "#e6faff",
      "action-start": "#11909d", "action-end": "#08616d", "action-hover-start": "#f4a64e", "action-hover-end": "#d96d38",
      "soft-surface": "#eaf7fa", "soft-border": "#c0dce4", "card-shadow": "#c8dfe5",
      "tag-surface": "#e7f4f6", "tag-text": "#345b64",
      "status-surface": "#e4f3df", "status-text": "#35622b", "status-border": "#bfd9b2",
      "grid-line": "#c2dce2", "grid-strong": "#547d86", "error-surface": "#fff0ed",
      "error-text": "#a12525", "hint-surface": "#e5f7fa"
    },
    forest: {
      "page-bg": "#e8efe5", "page-pattern": "#c6d3bf", ink: "#2b382d", muted: "#657566",
      blue: "#477a45", "blue-dark": "#2c5130", paper: "#fffef8", line: "#c6d3bf", orange: "#d58b45",
      "header-start": "#638d50", "header-mid": "#426d3d", "header-end": "#2c4d31",
      "header-text": "#f0f8e9", "header-subtext": "#eff8e9",
      "action-start": "#678d4b", "action-end": "#3e6738", "action-hover-start": "#d9974d", "action-hover-end": "#ae6235",
      "soft-surface": "#f0f5eb", "soft-border": "#cbd8c2", "card-shadow": "#d6dfcf",
      "tag-surface": "#eff4e9", "tag-text": "#435840",
      "status-surface": "#e5f1df", "status-text": "#35622b", "status-border": "#bfd5b3",
      "grid-line": "#cbd7c4", "grid-strong": "#71836b", "error-surface": "#fff0ed",
      "error-text": "#a12525", "hint-surface": "#eef5e5"
    },
    sunset: {
      "page-bg": "#f3e8e2", "page-pattern": "#ddc2b5", ink: "#3d3035", muted: "#79656b",
      blue: "#9b5263", "blue-dark": "#633344", paper: "#fffaf5", line: "#ddc2b5", orange: "#df8050",
      "header-start": "#b86a62", "header-mid": "#854653", "header-end": "#573345",
      "header-text": "#fff0e9", "header-subtext": "#fff0e9",
      "action-start": "#b56661", "action-end": "#814452", "action-hover-start": "#e49959", "action-hover-end": "#bd5e46",
      "soft-surface": "#f8eee8", "soft-border": "#e3c9bc", "card-shadow": "#e6d1c7",
      "tag-surface": "#f5e9e3", "tag-text": "#674850",
      "status-surface": "#e8f1df", "status-text": "#42603b", "status-border": "#c9d9b8",
      "grid-line": "#ddc7be", "grid-strong": "#8f6c68", "error-surface": "#fff0ed",
      "error-text": "#a12525", "hint-surface": "#f8e9e6"
    },
    night: {
      "page-bg": "#17232d", "page-pattern": "#344653", ink: "#e8eef2", muted: "#b4c1c9",
      blue: "#75c9e8", "blue-dark": "#a1ddf1", paper: "#24333e", line: "#465966", orange: "#ffb36b",
      "header-start": "#31576b", "header-mid": "#243f51", "header-end": "#192d3a",
      "header-text": "#f0f7fa", "header-subtext": "#e0f0f6",
      "action-start": "#287c9f", "action-end": "#1e536e", "action-hover-start": "#bd7040", "action-hover-end": "#8e4a36",
      "soft-surface": "#2d3f4b", "soft-border": "#506571", "card-shadow": "#111b22",
      "tag-surface": "#344752", "tag-text": "#d4e4eb",
      "status-surface": "#334739", "status-text": "#c3e3b2", "status-border": "#536d54",
      "grid-line": "#465966", "grid-strong": "#8298a4", "error-surface": "#513536",
      "error-text": "#ffb3a9", "hint-surface": "#314c5b"
    }
  };
  Object.values(colors).forEach((palette) => {
    palette["footer-surface"] ||= palette["soft-surface"];
    palette["footer-text"] ||= palette.muted;
    palette["nav-surface"] ||= palette["soft-surface"];
    palette["nav-hover-shadow"] ||= "#26364812";
    palette["header-decoration"] ||= "#ffffff16";
    palette["card-white"] ||= palette.paper;
    palette["tag-border"] ||= palette.line;
  });
  let selectedPreset = "classic";
  let customBasePreset = "classic";
  let customColors = {};
  let storageAvailable = true;

  function applyPalette(palette) {
    Object.entries(palette).forEach(([name, value]) => {
      root.style.setProperty(`--${name}`, value);
    });
  }

  function updateInputs() {
    colorInputs.forEach((input) => {
      const property = customProperties[input.dataset.color];
      input.value = getComputedStyle(root).getPropertyValue(property).trim();
    });
  }

  function saveSettings() {
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        preset: selectedPreset,
        customBasePreset,
        custom: customColors
      }));
      status.textContent = "Estilo guardado en este navegador.";
    } catch {
      storageAvailable = false;
      status.textContent = "El estilo se aplica, pero el navegador no permite guardarlo.";
    }
  }

  function captureCurrentColors() {
    customBasePreset = selectedPreset === "custom" ? customBasePreset : selectedPreset;
    const computed = getComputedStyle(root);
    colorNames.forEach((name) => {
      customColors[name] = computed.getPropertyValue(customProperties[name]).trim();
    });
  }

  function applyCustomColors() {
    const palette = colors[customBasePreset] || colors.classic;
    Object.entries(customColors).forEach(([name, value]) => {
      root.style.setProperty(customProperties[name], value);
    });

    root.style.setProperty("--page-pattern", customColors.line || palette["page-pattern"]);
    root.style.setProperty("--header-start", customColors.blue || palette["header-start"]);
    root.style.setProperty("--header-mid", customColors["blue-dark"] || palette["header-mid"]);
    root.style.setProperty("--header-end", customColors["blue-dark"] || palette["header-end"]);
    root.style.setProperty("--action-start", customColors.blue || palette["action-start"]);
    root.style.setProperty("--action-end", customColors["blue-dark"] || palette["action-end"]);
    root.style.setProperty("--action-hover-start", customColors.orange || palette["action-hover-start"]);
    root.style.setProperty("--soft-surface", customColors.paper || palette["soft-surface"]);
    root.style.setProperty("--soft-border", customColors.line || palette["soft-border"]);
    root.style.setProperty("--card-shadow", customColors.line || palette["card-shadow"]);
    root.style.setProperty("--grid-line", customColors.line || palette["grid-line"]);
    root.style.setProperty("--grid-strong", customColors["blue-dark"] || palette["grid-strong"]);
    root.style.setProperty("--tag-surface", customColors.paper || palette["tag-surface"]);
    root.style.setProperty("--tag-border", customColors.line || palette["tag-border"]);
    root.style.setProperty("--tag-text", customColors.ink || palette["tag-text"]);
    root.style.setProperty("--card-white", customColors.paper || palette.paper);
    root.style.setProperty("--footer-surface", customColors.paper || palette["footer-surface"]);
    root.style.setProperty("--footer-text", customColors.ink || palette["footer-text"]);
    root.style.setProperty("--nav-surface", customColors.paper || palette["nav-surface"]);
    root.style.setProperty("--header-decoration", "#ffffff16");
    root.style.setProperty("--action-hover-end", customColors["blue-dark"] || palette["action-hover-end"]);
    root.style.setProperty("--muted", customColors.ink || palette.muted);
    const headerText = readableText(customColors.blue || palette.blue);
    root.style.setProperty("--header-text", headerText);
    root.style.setProperty("--header-subtext", headerText);
    colorControls.hidden = false;
    updateInputs();
  }

  function readableText(hexColor) {
    const channels = hexColor.slice(1).match(/.{2}/g).map((channel) => parseInt(channel, 16) / 255);
    const luminance = channels
      .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
      .reduce((total, channel, index) => total + channel * [0.2126, 0.7152, 0.0722][index], 0);
    return luminance > 0.42 ? "#10212c" : "#ffffff";
  }

  function choosePreset(preset, shouldSave = true) {
    if (preset === "custom" && selectedPreset !== "custom" && colorNames.some((name) => !customColors[name])) {
      captureCurrentColors();
    }
    selectedPreset = preset;
    presetSelect.value = preset;

    if (preset === "custom") {
      applyPalette(colors[customBasePreset] || colors.classic);
      applyCustomColors();
    } else {
      applyPalette(colors[preset]);
      colorControls.hidden = true;
    }

    if (shouldSave) saveSettings();
  }

  function loadSettings() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (!saved) return;

      if (saved.preset === "custom" || Object.hasOwn(colors, saved.preset)) selectedPreset = saved.preset;
      if (saved.preset === "custom" && saved.custom && typeof saved.custom === "object") {
        if (Object.hasOwn(colors, saved.customBasePreset)) customBasePreset = saved.customBasePreset;
        Object.entries(customProperties).forEach(([name]) => {
          const value = saved.custom[name];
          if (typeof value === "string" && /^#[\da-f]{6}$/i.test(value)) customColors[name] = value;
        });
      }
    } catch {
      storageAvailable = false;
      status.textContent = "No se pudieron cargar las preferencias de estilo.";
    }
  }

  presetSelect.addEventListener("change", () => choosePreset(presetSelect.value));

  colorInputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (selectedPreset !== "custom") captureCurrentColors();
      selectedPreset = "custom";
      presetSelect.value = "custom";
      colorControls.hidden = false;
      customColors[input.dataset.color] = input.value;
      applyCustomColors();
      saveSettings();
    });
  });

  resetButton.addEventListener("click", () => {
    customColors = {};
    customBasePreset = "classic";
    selectedPreset = "classic";
    choosePreset("classic");
    status.textContent = storageAvailable
      ? "Estilo original restaurado."
      : "Estilo original restaurado en esta página.";
  });

  loadSettings();
  choosePreset(selectedPreset, false);
  if (!storageAvailable && !status.textContent) {
    status.textContent = "Las preferencias solo durarán mientras esta página esté abierta.";
  }
})();
