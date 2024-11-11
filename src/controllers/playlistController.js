const Playlist = require("../models/Playlist");
const path = require("path");

exports.createPlaylist = async (req, res, next) => {
  try {
    const playlist = new Playlist(req.body);
    await playlist.save();
    res.status(201).json(playlist);
  } catch (error) {
    next(error);
  }
};

exports.getAllPlaylists = async (req, res, next) => {
  try {
    const playlists = await Playlist.find().populate("tracks");
    res.json(playlists);
  } catch (error) {
    next(error);
  }
};

exports.getPlaylistById = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate("tracks");
    if (!playlist) {
      return res.status(404).json({ message: "Không tìm thấy playlist" });
    }
    res.json(playlist);
  } catch (error) {
    next(error);
  }
};

exports.updatePlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!playlist) {
      return res.status(404).json({ message: "Không tìm thấy playlist" });
    }
    res.json(playlist);
  } catch (error) {
    next(error);
  }
};

exports.deletePlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.findByIdAndDelete(req.params.id);
    if (!playlist) {
      return res.status(404).json({ message: "Không tìm thấy playlist" });
    }
    res.json({ message: "Đã xóa playlist thành công" });
  } catch (error) {
    next(error);
  }
};

exports.addTrackToPlaylist = async (req, res, next) => {
  try {
    const { playlistId, trackId } = req.params;
    const playlist = await Playlist.findByIdAndUpdate(
      playlistId,
      { $addToSet: { tracks: trackId } },
      { new: true }
    );
    if (!playlist) {
      return res.status(404).json({ message: "Không tìm thấy playlist" });
    }
    res.json(playlist);
  } catch (error) {
    next(error);
  }
};

exports.removeTrackFromPlaylist = async (req, res) => {
  try {
    const { playlistId, trackId } = req.params;

    const playlist = await Playlist.findByIdAndUpdate(
      playlistId,
      { $pull: { tracks: trackId } },
      { new: true }
    );

    if (!playlist) {
      return res.status(404).json({ message: "Không tìm thấy playlist" });
    }

    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.streamPlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate("tracks");
    if (!playlist) {
      return res.status(404).json({ message: "Không tìm thấy playlist" });
    }

    let m3uContent = "#EXTM3U\n";

    for (const track of playlist.tracks) {
      const duration = Math.floor(track.duration);
      m3uContent += `#EXTINF:${duration},${track.artist} - ${track.title}\n`;
      m3uContent += `${req.protocol}://${req.get(
        "host"
      )}/uploads/${path.basename(track.filePath)}\n`;
    }

    res.setHeader("Content-Type", "audio/x-mpegurl");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${playlist.title}.m3u"`
    );
    res.send(m3uContent);
  } catch (error) {
    next(error);
  }
};
