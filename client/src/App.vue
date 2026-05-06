<template>
  <div class="app-root m-0 p-0 min-h-screen">

    <!-- Grain overlay -->
    <canvas ref="grainCanvas" class="grain" aria-hidden="true" />

    <!-- Glow blobs -->
    <div class="glow glow--top-left"     aria-hidden="true" />
    <div class="glow glow--top-right"    aria-hidden="true" />
    <div class="glow glow--bottom-right" aria-hidden="true" />
    <div class="glow glow--center"       aria-hidden="true" />

    <!-- Fret markers (vertical lines) -->
    <div class="frets" aria-hidden="true">
      <div v-for="f in frets" :key="f.pos" class="fret" :style="{ left: f.pos + '%', opacity: f.op }" />
    </div>

    <!-- Guitar strings -->
    <div class="strings" aria-hidden="true">
      <div
        v-for="(s, i) in strings"
        :key="i"
        class="string"
        :style="{
          top:               s.top + '%',
          height:            s.thickness + 'px',
          opacity:           s.opacity,
          animationDelay:    s.delay + 's',
          animationDuration: s.duration + 's',
        }"
      />
    </div>

    <Navbar />
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import Navbar from "./components/Navbar.vue"

const frets = [
  { pos:  8,  op: 0.012},
  { pos: 16,  op: 0.008},
  { pos: 26,  op: 0.012},
  { pos: 38,  op: 0.008},
  { pos: 52,  op: 0.012},
  { pos: 64,  op: 0.008},
  { pos: 76,  op: 0.010 },
  { pos: 88,  op: 0.008},
]

const strings = [
  { top:  9,  thickness: 1,   opacity: 0.025, delay: 0,    duration: 4.2 },
  { top: 21,  thickness: 1,   opacity: 0.018, delay: 0.6,  duration: 5.1 },
  { top: 35,  thickness: 1.5, opacity: 0.025, delay: 1.1,  duration: 4.7 },
  { top: 51,  thickness: 2,   opacity: 0.018, delay: 0.3,  duration: 6.0 },
  { top: 67,  thickness: 2.5, opacity: 0.022, delay: 0.9,  duration: 5.4 },
  { top: 82,  thickness: 3,   opacity: 0.014, delay: 1.5,  duration: 4.9 },
]

const grainCanvas = ref(null)

onMounted(() => {
  const canvas = grainCanvas.value
  const ctx    = canvas.getContext("2d")
  const W = canvas.width  = window.innerWidth
  const H = canvas.height = window.innerHeight

  const imageData = ctx.createImageData(W, H)
  const buf = imageData.data
  for (let i = 0; i < buf.length; i += 4) {
    const v = Math.random() * 255
    buf[i] = buf[i+1] = buf[i+2] = v
    buf[i+3] = 4
  }
  ctx.putImageData(imageData, 0, 0)
})
</script>

<style scoped>
.app-root {
  position: relative;
  background-color: #0a090c;
  overflow-x: hidden;
}

.grain {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  mix-blend-mode: overlay;
  opacity: 0.2;
}

.glow {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  filter: blur(130px);
}

.glow--top-left {
  width: 650px;
  height: 650px;
  top: -220px;
  left: -220px;
  background: radial-gradient(circle, rgba(200, 110, 10, 0.09) 0%, transparent 65%);
  animation: breathe 9s ease-in-out infinite;
}

.glow--top-right {
  width: 380px;
  height: 380px;
  top: -120px;
  right: 5%;
  background: radial-gradient(circle, rgba(251, 150, 20, 0.05) 0%, transparent 70%);
  animation: drift 14s ease-in-out infinite;
}

.glow--bottom-right {
  width: 700px;
  height: 700px;
  bottom: -260px;
  right: -240px;
  background: radial-gradient(circle, rgba(180, 80, 5, 0.07) 0%, transparent 65%);
  animation: breathe 12s ease-in-out infinite reverse;
}

.glow--center {
  width: 500px;
  height: 300px;
  top: 35%;
  left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(ellipse, rgba(251, 191, 36, 0.02) 0%, transparent 70%);
  animation: breathe 18s ease-in-out infinite;
  filter: blur(90px);
}

@keyframes breathe {
  0%, 100% { transform: scale(1);    opacity: 1;   }
  50%       { transform: scale(1.15); opacity: 0.7; }
}
@keyframes drift {
  0%, 100% { transform: translateY(0px)   scale(1);    opacity: 0.8; }
  50%       { transform: translateY(40px) scale(1.08); opacity: 1;   }
}

.frets {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.fret {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(251, 191, 36, 1) 25%,
    rgba(251, 191, 36, 1) 75%,
    transparent 100%
  );
}

.strings {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.string {
  position: absolute;
  left: 0;
  right: 0;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(251, 191, 36, 0.3) 15%,
    rgba(255, 220, 120, 0.4) 50%,
    rgba(251, 191, 36, 0.3) 85%,
    transparent 100%
  );
  animation: shimmer ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { opacity: 0.2; filter: brightness(1);   }
  50%       { opacity: 0.6; filter: brightness(1.1); }
}

:deep(nav),
:deep(.router-view) {
  position: relative;
  z-index: 1;
}
</style>