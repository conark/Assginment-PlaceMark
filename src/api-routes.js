import { userApi } from "./api/user-api.js";
import { countyApi } from "./api/county-api.js";
import { placeApi } from "./api/place-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/counties", config: countyApi.create },
  { method: "DELETE", path: "/api/counties", config: countyApi.deleteAll },
  { method: "GET", path: "/api/counties", config: countyApi.find },
  { method: "GET", path: "/api/counties/{id}", config: countyApi.findOne },
  { method: "DELETE", path: "/api/counties/{id}", config: countyApi.deleteOne },

  { method: "GET", path: "/api/places", config: placeApi.find },
  { method: "GET", path: "/api/places/{id}", config: placeApi.findOne },
  { method: "POST", path: "/api/counties/{id}/places", config: placeApi.create },
  { method: "DELETE", path: "/api/places", config: placeApi.deleteAll },
  { method: "DELETE", path: "/api/places/{id}", config: placeApi.deleteOne },
];
