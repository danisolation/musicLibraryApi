const Fuse = require("fuse.js");
const Track = require("../models/Track");
const Playlist = require("../models/Playlist");

exports.searchMusic = async (query) => {
  const tracks = await Track.find();
  const playlists = await Playlist.find();

  const trackOptions = {
    keys: ["title", "artist", "album", "genre"],
    threshold: 0.4,
  };

  const playlistOptions = {
    keys: ["title"],
    threshold: 0.4,
  };

  const trackFuse = new Fuse(tracks, trackOptions);
  const playlistFuse = new Fuse(playlists, playlistOptions);

  const trackResults = trackFuse.search(query);
  const playlistResults = playlistFuse.search(query);

  return {
    tracks: trackResults.map((result) => result.item),
    playlists: playlistResults.map((result) => result.item),
  };
};
