(() => {
  const themeTools = document.createElement("details");
  themeTools.className = "theme-tools";
  themeTools.innerHTML = `
    <summary>Diseña la página</summary>
    <div class="theme-panel" id="theme-panel">
      <h2>Taller de estilos</h2>
      <p>Elige una paleta o crea la tuya. Tu selección se guarda en este navegador. Comprueba que el texto siga siendo legible con tus colores.</p>
      <label for="theme-preset">Paleta</label>
      <select id="theme-preset">
        <option value="classic">Clásica (original)</option>
        <option value="ocean">Océano</option>
        <option value="forest">Bosque</option>
        <option value="sunset">Atardecer</option>
        <option value="night">Noche</option>
        <option value="custom">Personalizada</option>
      </select>
      <div class="theme-color-controls" id="theme-colors" hidden>
        <label for="color-background">Fondo de página<input id="color-background" type="color" data-color="page-bg"></label>
        <label for="color-surface">Paneles<input id="color-surface" type="color" data-color="paper"></label>
        <label for="color-text">Texto<input id="color-text" type="color" data-color="ink"></label>
        <label for="color-primary">Color principal<input id="color-primary" type="color" data-color="blue"></label>
        <label for="color-deep">Color principal oscuro<input id="color-deep" type="color" data-color="blue-dark"></label>
        <label for="color-highlight">Acento<input id="color-highlight" type="color" data-color="orange"></label>
        <label for="color-border">Bordes<input id="color-border" type="color" data-color="line"></label>
      </div>
      <button class="button secondary" id="theme-reset" type="button">Restaurar estilo original</button>
      <p id="theme-status" role="status" aria-live="polite"></p>
    </div>
  `;
  document.body.append(themeTools);
})();
