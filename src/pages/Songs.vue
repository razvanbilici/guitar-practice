<template>

    <div class="flex flex-col">
  <div class="flex flex-row gap-4 p-4 justify-center z-10">
    
    <div v-if="open_song_modal">
        <AddSong @close="open_song_modal=false" @add="addSong" :folder="active_folder" />
    </div>

    <div v-if="open_folder_modal">
        <AddFolder @close="open_folder_modal=false"/>
    </div>
    <div class="flex flex-col gap-0.5 hover:cursor-pointer" v-for="folder in folders" >
        <h1 @click="open_close_folder(folder)">
            {{ folder.name }}
        </h1>

        <div v-if="folder.open">
        <iframe v-if="folder.urls.length" v-for="url in folder.urls"
      width="320"
      height="180"
      :src="`https://www.youtube.com/embed/${url}`"
      frameborder="0"
      allowfullscreen
    ></iframe>
    <div v-else>Folder empty</div>
    </div>
        <button class="hover:cursor-pointer" @click="openSongModal(folder)">Add to folder</button>
    </div>
  </div>
    <button class="justify-center" @click="openFolderModal()">Add Folder</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AddSong from '../components/AddSong.vue';
import AddFolder from '../components/AddFolder.vue';

const folders = ref([
    {name: "Left",
     urls: ["dQw4w9WgXcQ", "Gx1oCI9ZjZw"],
     open: false
    }, 
    {name: "Right",
     urls: ["cHYq1MRoyI0", ""],
     open: false
    },

    {name: "Empty",
     urls: [],
     open: false
    },
])

let open_song_modal = ref(false)
let open_folder_modal = ref(false)

let active_folder = ref(null)

function openSongModal(folder) {
    
    open_song_modal.value = true
    active_folder.value = folder
    console.log("open modal is " + open_song_modal)
}

function openFolderModal() {
    
    open_folder_modal.value = true
    console.log("open modal is " + open_song_modal)
}

function open_close_folder(folder){

    folder.open = !folder.open
}

function addSong(url){

    active_folder.value.urls.push(url)

}
</script>