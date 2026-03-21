
export async function fetchPlaylists() {

    // Mock data until I decide what DB I will use
  // simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))

  return [
    {
        id: 1,
        name: "Metal",
        urls: ["dQw4w9WgXcQ"],
        open: false,
    },

    { 
        id: 2,  
        name: "Practice",
        urls: [],
        open: false,
    },
    {
        id: 3,
        name: "Favorites",
        urls: ["abc123xyz89"],
        open: false,
    }
  ]
}

export async function addToPlaylist(playlist, songID) {

    playlist.value.urls.push(songID)
    playlist.value.open = true
    alert("Added")
}

export async function deleteSong(playlist, songID){

  playlist.value.urls = playlist.value.urls.filter(item => item != songID);
}


