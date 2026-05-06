<script setup>
import { onMounted, ref } from 'vue'
import AddSong from '../components/AddSong.vue';
import AddPlaylist from '../components/AddPlaylist.vue';
import { Icon } from "@iconify/vue";
import { deleteSong, fetchPlaylists, validURL } from '../../services/playlistService';

const playlists = ref([])
let open_song_modal = ref(false)
let open_playlist_modal = ref(false)

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
        id: Math.random(),
        name: playlist_title,
        songs: [],
        open: false,
    }
  playlists.value.push(new_playlist)
  open_playlist_modal.value = false
}

async function addSongToPlaylist(_url){
  _url = validURL(_url)
  if (!_url) {
    alert("Not a valid URL!")
    return
  }
  const song = {id: crypto.randomUUID(), url: _url}
  open_song_modal.value = false
  const resp = await fetch(`http://localhost:3000/playlists/${active_playlist.value.id}/songs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(song)
  });
  active_playlist.value.songs.push(song)
}
</script>

<template>
  <main class="flex flex-col px-8 py-8 max-w-screen-xl mx-auto">

    <!-- Header row -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-xl font-semibold text-white tracking-tight">Practice Playlists</h1>
        <p class="text-sm text-white/35 mt-0.5">Organise your sessions by feel or technique</p>
      </div>

      <button
        @click="open_playlist_modal = true"
        class="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-[#0d0d0f] text-sm font-semibold transition-all duration-200 active:scale-95 cursor-pointer shadow-lg shadow-amber-400/20"
      >
        <Icon icon="material-symbols:add" width="16" />
        New Playlist
      </button>
    </div>

    <!-- Modals -->
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
          class="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
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

    <!-- Playlist list -->
    <div class="flex flex-col gap-4">
      <div
        v-for="playlist in playlists"
        :key="playlist.id"
        class="rounded-xl border border-white/[0.07] bg-white/[0.03] overflow-hidden"
      >

        <!-- Playlist header -->
        <div
          class="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-white/[0.03] transition-colors duration-150 select-none"
          @click="playlist.open = !playlist.open"
        >
          <div class="flex items-center gap-3">
            <Icon
              icon="material-symbols:library-music"
              width="18"
              class="text-amber-400/70"
            />
            <span class="text-white font-medium text-sm">{{ playlist.name }}</span>
            <span class="text-xs text-white/25">{{ playlist.songs.length }} song{{ playlist.songs.length !== 1 ? 's' : '' }}</span>
          </div>
          <Icon
            :icon="playlist.open ? 'material-symbols:keyboard-arrow-up' : 'material-symbols:keyboard-arrow-down'"
            width="20"
            class="text-white/30 transition-transform duration-200"
          />
        </div>

        <!-- Expanded panel -->
        <div v-if="playlist.open" class="px-5 pb-5 flex flex-col gap-4 border-t border-white/[0.05]">

          <!-- Thumbnails or empty state -->
          <div class="mt-4">
            <div v-if="playlist.songs.length" class="flex flex-row flex-wrap gap-4 items-start">
              <div
                v-for="song in playlist.songs.slice(0, 3)"
                :key="song.id"
                class="flex flex-col gap-2 group"
              >
                <div class="relative rounded-lg overflow-hidden">
                  <iframe
                    width="280"
                    height="157"
                    :src="`https://www.youtube.com/embed/${song.url}`"
                    frameborder="0"
                    allowfullscreen
                    class="block"
                  />
                </div>
                <button
                  class="flex items-center gap-1 text-xs text-white/30 hover:text-red-400 transition-colors duration-150 cursor-pointer w-fit"
                  @click="deleteSong(playlist, song)"
                >
                  <Icon icon="material-symbols:delete-outline" width="14" />
                  Remove
                </button>
              </div>

              <p
                v-if="playlist.songs.length > 3"
                class="self-center text-sm text-amber-400/70 hover:text-amber-400 cursor-pointer transition-colors"
              >
                +{{ playlist.songs.length - 3 }} more
              </p>
            </div>

            <p v-else class="text-sm text-white/25 italic">This playlist is empty.</p>
          </div>

          <!-- Add song button -->
          <button
            @click="() => { active_playlist = playlist; open_song_modal = true }"
            class="w-fit flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.1] text-white/50 hover:text-white hover:border-white/20 text-xs font-medium transition-all duration-150 cursor-pointer"
          >
            <Icon icon="material-symbols:add" width="14" />
            Add song
          </button>

        </div>
      </div>
    </div>

  </main>
</template>