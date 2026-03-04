<template>


  <div class="flex flex-row gap-4 p-4 justify-center">
    <div class="flex flex-col gap-0.5 hover:cursor-pointer" v-for="folder in folders" v-on:click="open_close_folder(folder)">
        {{ folder.name }}


        <iframe v-if="folder.open" v-for="url in folder.urls"
      width="320"
      height="180"
      :src="`https://www.youtube.com/embed/${url}`"
      frameborder="0"
      allowfullscreen
    ></iframe>
        
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const folders = ref([
    {name: "Left",
     urls: ["dQw4w9WgXcQ", "Gx1oCI9ZjZw"],
     open: false
    }, 
    {name: "Right",
     urls: ["cHYq1MRoyI0", ""],
     open: false
    }
])

function open_close_folder(folder){

    folder.open = !folder.open
    
}
</script>