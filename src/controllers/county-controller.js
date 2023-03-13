import { PlaceSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

export const countyController = {
  index: {
    handler: async function (request, h) {
      const county = await db.countyStore.getCountyById(request.params.id);
      const viewData = {
        title: "Walk Trail Map",
        county: county,
      };
      return h.view("county-view", viewData);
    },
  },

  addPlace: {
    validate: {
      payload: PlaceSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("county-view", { title: "Add place error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const county = await db.countyStore.getCountyById(request.params.id);
      const newPlace = {
        placename: request.payload.placename,
        description: request.payload.description,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
      };
      await db.placeStore.addPlace(county._id, newPlace);
      return h.redirect(`/county/${county._id}`);
    },
  },

  deletePlace: {
    handler: async function (request, h) {
      const county = await db.countyStore.getCountyById(request.params.id);
      await db.placeStore.deletePlace(request.params.placeid);
      return h.redirect(`/county/${county._id}`);
    },
  },

  uploadImage: {
    handler: async function (request, h) {
      try {
        const county = await db.countyStore.getCountyById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          county.img = url;
          await db.countyStore.updateCounty(county);
        }
        return h.redirect(`/county/${county._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/county/${county._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
};
