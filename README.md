# Josavil — portfolio personal

Portfolio personal de Jorge Sánchez Villanueva, publicado con GitHub Pages en [josavil.github.io](https://josavil.github.io/). Combina una presentación profesional con un pequeño espacio personal, inspirado en la web de principios de los 2010.

## Qué encontrarás

- **Inicio:** presentación, proyectos, experiencia, formación y enlaces.
- **Juegos:** un Sudoku con tableros generados y pistas, y una prueba de reflejos que calcula clics por minuto.
- **Taller de estilos:** paletas listas para usar y controles para probar colores personalizados. La elección se guarda localmente en el navegador.
- **Fotos:** una página de galería preparada para añadir fotos propias desde `images/gallery/`.

## Tecnologías

HTML, CSS y JavaScript, sin frameworks ni dependencias de compilación. Se puede publicar directamente como sitio estático de GitHub Pages.
- `index.html`, `games.html`, `sudoku.html`, `rpm.html` y `gallery.html` contienen las páginas.
- `css/site.css` define el tema compartido; cada página tiene además su propia hoja de estilos.
- `js/theme-tools.js` inserta el panel compartido del taller; `js/theme.js` gestiona las paletas, la personalización de colores y su persistencia local.

## Añadir fotos a la galería

Añade las fotos originales directamente a `images/gallery/` y ejecuta:

```sh
python3 scripts/build-gallery.py
```

El script genera WebP optimizados (máximo 1800 px), miniaturas (480 × 360 px) y actualiza `images/gallery/manifest.json`. La página y la vista previa de Inicio leen ese índice automáticamente; no hace falta editar el HTML ni anotar cada foto. Sube al repositorio las fotos nuevas y los archivos generados. Usa nombres descriptivos, porque el nombre se muestra como pie de foto y texto alternativo. Para previsualizar localmente, sirve el sitio con un servidor HTTP (por ejemplo, `python3 -m http.server`) en lugar de abrir la página como `file://`.
