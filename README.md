# Josavil — portfolio personal

Portfolio personal de Jorge Sánchez Villanueva, publicado con GitHub Pages en [josavil.github.io](https://josavil.github.io/). Combina una presentación profesional con un pequeño espacio personal, inspirado en la web de principios de los 2010.

## Qué encontrarás

- **Inicio:** presentación, proyectos, experiencia, formación y enlaces.
- **Juegos:** un Sudoku con tableros generados y pistas, y una prueba de reflejos que calcula clics por minuto.
- **Taller de estilos:** paletas listas para usar y controles para probar colores personalizados. La elección se guarda localmente en el navegador.
- **Fotos:** una página de galería preparada para añadir fotos propias desde `images/gallery/`.

## Tecnologías

HTML, CSS y JavaScript, sin frameworks ni dependencias de compilación. Se puede publicar directamente como sitio estático de GitHub Pages.
- `index.html`, `games.html`, `sudoku.html` y `rpm.html` contienen las páginas.
- `css/site.css` define el tema compartido; cada página tiene además su propia hoja de estilos.
- `js/theme.js` gestiona las paletas, la personalización de colores y su persistencia local.

## Añadir fotos a la galería

Guarda versiones optimizadas de las fotos en `images/gallery/` y añade una tarjeta por foto dentro de la sección principal de `gallery.html`:

```html
<figure class="photo-card">
  <img src="images/gallery/mi-foto.webp" alt="Descripción de lo que aparece en la foto">
  <figcaption>Un pie de foto opcional</figcaption>
</figure>
```

Al añadir la primera foto, sustituye el bloque `gallery-empty` por un contenedor con clase `photo-grid` que incluya las tarjetas. Usa imágenes WebP o JPEG optimizadas y escribe un texto alternativo descriptivo para cada una.
