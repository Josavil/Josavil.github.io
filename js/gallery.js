(() => {
  const gallery = document.querySelector("#gallery-content");
  const preview = document.querySelector("#gallery-preview");
  if (!gallery && !preview) return;

  function showMessage(container, title, description, isError = false) {
    if (!container) return;

    const section = document.createElement("section");
    section.className = "gallery-empty";
    section.setAttribute("aria-labelledby", "gallery-empty-title");

    const mark = document.createElement("span");
    mark.className = "gallery-mark";
    mark.setAttribute("aria-hidden", "true");
    mark.textContent = isError ? "!" : "📷";

    const heading = document.createElement("h2");
    heading.id = "gallery-empty-title";
    heading.textContent = title;

    const message = document.createElement("p");
    message.textContent = description;
    section.append(mark, heading, message);

    if (isError) {
      const retry = document.createElement("button");
      retry.className = "button secondary";
      retry.type = "button";
      retry.textContent = "Intentar de nuevo";
      retry.addEventListener("click", () => void loadGallery());
      section.append(retry);
    } else {
      const link = document.createElement("a");
      link.href = "index.html";
      link.textContent = "Volver a Inicio";
      section.append(link);
    }

    container.replaceChildren(section);
  }

  function createPhotoCard(photo) {
    const figure = document.createElement("figure");
    figure.className = "photo-card";

    const link = document.createElement("a");
    link.href = photo.image;
    link.target = "_blank";
    link.rel = "noopener";
    link.setAttribute("aria-label", `Abrir foto: ${photo.title}`);

    const image = document.createElement("img");
    image.src = photo.thumbnail;
    image.alt = photo.title;
    image.loading = "lazy";
    image.decoding = "async";

    const caption = document.createElement("figcaption");
    caption.textContent = photo.title;

    link.append(image);
    figure.append(link, caption);
    return figure;
  }

  function renderPreview(photos) {
    if (!preview) return;
    if (photos.length === 0) {
      const message = document.createElement("p");
      message.className = "gallery-loading";
      message.textContent = "Añade fotos a images/gallery/ para verlas aquí.";
      preview.replaceChildren(message);
      return;
    }

    const fragment = document.createDocumentFragment();
    photos.slice(0, 3).forEach((photo) => {
      const link = document.createElement("a");
      link.href = "gallery.html";
      link.setAttribute("aria-label", `Ver galería: ${photo.title}`);

      const image = document.createElement("img");
      image.src = photo.thumbnail;
      image.alt = photo.title;
      image.width = 480;
      image.height = 360;
      image.decoding = "async";

      link.append(image);
      fragment.append(link);
    });
    preview.replaceChildren(fragment);
  }

  async function loadGallery() {
    if (gallery) gallery.innerHTML = '<p class="gallery-loading">Cargando fotos…</p>';
    if (preview) preview.innerHTML = '<p class="gallery-loading">Cargando fotos…</p>';

    try {
      const response = await fetch("images/gallery/manifest.json", { cache: "no-cache" });
      if (!response.ok) {
        showLoadError(new Error(`No se pudo leer el índice de fotos (HTTP ${response.status}).`));
        return;
      }

      const photos = await response.json();
      if (!Array.isArray(photos) || photos.some((photo) =>
        typeof photo.title !== "string" ||
        typeof photo.image !== "string" ||
        typeof photo.thumbnail !== "string"
      )) {
        showLoadError(new Error("El índice de fotos tiene un formato no válido."));
        return;
      }

      if (gallery) {
        if (photos.length === 0) {
          showMessage(gallery, "La galería está preparando su primera foto", "Añade imágenes a images/gallery/ y genera el índice.");
        } else {
          const grid = document.createElement("section");
          grid.className = "photo-grid";
          grid.setAttribute("aria-label", "Galería de fotos");
          photos.forEach((photo) => grid.append(createPhotoCard(photo)));
          gallery.replaceChildren(grid);
        }
      }

      renderPreview(photos);
    } catch (error) {
      showLoadError(error);
    }
  }

  function showLoadError(error) {
    console.error("No se pudieron cargar las fotos de la galería.", error);
    showMessage(gallery, "No se pudieron cargar las fotos", "Comprueba que se haya generado images/gallery/manifest.json y vuelve a intentarlo.", true);
    if (preview) {
      const message = document.createElement("p");
      message.className = "gallery-loading";
      message.textContent = "No se pudieron cargar las fotos.";
      preview.replaceChildren(message);
    }
  }

  void loadGallery();
})();
