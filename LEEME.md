# Lista de Mercado — versión PWA (instalable)

Esta carpeta es una app instalable para **iPhone, Android y PC**, sin pasar
por App Store ni Play Store y sin necesitar ningún programa adicional.

## ¿Cómo se instala?

Necesitas que estos archivos estén servidos por **https**. Ya sabes cómo
publicarla en GitHub Pages:

1. Sube el **contenido** de esta carpeta (`index.html`, `manifest.json`,
   `sw.js`, `icons/`) a la **raíz** de tu repositorio en GitHub — no la
   carpeta `mercado-app` en sí, sino lo que hay adentro.
2. Activa GitHub Pages en Settings → Pages (branch `main`, carpeta `/root`).
3. Espera 1-2 minutos y entra a tu URL `https://tu-usuario.github.io/tu-repo/`.

Una vez la tengas en una URL https:

- **iPhone (Safari)**: abre la URL → botón compartir (el cuadrado con la
  flecha) → "Agregar a pantalla de inicio".
- **Android (Chrome)**: abre la URL → menú (⋮) → "Instalar app" o "Agregar a
  pantalla de inicio".
- **PC (Chrome/Edge)**: abre la URL → aparece un ícono de instalar en la
  barra de direcciones (o menú ⋮ → "Instalar Lista de Mercado…").

Después de instalada, abre igual que cualquier otra app: ícono propio,
pantalla completa, sin barra del navegador, y funciona sin internet gracias
al service worker (`sw.js`) — solo necesita conexión la primera vez que se
abre o se actualiza.

## Archivos

- `index.html` — la app (tu HTML original, con las etiquetas de PWA y el
  registro del service worker agregados).
- `manifest.json` — nombre, ícono y colores de la app instalada.
- `sw.js` — hace que funcione offline una vez instalada.
- `icons/` — íconos generados en los tamaños que piden iOS/Android/PC.

## Nota sobre tus datos

La app sigue guardando todo en `localStorage` del navegador/dispositivo,
igual que antes. Eso significa que **cada dispositivo tiene sus propios
datos** — no se sincronizan solos entre el iPhone, el Android y el PC. Para
pasar la información de un dispositivo a otro sigue usando los botones
"📤 Exportar datos" / "📥 Importar datos" que ya tiene la app, en la pestaña
Guardados.
