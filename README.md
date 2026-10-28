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

Guarda versiones optimizadas de las fotos en `images/gallery/` y súbelas al repositorio. La página de galería detecta automáticamente los archivos JPG, PNG, WebP, GIF y AVIF de esa carpeta mediante la API de GitHub; no hace falta editar el HTML. Los nombres de archivo se usan como pie de foto y texto alternativo, así que conviene usar nombres descriptivos en lugar de nombres de cámara. La galería requiere conexión a internet y que el repositorio sea público para consultar la lista.
