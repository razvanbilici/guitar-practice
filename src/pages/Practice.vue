<script setup>
import { onMounted, ref } from 'vue'
import AddSong from '../components/AddSong.vue';
import AddPlaylist from '../components/AddPlaylist.vue';
import { Icon } from "@iconify/vue";
import { fetchPlaylists } from '../../services/playlistService';

const playlists = ref([])

onMounted(async() => {
  playlists.value = await fetchPlaylists()
})

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

function deleteSong(url){

  active_playlist.value.urls = active_playlist.value.urls.filter(item => item != url);
}

function addPlaylist(_name){

    if (!_name || _name.trim() === ""){
      alert("Enter a valid name")
      return
    }

    playlists.value.push(
      {name: _name,
     urls: [],
     open: false,
    }, )

    open_playlist_modal.value = false

}
</script>

<template>
  <div class="flex flex-col mt-4">
    <div class="flex mx-4 flex-row font-pcb text-[6vh] text-yellow-500 text-outline justify-between">
        <span class="">Your practice playlists</span>
      <button
  class="bg-yellow-500 hover:cursor-pointer p-4
         rounded-sm shadow-2xl font-pcb hover:scale-110 
         hover:bg-yellow-600 transition-all text-white text-outline 
         whitespace-nowrap flex items-center justify-center 
         text-[5vh]"
  @click="openPlaylistModal()"
>
  Add playlist
</button>
    </div>

  <div class="flex flex-col gap-1 justify-center z-10" id="playlists"> 

      <!-- Add Song Modal -->
<Transition
  enter-active-class="transition-opacity duration-300"
  leave-active-class="transition-opacity duration-200"
  enter-from-class="opacity-0"
  enter-to-class="opacity-100"
  leave-from-class="opacity-100"
  leave-to-class="opacity-0"
>
  <div
    v-if="open_song_modal"
    @click.self="open_song_modal=false"
    class="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50"
  >
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-90 translate-y-6"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-90 translate-y-6"
    >
      <AddSong
        @close="open_song_modal=false"
        @add="addSong"
        :playlist="active_playlist"
      />
    </Transition>
  </div>
</Transition>


<!-- Add Playlist Modal -->
<Transition
  enter-active-class="transition-opacity duration-300"
  leave-active-class="transition-opacity duration-200"
  enter-from-class="opacity-0"
  enter-to-class="opacity-100"
  leave-from-class="opacity-100"
  leave-to-class="opacity-0"
>
  <div
    v-if="open_playlist_modal"
    @click.self="open_playlist_modal=false"
    class="fixed inset-0 flex items-center justify-center
            backdrop-blur-sm z-50"
  >
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-90 translate-y-6"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-90 translate-y-6"
    >
      <AddPlaylist
        @close="open_playlist_modal=false"
        @add="addPlaylist"
      />
    </Transition>
  </div>
</Transition>

      <div
        v-for="playlist in playlists"
        :key="playlist.name"
        class="flex flex-col"
      >
      <div class="w-[20vw] p-4">
        
        <div class="relative flex flex-row items-center gap-2 cursor-pointer w-fit" 
        @click="open_close_playlist(playlist)">
          <span
            class="ml-1 text-2xl text-yellow-500 text-outline font-extrabold "
          >
            {{ playlist.name }}
          </span>
          <span class="text-sm text-gray-400 pt-1">
  {{ playlist.open ? "click to collapse" : "click to expand" }}
</span>
        
      </div>
        <div class="flex flex-col">

        <div v-if="playlist.open" class="flex flex-col gap-3 mt-1">
          <div class="flex flex-row gap-2 items-center" v-if="playlist.urls.length">

          <div v-for="url in playlist.urls.slice(0, 3)" class="flex flex-col">
            <iframe
              :key="url"
              width="320"
              height="180"
              :src="`https://www.youtube.com/embed/${url}`"
              frameborder="0"
              allowfullscreen
              class="hover:scale-110 transition-transform"
            ></iframe>
            <button >
              <Icon icon="material-symbols:delete" width="2vw" color="white" @click="deleteSong(url)" class="hover:scale-120 mt-4 cursor-pointer"></Icon>
            </button>
          </div>
                <p v-if="playlist.urls.length > 3" class="whitespace-nowrap text-white cursor-pointer">More..(click here)</p>
          </div>
          <div v-else class=" pl-1 text-white">Playlist is empty</div>

          <div class="flex flex-col ">
            <button
              class="bg-green-500 w-[11vw] p-2 rounded-sm shadow-2xl
                     hover:scale-110 hover:bg-green-700 transition-all 
                     text-white  text-outline-secondary overflow-hidden cursor-pointer text-outline-small font-extrabold wrap-anywhere"
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


