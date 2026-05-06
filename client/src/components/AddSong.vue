<script setup>
import { ref } from "vue";

const url = ref("");
const props = defineProps({
  playlist: Object,
});

const emit = defineEmits(["close_modal", "add_song"]);

const closeModal = () => {
  emit("close_modal");
};

function addSong() {
  emit("add_song", url.value);
}
</script>

<template>
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-100">
    <div class="bg-[#141416] border border-white/[0.08] rounded-2xl shadow-2xl w-[420px] flex flex-col gap-6 p-7">

      <div class="flex flex-col gap-1">
        <h2 class="text-base font-semibold text-white">Add to <span class="text-amber-400">{{ playlist.name }}</span></h2>
        <p class="text-xs text-white/35">Paste a YouTube link or video ID below.</p>
      </div>

      <form @submit.prevent class="flex flex-col gap-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium uppercase tracking-widest text-white/25">
            YouTube Link
          </label>
          <input
            v-model="url"
            type="text"
            placeholder="https://www.youtube.com/watch?v=…"
            class="w-full px-4 py-2.5 rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/80 text-sm placeholder:text-white/20 focus:outline-none focus:border-amber-400/40 focus:bg-white/[0.06] transition-all duration-200"
          />
        </div>

        <div class="flex gap-2 mt-1">
          <button
            type="button"
            @click="closeModal"
            class="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-white/50 border border-white/[0.08] hover:border-white/20 hover:text-white/80 transition-all duration-150 active:scale-95 cursor-pointer"
          >
            Cancel
          </button>

          <button
            @click="addSong"
            class="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-[#0d0d0f] bg-amber-400 hover:bg-amber-300 transition-all duration-150 active:scale-95 cursor-pointer shadow-lg shadow-amber-400/20"
          >
            Add Song
          </button>
        </div>
      </form>

    </div>
  </div>
</template>