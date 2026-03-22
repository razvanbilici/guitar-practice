
export async function fetchPlaylists() {

  const response = await fetch("/playlists.json");
  const data = await response.json(); 

  // console.log("heres the data", data.playlists);

  return data.playlists
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



