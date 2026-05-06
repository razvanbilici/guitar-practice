<template>
  <main class="px-8 py-8 max-w-screen-xl mx-auto">

    <!-- Section toggle header -->
    <div
      class="flex items-center gap-3 cursor-pointer w-fit select-none group mb-2"
      @click="open_scales_panel = !open_scales_panel"
    >
      <h1 class="text-xl font-semibold text-white tracking-tight group-hover:text-amber-400 transition-colors duration-200">
        Scales
      </h1>
      <Icon
        :icon="open_scales_panel ? 'material-symbols:keyboard-arrow-up' : 'material-symbols:keyboard-arrow-down'"
        width="20"
        class="text-white/30 group-hover:text-amber-400/60 transition-all duration-200"
      />
      <span class="text-xs text-white/25">
        {{ open_scales_panel ? 'collapse' : 'expand' }}
      </span>
    </div>

    <!-- Panel -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-[2000px]"
      leave-from-class="opacity-100 max-h-[2000px]"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-if="open_scales_panel" class="flex flex-col gap-8 mt-6 overflow-hidden">

        <div v-for="scale in scales" :key="scale.key" class="flex flex-col gap-3">

          <!-- Key label -->
          <span class="text-xs font-semibold uppercase tracking-widest text-white/30">
            Key of {{ scale.key }}
          </span>

          <!-- Mode cards -->
          <div class="flex flex-row flex-wrap gap-3">
            <div
              v-for="mode in scale.modes"
              :key="mode.name"
              class="flex flex-col gap-1 px-5 py-4 rounded-xl border border-white/[0.07] bg-white/[0.03]
                     hover:border-amber-400/30 hover:bg-amber-400/[0.04] transition-all duration-200 cursor-default
                     w-[180px]"
            >
              <span class="text-sm font-semibold text-white">{{ mode.name }}</span>
              <p class="text-xs text-white/40 leading-snug">{{ mode.desc }}</p>
            </div>
          </div>

        </div>

      </div>
    </Transition>

  </main>
</template>

<script setup>
import { ref } from "vue"
import { Icon } from "@iconify/vue"

const open_scales_panel = ref(false)
const scales = ref([
  {
    key: "A",
    modes: [
      { name: "Minor", desc: "Minor" },
      { name: "Minor Harmonic", desc: "Middle-Eastern" }
    ]
  },
  {
    key: "E",
    modes: [
      { name: "Minor", desc: "Minor" }
    ]
  },
  {
    key: "Others",
    modes: [
      { name: "Blues", desc: "Bluesy" },
      { name: "Pentatonic", desc: "Easy" }
    ]
  }
])
</script>