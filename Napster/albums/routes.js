import * as dao from "./dao.js";

export default function AlbumRoutes(app) {
  app.get("/api/albums", async (req, res) => {
    const albums = await dao.findAllAlbums;
    res.send(albums);
  });
  app.get("/api/albums/:albumId", async (req, res) => {
    const albumId = req.params.albumId;
    const album = await dao.findAlbumByAlbumId(albumId);
    res.send(album);
  });
}
