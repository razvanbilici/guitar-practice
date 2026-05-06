<script setup>
import { ref } from "vue"

const playlist_name = ref("")

const emit = defineEmits(['close_modal', 'add_playlist'])

const closeModal = () => {
  emit('close_modal')
}

const addPlaylist = () => {
  emit('add_playlist', playlist_name.value)
  alert(playlist_name.value)
}
</script>

<template>
  <main class="fixed inset-0 flex items-center justify-center z-100">

    <div class="modal-panel relative w-[90vw] max-w-sm flex flex-col gap-5 px-7 py-6
                bg-[#16151a] border border-white/[0.08] rounded-xl
                shadow-[0_0_0_1px_rgba(251,191,36,0.06),0_24px_60px_rgba(0,0,0,0.7)]">

      <div class="absolute top-0 left-8 right-8 h-px
                  bg-linear-to-r from-transparent via-amber-400/40 to-transparent
                  rounded-full pointer-events-none" />

      <!-- Header -->
      <div class="flex flex-col gap-0.5">
        <h2 class="text-sm font-semibold tracking-widest uppercase text-amber-400/80">
          New Playlist
        </h2>
        <p class="text-xs text-white/25 tracking-wide">Name your practice set</p>
      </div>

      <!-- Form -->
      <form @submit.prevent class="flex flex-col gap-5">

        <div class="flex flex-col gap-2">
          <label class="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/25">
            Playlist name
          </label>
          <input
            v-model="playlist_name"
            type="text"
            placeholder="e.g. Left-Hand Warmup"
            class="w-full px-4 py-2.5 rounded-md text-sm text-white/80 tracking-wide
                   bg-white/[0.04] border border-white/[0.08]
                   placeholder:text-white/20
                   focus:outline-none focus:border-amber-400/40 focus:bg-white/[0.06]
                   transition-all duration-200"
          />
        </div>

        <!-- Buttons -->
        <div class="flex gap-2.5">
          <button
            type="button"
            @click="closeModal"
            class="flex-1 py-2.5 rounded-md text-xs font-semibold tracking-widest uppercase
                   text-white/40 border border-white/[0.08]
                   hover:text-white/70 hover:border-white/20
                   active:scale-95 transition-all duration-150 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            @click="addPlaylist"
            class="flex-1 py-2.5 rounded-md text-xs font-semibold tracking-widest uppercase
                   text-[#0d0d0f] bg-amber-400 hover:bg-amber-300
                   shadow-[0_0_18px_rgba(251,191,36,0.25)]
                   active:scale-95 transition-all duration-150 cursor-pointer"
          >
            Create
          </button>
        </div>

      </form>
    </div>
  </main>
</template>