import { readFile } from 'fs';

readFile('jsons.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const jsonData = JSON.parse(data);
  for (let cv of jsonData.playlists){
    console.log(cv.name)
  }
});
