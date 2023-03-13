import { v4 } from "uuid";

let places = [];

export const placeMemStore = {
  async getAllPlaces() {
    return places;
  },

  async addPlace(countyId, place) {
    place._id = v4();
    place.countyid = countyId;
    places.push(place);
    return place;
  },

  async getPlacesByCountyId(id) {
    return places.filter((place) => place.countyid === id);
  },

  async getPlaceById(id) {
    let place = places.find((place) => place._id === id);
    if (place == undefined) {
      place = null;
    }
    return place;
  },

  async getCountyPlaces(countyId) {
    return places.filter((place) => place.countyid === countyId);
  },

  async deletePlace(id) {
    const index = places.findIndex((place) => place._id === id);
    if (index !== -1) places.splice(index, 1);
  },

  async deleteAllPlaces() {
    places = [];
  },

  async updatePlace(place, updatedPlace) {
    place.placename = updatedPlace.placename;
    place.description = updatedPlace.description;
    place.latitude = updatedPlace.latitude;
    place.longitude	 = updatedPlace.longitude	;
  },
};
