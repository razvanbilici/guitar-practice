
export async function fetchPlaylists() {

    // Mock data until I decide what DB I will use
  // simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))

  return [
    {
        id: 1,
        name: "Metal",
        songs: [{id: 15, url: "dQw4w9WgXcQ"}, {id: 25, url: "kl5T4kHxmGM"}, 
          {id: 215, url: "CBYHwZcbD"}, {id: 13, url: "i_74QMvvM_o"}],
        open: false,
    },

    { 
        id: 2,  
        name: "Practice",
        songs: [],
        open: false,
    },
    {
        id: 3,
        name: "Favorites",
        songs: [{id: 153, url: "abc123xyz89"}],
        open: false,
    }
  ]
}

export async function addToPlaylist(playlist, song) {

    playlist.value.urls.push(song)
    playlist.value.open = true
    alert("Added")
}

export async function deleteSong(playlist, song){

  console.log(`${song.url} to be removed from ${playlist.name}`)

  playlist.songs = playlist.songs.filter(item => item.id != song.id);
}

export function validURL(url) {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );

  return match ? match[1] : null;
}



