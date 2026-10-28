(() => {
  const gallery = document.querySelector("#gallery-content");
  const imageExtensions = new Set(["jpg", "jpeg", "png", "webp", "gif", "avif"]);
  const apiUrl = "https://api.github.com/repos/Josavil/Josavil.github.io/contents/images/gallery?ref=main";

  function showMessage(title, description, isError = false) {
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
      retry.addEventListener("click", loadGallery);
      section.append(retry);
    } else {
      const link = document.createElement("a");
      link.href = "index.html";
      link.textContent = "Volver a Inicio";
      section.append(link);
    }

    gallery.replaceChildren(section);
  }

  function createPhotoCard(file) {
    const figure = document.createElement("figure");
    figure.className = "photo-card";

    const image = document.createElement("img");
    const encodedPath = file.path.split("/").map(encodeURIComponent).join("/");
    image.src = new URL(encodedPath, document.baseURI).href;
    const title = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
    image.alt = title;
    image.loading = "lazy";
    image.decoding = "async";

    const caption = document.createElement("figcaption");
    caption.textContent = title;

    figure.append(image, caption);
    return figure;
  }

  async function loadGallery() {
    gallery.innerHTML = '<p class="gallery-loading">Cargando fotos…</p>';

    try {
      const response = await fetch(apiUrl, {
        headers: { Accept: "application/vnd.github+json" }
      });
      if (!response.ok) {
        throw new Error(`GitHub respondió con estado ${response.status}`);
      }

      const files = await response.json();
      const photos = files
        .filter((file) => file.type === "file" && imageExtensions.has(file.name.split(".").pop().toLowerCase()))
        .sort((first, second) => first.name.localeCompare(second.name, "es"));

      if (photos.length === 0) {
        showMessage("La galería está preparando su primera foto", "Añade imágenes JPG, PNG, WebP, GIF o AVIF a images/gallery/.");
        return;
      }

      const grid = document.createElement("section");
      grid.className = "photo-grid";
      grid.setAttribute("aria-label", "Galería de fotos");
      photos.forEach((photo) => grid.append(createPhotoCard(photo)));
      gallery.replaceChildren(grid);
    } catch (error) {
      console.error("No se pudieron cargar las fotos de la galería.", error);
      showMessage("No se pudieron cargar las fotos", "Comprueba tu conexión e inténtalo de nuevo. La galería obtiene su lista de imágenes desde GitHub.", true);
    }
  }

  loadGallery();
})();
