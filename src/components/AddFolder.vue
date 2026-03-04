<template>
  <div class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-100">
    
    <div class="bg-white p-8 rounded-2xl shadow-2xl w-[90vw] max-w-md flex flex-col gap-6">

      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label class="text-xs font-semibold uppercase tracking-wider text-gray-400 ml-1">
            YouTube Link
          </label>
          <input v-model="url" 
            type="text" 
            placeholder="e.g. dQw4w9WgXcQ"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-700 bg-gray-50"
          />
        </div>

        <div class="flex gap-3 mt-2">
          <button 
            type="button"
            @click="closeModal"
            class="flex-1 px-4 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          
          <button 
            type="submit"
            @click="addFolder"
            class="flex-1 px-4 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-95 transition-all"
          >
            Add Folder
          </button>
        </div>
      </form>

    </div>
  </div>
</template>

<script setup>

import {ref} from "vue"

const url = ref("")
const props = defineProps({
  folder_list: Object
})

// Define the events this component can "emit"
const emit = defineEmits(['close', 'add'])

const closeModal = () => {
  emit('close') // Shouting "close!" to the parent
}

const addFolder = () => {
  emit('add', url.value)
  console.log(url.value)
  closeModal() 
}
</script>