<template>
  <main class="flex flex-col ml-4 text-[10vh] text-yellow-500">

    <div>
      <!-- Toggle -->
       <div class="flex flex-row items-center gap-2 cursor-pointer w-fit " @click="open_scales_panel = !open_scales_panel">
      <span
        class="font-pcb text-outline hover:text-gray-200 transition-all duration-300 ease-in-out"
      >
        Scales
      </span>
      <p class="text-sm text-gray-400">
  {{ open_scales_panel ? 'click to collapse' : 'click to expand' }}
</p>
      </div>

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
            <span class="font-extrabold text-outline">{{ scale.key }}</span>

            <div class="flex flex-row gap-x-3">

              <!-- Card -->
              <div
                v-for="mode in scale.modes"
                :key="mode.name"
                class="flex flex-col m-4 p-4 bg-yellow-500 text-white
                       w-[50vh] shadow-2xl rounded-xl
                       hover:scale-105 transition-all font-extrabold text-outline"
              >
                <span>{{ mode.name }}</span>

                <p class="text-[3vh] font-light">
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