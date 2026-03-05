<template>
  <div class="flex flex-col mt-4">

    <div class="flex mx-4 flex-row font-pcb text-[3vw] text-white text-outline justify-between">
        <span class="">Your practice playlists</span>
      <button
        class="bg-green-500 w-[11vw] p-1 wrap-break-word hover:cursor-pointer
               rounded-sm shadow-2xl font-pcb hover:scale-110 hover:bg-green-700 transition-all text-white text-outline whitespace-nowrap"
        @click="openPlaylistModal()"
      >
        Add playlist
      </button>
    </div>

    <div class="flex flex-col gap-4 m-4 justify-center z-10"> 
        

      <div v-if="open_song_modal">
        <AddSong
          @close="open_song_modal=false"
          @add="addSong"
          :playlist="active_playlist"
        />
      </div>

      <div v-if="open_playlist_modal">
        <AddPlaylist @close="open_playlist_modal=false" />
      </div>

      <div
        v-for="playlist in playlist"
        :key="playlist.name"
        class="flex flex-col gap-0.5 hover:cursor-pointer"
      >
      <div class="">
        <h1 @click="open_close_playlist(playlist)">
          {{ playlist.name }}
        </h1>

        <div class="flex flex-col">
        <div v-if="playlist.open" class="flex flex-row gap-1 overflow-scroll">
            

          <iframe
            v-if="playlist.urls.length"
            v-for="url in playlist.urls"
            :key="url"
            width="320"
            height="180"
            :src="`https://www.youtube.com/embed/${url}`"
            frameborder="0"
            allowfullscreen
          ></iframe>

          <div v-else>Playlist empty</div>

        </div>
        </div>

        <button
          class="hover:cursor-pointer"
          @click="openSongModal(playlist)"
        >
          Add to playlist
        </button>

      </div>
    </div>
    </div>

  </div>
</template>


<script setup>
import { ref } from 'vue'
import AddSong from '../components/AddSong.vue';
import AddPlaylist from '../components/AddPlaylist.vue';

const playlist = ref([
    {name: "Left",
     urls: ["dQw4w9WgXcQ", "Gx1oCI9ZjZw", "dQw4w9WgXcQ", "Gx1oCI9ZjZw", "dQw4w9WgXcQ", "Gx1oCI9ZjZw", "dQw4w9WgXcQ", "Gx1oCI9ZjZw"],
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
let open_playlist_modal = ref(false)

let active_playlist = ref(null)

function openSongModal(playlist) {
    
    open_song_modal.value = true
    active_playlist.value = playlist
    console.log("open modal is " + open_song_modal)
}

function openPlaylistModal() {
    
    open_playlist_modal.value = true
    console.log("open modal is " + open_song_modal)
}

function open_close_playlist(playlist){

    playlist.open = !playlist.open
}

function addSong(url){

    active_playlist.value.urls.push(url)

}
</script>