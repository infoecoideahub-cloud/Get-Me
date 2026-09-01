/* =========================================================
   GET ME TODAY — hero sprite scrub controller
   -----------------------------------------------------------
   Frame-accurate, dependency-free interactive hero. cat-sprite.jpg
   is a 9x9 GRID of frames (1280x720 native resolution each, 73
   unique + 8 padding duplicates of the last frame to fill the
   grid), built with:

     ffmpeg -i cat.mp4 -vf "fps=12" frames/f_%04d.png
     ffmpeg -i frames/f_%04d.png -filter_complex "tile=9x9" \
            -frames:v 1 spritesheet.png

   A single horizontal strip hit JPEG's 65500px width limit at this
   resolution, hence the grid layout — same principle, two axes
   instead of one.

   Mouse position -> target frame index -> eased interpolation
   toward that index every animation frame -> background-position
   (both x and y) shifted to reveal exactly that grid cell. Nothing
   here ever moves, scales, or rotates the element itself — only
   which cell of the sprite sheet is visible changes, the same
   principle as changing a video's currentTime, just without the
   <video> element.
========================================================= */

(function () {
  const stage = document.getElementById("heroStage");
  if (!stage) return;

  const REAL_FRAME_COUNT = 73;  // unique frames (rest are padding duplicates)
  const COLS = 9;
  const ROWS = 9;

  // Build the sprite element: fills the stage, background is the
  // full grid scaled so each cell maps 1:1 to the stage's box.
  stage.innerHTML = "";
  const sprite = document.createElement("div");
  sprite.id = "catSprite";
  sprite.style.position = "absolute";
  sprite.style.inset = "0";
  sprite.style.width = "100%";
  sprite.style.height = "100%";
  sprite.style.backgroundImage = "url('assets/cat-sprite.jpg')";
  sprite.style.backgroundRepeat = "no-repeat";
  sprite.style.backgroundSize = `${COLS * 100}% ${ROWS * 100}%`;
  sprite.style.backgroundPosition = "0% 0%";
  stage.appendChild(sprite);

  // Real content analysis of all 73 frames (not guessed proportions):
  // the clip is mostly a symmetric, eyes-closed laugh loop. The ONLY
  // genuinely distinct directional pose in the footage is a downward
  // head-tilt/zoom around frame 50 — left/right/up do not have real
  // matching poses (the character never visibly turns that way), so
  // those three currently map to mild variation elsewhere in the
  // sequence rather than an actual look-direction.
  const KEY = {
    center: 0,
    left: 10,
    right: 30,
    up: 68,
    down: 50
  };

  function targetFrameFor(nx, ny) {
    // Polar mapping: angle picks the direction, radius scales how far
    // toward it we go. This makes a circular cursor sweep genuinely
    // cycle through right -> down -> left -> up -> right in order,
    // and keeps the head at "straight" near the exact center.
    const r = Math.min(1, Math.sqrt(nx * nx + ny * ny));
    if (r < 0.03) return KEY.center;

    let theta = Math.atan2(ny, nx); // screen coords: +x right, +y down
    if (theta < 0) theta += Math.PI * 2;

    const TWO_PI = Math.PI * 2;
    const stops = [
      { angle: 0,               frame: KEY.right },
      { angle: Math.PI / 2,     frame: KEY.down  },
      { angle: Math.PI,         frame: KEY.left  },
      { angle: (3 * Math.PI) / 2, frame: KEY.up  },
      { angle: TWO_PI,          frame: KEY.right }
    ];

    let angular = KEY.center;
    for (let i = 0; i < stops.length - 1; i++) {
      if (theta >= stops[i].angle && theta <= stops[i + 1].angle) {
        const span = stops[i + 1].angle - stops[i].angle;
        const frac = span === 0 ? 0 : (theta - stops[i].angle) / span;
        angular = stops[i].frame + (stops[i + 1].frame - stops[i].frame) * frac;
        break;
      }
    }

    return KEY.center + (angular - KEY.center) * r;
  }

  let rawX = 0, rawY = 0;
  let smoothX = 0, smoothY = 0;
  let currentTarget = KEY.center;
  let displayed = KEY.center;
  let lastIdx = -1;

  function setFrame(idx) {
    if (idx === lastIdx) return;
    const col = idx % COLS;
    const row = Math.floor(idx / COLS);
    const px = (col / (COLS - 1)) * 100;
    const py = (row / (ROWS - 1)) * 100;
    sprite.style.backgroundPosition = `${px}% ${py}%`;
    lastIdx = idx;
  }

  function pointerMove(clientX, clientY) {
    const rect = stage.getBoundingClientRect();
    rawX = Math.max(-1, Math.min(1, ((clientX - rect.left) / rect.width) * 2 - 1));
    rawY = Math.max(-1, Math.min(1, ((clientY - rect.top) / rect.height) * 2 - 1));
  }

  function pointerLeave() {
    rawX = 0;
    rawY = 0; // smooth return to idle pose
  }

  window.addEventListener("mousemove", (e) => pointerMove(e.clientX, e.clientY), { passive: true });
  stage.addEventListener("mouseleave", pointerLeave);
  stage.addEventListener("touchmove", (e) => {
    if (e.touches && e.touches[0]) pointerMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  stage.addEventListener("touchend", pointerLeave);

  function tick() {
    smoothX += (rawX - smoothX) * 0.08;
    smoothY += (rawY - smoothY) * 0.08;

    currentTarget = targetFrameFor(smoothX, smoothY);

    displayed += (currentTarget - displayed) * 0.07;
    if (Math.abs(displayed - currentTarget) < 0.04) displayed = currentTarget;

    const idx = Math.max(0, Math.min(REAL_FRAME_COUNT - 1, Math.round(displayed)));
    setFrame(idx);
    requestAnimationFrame(tick);
  }

  setFrame(0);
  requestAnimationFrame(tick);
})();
