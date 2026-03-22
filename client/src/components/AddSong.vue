<script setup>
import { ref } from "vue";

const url = ref("");
const props = defineProps({
  playlist: Object,
});

const emit = defineEmits(["close_modal", "add_song"]);

const closeModal = () => {
  emit("close_modal"); // Shouting "close!" to the parent
};


function addSong() {

  emit("add_song", url.value);
}
</script>
<template>
  <div
    class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-100"
  >
    <div
      class="bg-white p-8 rounded-2xl shadow-2xl w-[40vw] flex flex-col gap-6"
    >
      <div class="flex flex-col gap-1">
        <h2 class="text-2xl font-bold text-gray-800">
          Add to {{ playlist.name }}
        </h2>
        <p class="text-gray-500 text-sm">Paste a YouTube link or ID below.</p>
      </div>

      <form @submit.prevent class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label
            class="text-xs font-semibold uppercase tracking-wider text-gray-400 ml-1"
          >
            YouTube Link
          </label>
          <input
            v-model="url"
            type="text"
            placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 bg-gray-50"
          />
        </div>

        <div class="flex gap-3 mt-2">
          <button
            type="button"
            @click="closeModal"
            class="flex-1 px-4 py-3 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-300 active:scale-95 transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            @click="addSong"
            class="flex-1 px-4 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-300 active:scale-95 transition-all cursor-pointer"
          >
            Add Song
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
