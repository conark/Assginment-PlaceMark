import { Place } from "./place.js";
import { County } from "./county.js";

export const placeMongoStore = {
  async getAllPlaces() {
    const places = await Place.find().lean();
    return places;
  },

  async addPlace(countyId, place) {
    place.countyid = countyId;
    const newPlace = new Place(place);
    const placeObj = await newPlace.save();
    return this.getPlaceById(placeObj._id);
  },

  async getPlacesByCountyId(id) {
    const places = await Place.find({ countyid: id }).lean();
    return places;
  },

  async getPlaceById(id) {
    if (id) {
      const place = await Place.findOne({ _id: id }).lean();
      return place;
    }
    return null;
  },

  async deletePlace(id) {
    try {
      await Place.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlaces() {
    await Place.deleteMany({});
  },

  async updatePlace(place, updatedPlace) {
    const placeDoc = await Place.findOne({ _id: place._id });
    placeDoc.category = updatedPlace.category;
    placeDoc.placename = updatedPlace.placename;
    placeDoc.description = updatedPlace.description;
    placeDoc.latitude = updatedPlace.latitude;
    placeDoc.longitude = updatedPlace.longitude;
    await placeDoc.save();
  },
};
