import { CountySpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const counties = await db.countyStore.getUserCounties(loggedInUser._id);
      const viewData = {
        title: "Walk Trail Dashboard",
        user: loggedInUser,
        counties: counties,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addCounty: {
    validate: {
      payload: CountySpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add county error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newCounty = {
        userid: loggedInUser._id,
        countyname: request.payload.countyname,
      };
      await db.countyStore.addCounty(newCounty);
      return h.redirect("/dashboard");
    },
  },

  deleteCounty: {
    handler: async function (request, h) {
      const county = await db.countyStore.getCountyById(request.params.id);
      await db.countyStore.deleteCountyById(county._id);
      return h.redirect("/dashboard");
    },
  },
};
