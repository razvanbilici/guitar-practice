
export async function fetchPlaylists() {

  console.log("awaiting data")

  const response = await fetch("http://localhost:3000/playlists");
  const data = await response.json(); 

  return data;
}

export async function addToPlaylist(playlist, song) {
  playlist.value.songs.push(song);
  playlist.value.open = true;

  console.log(song)
  alert("baaaaa")

  await fetch(`http://localhost:3000/playlists/${playlist.value.id}/songs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(song) // just send the song, not the whole playlist
  });

  alert("Added");
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



