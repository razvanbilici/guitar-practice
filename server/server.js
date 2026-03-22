import express from "express";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import cors from "cors"; 

const app = express();
app.use(cors()); 
app.use(express.json());

// lowdb db
const db = new Low(new JSONFile("db.json"), { playlists: [] });
await db.read();

// GET all playlists
app.get("/playlists", async (req, res) => {

  // re-reads from db.json for each get request to gather new data / changes   
  await db.read(); 
  res.json(db.data.playlists);
});

// POST a new playlist
app.post("/playlists", async (req, res) => {
  db.data.playlists.push(req.body);
  await db.write(); 
  res.sendStatus(201);
});

app.put("/playlists/:id", async (req, res) => {
  const index = db.data.playlists.findIndex(p => p.id === Number(req.params.id));
  if (index === -1) return res.sendStatus(404);
  
  db.data.playlists[index] = req.body;
  await db.write();
  res.sendStatus(200);
});

// DELETE a playlist
app.delete("/playlists/:id", async (req, res) => {
  db.data.playlists = db.data.playlists.filter(p => p.id !== Number(req.params.id));
  await db.write();
  res.sendStatus(200);
});

app.post("/playlists/:id/songs", async (req, res) => {
  await db.read();
  const playlist = db.data.playlists.find(p => p.id === Number(req.params.id));
  if (!playlist) return res.sendStatus(404);

  playlist.songs.push(req.body);
  await db.write();
  res.sendStatus(201);
});

app.listen(3000, () => console.log("Server running on port 3000"));