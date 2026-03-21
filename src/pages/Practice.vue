<script setup>
import { onMounted, ref } from 'vue'
import AddSong from '../components/AddSong.vue';
import AddPlaylist from '../components/AddPlaylist.vue';
import { Icon } from "@iconify/vue";
import { deleteSong, fetchPlaylists, validURL } from '../../services/playlistService';

const playlists = ref([])
let open_song_modal = ref(false)
let open_playlist_modal = ref(false)

// Playlist to suffer changes (song addition or removal)
let active_playlist = ref(null)

onMounted(async() => {
  playlists.value = await fetchPlaylists()
  console.log(playlists.value)
})

function addNewPlaylist(playlist_title){

   if (!playlist_title || playlist_title.trim() === ""){
      alert("Enter a valid name")
      return
    }

  const new_playlist = {
        id: 11,
        name: playlist_title,
        songs: [],
        open: false,
    }
  playlists.value.push(new_playlist)
  open_playlist_modal.value = false
}

function addSongToPlaylist(_url){

  _url = validURL(_url)

  if (!_url) {
    alert("Not a valid URL!")
    return
  }

  active_playlist.value.songs.push({id: Math.random(), url: _url})
  open_song_modal.value = false

}


</script>


<!-- .value is automatically unwrapped in the template, no need to write it -->
<template>

  <main class="flex flex-col mt-4" id="parent component">

    <div id="title-and-add_playlist-button"
        class="flex mx-4 flex-row font-pcb text-[6vh] 
        text-yellow-500 text-outline justify-between">

        <span id="practice_playlists-title">Your practice playlists</span>

        <button id="add_playlist-button"
            class="bg-yellow-500 hover:cursor-pointer p-4 rounded-sm shadow-2xl font-pcb hover:scale-110 
          hover:bg-yellow-600 transition-all text-white text-outline whitespace-nowrap flex 
            items-center justify-center text-[5vh]"
            @click="open_playlist_modal = true">
            Add playlist
        </button>
    </div>

    <modals>

      <div id="add-playlist-modal">
        <Transition
          enter-active-class="transition-opacity duration-300"
          leave-active-class="transition-opacity duration-200"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0">

        <div
          v-if="open_playlist_modal"
          @click.self="open_playlist_modal=false"
          class="fixed inset-0 flex items-center justify-center
                  backdrop-blur-sm z-50">
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 scale-90 translate-y-6"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-90 translate-y-6">

            <AddPlaylist
              @close_modal="open_playlist_modal=false"
              @add_playlist="addNewPlaylist"/>
            </Transition>
        </div>
          </Transition>
      </div>

      <div id="add-song-modal">
        <Transition
          enter-active-class="transition-opacity duration-300"
          leave-active-class="transition-opacity duration-200"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0">

      <div
        v-if="open_song_modal"
        @click.self="open_song_modal=false"
        class="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">

        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-90 translate-y-6"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-90 translate-y-6">
          <AddSong
            @close_modal="open_song_modal=false"
            @add_song="addSongToPlaylist"
            :playlist="active_playlist"/>
        </Transition>

    </div>
      </Transition>
    </div>
      
    </modals>

    <div id="playlist-frame" 
        v-for="playlist in playlists" 
        :key="playlist.id" 
        class="flex flex-col">

      <div id="playlist-item-frame" class="w-[20vw] p-4">

        <div id="playlist-header"
            class="relative flex flex-row items-center gap-2 cursor-pointer w-fit" 
            @click="playlist.open = !playlist.open">

          <span class="ml-1 text-2xl text-yellow-500 text-outline font-extrabold">
            {{ playlist.name }}
          </span>

          <span class="text-sm text-gray-400 pt-1">
              {{ playlist.open ? "click to collapse" : "click to expand" }}
          </span>
      </div>

        <div id="videos-and-options" class="flex flex-col">

          <div id="videos-panel" v-if="playlist.open" class="flex flex-col gap-3 mt-1">

            <!-- Show tumbnails if the the playlist is not empty. Else, show "Playlist is empty" -->
            <div v-if="playlist.songs.length" class="flex flex-row gap-2 items-center" >
              
              <!-- Only show 3 videos at max, invite the user to see the full playlist -->
              <div id="thumbnails"
                v-for="song in playlist.songs.slice(0, 3)" class="flex flex-col">
                <iframe
                  :key="song.id"
                  width="320"
                  height="180"
                  :src="`https://www.youtube.com/embed/${song.url}`"
                  frameborder="0"
                  allowfullscreen
                  class="hover:scale-110 transition-transform">
                </iframe>

                <button>
                  <Icon id="delete-song-icon"         
                    icon="material-symbols:delete" width="2vw" color="white" 
                    @click="deleteSong(playlist, song)"          
                    class="hover:scale-120 mt-4 cursor-pointer">
                  </Icon>
                </button>
              </div>
              <p id="send-to-full-playlist-text" v-if="playlist.songs.length > 3" 
                class="whitespace-nowrap text-white cursor-pointer">
                More..(click here)
              </p>
            </div>

            <div v-else class=" pl-1 text-white">Playlist is empty</div>

            <div id="add-to-playlist-button" class="flex flex-col">
              <button
                @click="() => {active_playlist = playlist; open_song_modal = true}"
                class="bg-green-500 w-[11vw] p-2 rounded-sm shadow-2xl
                       hover:scale-110 hover:bg-green-700 transition-all 
                       text-white  text-outline-secondary overflow-hidden cursor-pointer text-outline-small font-extrabold wrap-anywhere">
                Add to playlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>