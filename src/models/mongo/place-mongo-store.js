import { Track } from "./place.js";
import { County } from "./county.js";

export const trackMongoStore = {
  async getAllTracks() {
    const tracks = await Track.find().lean();
    return tracks;
  },

  async addTrack(countyId, track) {
    track.countyid = countyId;
    const newTrack = new Track(track);
    const trackObj = await newTrack.save();
    return this.getTrackById(trackObj._id);
  },

  async getTracksByCountyId(id) {
    const tracks = await Track.find({ countyid: id }).lean();
    return tracks;
  },

  async getTrackById(id) {
    if (id) {
      const track = await Track.findOne({ _id: id }).lean();
      return track;
    }
    return null;
  },

  async deleteTrack(id) {
    try {
      await Track.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllTracks() {
    await Track.deleteMany({});
  },

  async updateTrack(track, updatedTrack) {
    track.title = updatedTrack.title;
    track.artist = updatedTrack.artist;
    track.duration = updatedTrack.duration;
    await track.save();
  },
};
