<template>
  <div class="fixed inset-0 flex items-center justify-center z-100">
    
    <div class="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-[90vw] max-w-md flex flex-col gap-6">

      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label class="text-xs font-semibold uppercase tracking-wider text-gray-400 ml-1">
            Playlist Name
          </label>
          <input v-model="name" 
            type="text" 
            placeholder="e.g. Left-Hand Warmup"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 bg-white/60"
          />
        </div>

        <div class="flex gap-3 mt-2">
          <button 
            type="button"
            @click="closeModal"
            class="flex-1 px-4 py-3 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 shadow-sm shadow-red-600 active:scale-95 transition-all cursor-pointer border"
          >
            Cancel
          </button>
          
          <button 
            type="submit"
            @click="addPlaylist"
            class="flex-1 px-4 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-600 active:scale-95 transition-all cursor-pointer border"
          >
            Add playlist
          </button>
        </div>
      </form>

    </div>
  </div>
</template>

<script setup>

import {ref} from "vue"

const name = ref("")
const props = defineProps({
  playlist_array: Object
})

// Define the events this component can "emit"
const emit = defineEmits(['close', 'add'])

const closeModal = () => {
  emit('close') // Shouting "close!" to the parent
}

const addPlaylist = () => {
  emit('add', name.value)
  console.log(name.value)
  
}
</script>