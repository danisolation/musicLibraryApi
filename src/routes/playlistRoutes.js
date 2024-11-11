const express = require("express");
const router = express.Router();
const playlistController = require("../controllers/playlistController");

router.post("/", playlistController.createPlaylist);
router.get("/", playlistController.getAllPlaylists);
router.get("/:id", playlistController.getPlaylistById);
router.put("/:id", playlistController.updatePlaylist);
router.delete("/:id", playlistController.deletePlaylist);
router.post(
  "/:playlistId/tracks/:trackId",
  playlistController.addTrackToPlaylist
);
router.delete(
  "/:playlistId/tracks/:trackId",
  playlistController.removeTrackFromPlaylist
);

router.get("/:id/stream", playlistController.streamPlaylist);

module.exports = router;
