# Auden: intro y U 3D interactiva

Rama local `codex/auden-logo-3d`, desde `qa` / `e5cbe41`.
Worktree `/home/jonathan/projects/auden-logo-3d`. Trabajo guardado en un commit local, sin push ni despliegue.

## Probar

Con Node 20: `npm run dev -- --host 0.0.0.0 --port 4325`.

- Repetir intro: <http://localhost:4325/es/?intro=3d>
- Ir directamente a la palabra: <http://localhost:4325/es/?intro=off>
- Inglés: <http://localhost:4325/?intro=3d>

La U permanece dentro de la palabra principal al hacer scroll; no viaja a la
cabecera. Arrastrar con ratón gira e inclina la pieza. En pantalla táctil, el
arrastre horizontal gira y el vertical conserva el scroll nativo. El giro se
conserva al soltar. Un clic o toque devuelve la orientación frontal.
El control también admite las flechas del teclado e Inicio para reiniciar.

## Entrada

Se mantiene la intro ajustada a ~2,05 segundos: pulso inline inmediato de la
silueta original y, a los ~800 ms, encaje de 1.250 ms mediante Web Animations.
La entrada no espera al modelo ni a WebGL. Three.js y GLB se descargan en paralelo;
la GPU se inicializa después del encaje y dos frames. La pieza sustituye la U
original cuando está lista mediante una mezcla de 240 ms.

La intro se muestra una vez por pestaña. `?intro=3d` fuerza su repetición.
Escape, Tab, saltar, scroll o resize permiten salir antes. El bootstrap tiene un
límite independiente de 2,8 segundos. Movimiento reducido y ahorro de datos
conservan la versión estática. Si el GLB o WebGL fallan, queda el logo original.

## Integración

- `AudenIntro.astro` / `AudenMark.astro`: entrada vectorial inmediata.
- `auden-intro.ts`: entrada, carga, control de puntero y teclado, limpieza.
- `auden-logo-scene.ts`: Three.js bajo demanda, iluminación y materiales.
- `Hero.astro`: slot, máscara de la letra, control transparente y halo naranja original.
- `Nav.astro`: mantiene el isotipo estático, independiente de la pieza principal.
- `BaseLayout.astro`: bootstrap de la entrada.
- `public/models/auden-u.glb`: modelo de Blender, 138.588 bytes.

Los PNG originales no se modifican. El slot usa la U del wordmark de 4500 × 4500:
x=1222, y=2056, width=899, height=617. La máscara solo se activa cuando el modelo
está listo. El canvas es hijo del slot: no necesita seguir el scroll con JavaScript.
Tiene buffer de 256 × 176 CSS px y DPR máximo 2. Solo se renderiza al interactuar,
redimensionar o cambiar de tema; no hay bucle de animación en reposo.

La cabecera no sustituye su imagen ni recibe un modelo flotante. Se conserva el
halo naranja de `main`. No se activa el router global de Astro ni se añade React.
El módulo 3D sigue siendo diferido y pesa ~623 KB / 157 KB gzip; Vite avisa de ello.

## Verificación de la interacción

- Build Node 20 y TypeScript de ambos módulos: correctos.
- Ratón: arrastre, orientación conservada al bajar/subir, clic para reiniciar.
- Teclado: flechas e Inicio.
- Scroll: el canvas abandona la pantalla con la palabra; no aparece en la cabecera.
- Móvil Chromium emulado 390 × 844: gestos táctiles nativos emulados con CDP,
  giro horizontal, scroll vertical y liberación de captura sin bloquear gestos.
- Sin overflow horizontal; activar movimiento reducido restaura el logo y elimina el control.
- Sin errores JavaScript de página durante estas pruebas.

Las pruebas táctiles son emuladas, no realizadas en un teléfono físico.
Las comprobaciones anteriores de GLB 404, falta de WebGL, JavaScript desactivado
y carga lenta se realizaron antes de añadir el control de arrastre.
