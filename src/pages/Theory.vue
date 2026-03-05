<template>
  <main class="flex flex-col ml-4 text-[10vh] font-pcb text-outline text-white">

    <div>
      <!-- Toggle -->
      <span
        class="cursor-pointer"
        @click="open_scales_panel = !open_scales_panel"
      >
        Scales
      </span>

      <!-- Transition Wrapper -->
      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        leave-active-class="transition-all duration-300 ease-in"
        enter-from-class="opacity-0 max-h-0 scale-95"
        enter-to-class="opacity-100 max-h-[2000px] scale-100"
        leave-from-class="opacity-100 max-h-[2000px] scale-100"
        leave-to-class="opacity-0 max-h-0 scale-95"
      >
        <!-- Panel -->
        <div
          v-if="open_scales_panel"
          class="flex flex-col gap-y-10 text-[5vh] overflow-hidden"
        >
          <div
            v-for="scale in scales"
            :key="scale.key"
            class="flex flex-col"
          >
            <span>{{ scale.key }}</span>

            <div class="flex flex-row gap-x-3">

              <!-- Card -->
              <div
                v-for="mode in scale.modes"
                :key="mode.name"
                class="flex flex-col m-4 p-4 bg-amber-500
                       w-[50vh] shadow-2xl rounded-xl
                       hover:scale-105 transition"
              >
                <span>{{ mode.name }}</span>

                <p class="text-[5vh]">
                  {{ mode.desc }}
                </p>

              </div>

            </div>

          </div>
        </div>
      </Transition>

    </div>

  </main>
</template>


<script setup>

import {ref} from "vue"

const open_scales_panel = ref(false)
const scales = ref(
    [ {
        key: "A",
        modes: [{name: "Minor", desc: "Minor"}, 
                {name: "Minor Harmonic", desc: "Middle-Eastern"}]
        
    },

    {
        key: "E",
        modes: [{name: "Minor", desc: "Minor"}]
        
    },

    {
        key: "Others",
        modes: [{name: "Blues", desc: "Bluesy"},
                {name: "Pentatonic", desc: "Easy"}
        ]
    }

    ]
)


</script>