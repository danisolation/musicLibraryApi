const Track = require("../models/Track");
const Playlist = require("../models/Playlist");

exports.createTrack = async (req, res, next) => {
  try {
    const track = new Track({
      ...req.body,
      filePath: req.file.path,
    });
    await track.save();
    res.status(201).json(track);
  } catch (error) {
    next(error);
  }
};

exports.getAllTracks = async (req, res, next) => {
  try {
    const tracks = await Track.find();
    res.json(tracks);
  } catch (error) {
    next(error);
  }
};

exports.getTrackById = async (req, res, next) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) {
      return res.status(404).json({ message: "Không tìm thấy bài hát" });
    }
    res.json(track);
  } catch (error) {
    next(error);
  }
};

exports.updateTrack = async (req, res, next) => {
  try {
    const track = await Track.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!track) {
      return res.status(404).json({ message: "Không tìm thấy bài hát" });
    }
    res.json(track);
  } catch (error) {
    next(error);
  }
};

exports.deleteTrack = async (req, res, next) => {
  try {
    await Playlist.updateMany(
      { tracks: req.params.id },
      { $pull: { tracks: req.params.id } }
    );
    const track = await Track.findByIdAndDelete(req.params.id);
    if (!track) {
      return res.status(404).json({ message: "Không tìm thấy bài hát" });
    }
    res.json({ message: "Đã xóa bài hát thành công" });
  } catch (error) {
    next(error);
  }
};
