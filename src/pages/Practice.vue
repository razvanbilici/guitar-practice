<template>
  <div class="flex flex-col mt-4">

    <div class="flex mx-4 flex-row font-pcb text-[10vh] text-white text-outline justify-between">
        <span class="">Your practice playlists</span>
      <button
  class="bg-green-500 mt-4 hover:cursor-pointer p-4
         rounded-sm shadow-2xl font-pcb hover:scale-110 
         hover:bg-green-700 transition-all text-white text-outline 
         whitespace-nowrap flex items-center justify-center 
         text-[5vh]"
  @click="openPlaylistModal()"
>
  Add playlist
</button>
    </div>

    <div class="flex flex-col gap-1 m-4 justify-center z-10"> 

      <div v-if="open_song_modal">
        <AddSong
          @close="open_song_modal=false"
          @add="addSong"
          :playlist="active_playlist"
        />
      </div>

      <div v-if="open_playlist_modal">
        <AddPlaylist @close="open_playlist_modal=false" @add="addPlaylist"/>
      </div>

      <div
        v-for="playlist in playlists"
        :key="playlist.name"
        class="flex flex-col"
      >
      <div class="w-[20vw] p-4">
        
        <div class="flex flex-row items-center gap-2 cursor-pointer" 
        @click="open_close_playlist(playlist)">
          <span
            class="ml-1 text-2xl text-white text-outline font-extrabold "
          >
            {{ playlist.name }}
          </span>
          <div v-if="!playlist.open">
          <p class="text-sm text-gray-400">
            click to expand
          </p>
        </div>
        <div v-else>
          <p class="text-sm text-gray-400">
            click to collapse
          </p>
        </div>
      </div>


        <div class="flex flex-col">

        <div v-if="playlist.open" class="flex flex-col gap-3 mt-1">
          <div class="flex flex-row gap-1 items-center" v-if="playlist.urls.length">
                <iframe
                  v-for="url in playlist.urls.slice(0, 3)"
                  :key="url"
                  width="320"
                  height="180"
                  :src="`https://www.youtube.com/embed/${url}`"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
                <p v-if="playlist.urls.length > 3" class="whitespace-nowrap cursor-pointer">More..(click here)</p>
          </div>
          <div v-else class="text-outline-small pl-1 text-white">Playlist is empty</div>

          <div class="flex flex-col ">
            <button
              class="bg-green-500 w-[11vw] p-2 rounded-sm shadow-2xl
                     hover:scale-110 hover:bg-green-700 transition-all 
                     text-white whitespace-nowrap text-outline-secondary overflow-hidden cursor-pointer text-outline-small font-extrabold"
              @click="openSongModal(playlist)"
            >
              Add to playlist
            </button>
      </div>
        </div>
        
        </div>
        
        

      </div>
    </div>
    </div>

  </div>
</template>


<script setup>
import { ref } from 'vue'
import AddSong from '../components/AddSong.vue';
import AddPlaylist from '../components/AddPlaylist.vue';

const playlists = ref([])

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
    active_playlist.value.open = true

}

function addPlaylist(_name){

    playlists.value.push(
      {name: _name,
     urls: [],
     open: false,
    }, )

}
</script>