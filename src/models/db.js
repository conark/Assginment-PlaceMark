import { userMemStore } from "./mem/user-mem-store.js";
import { countyMemStore } from "./mem/county-mem-store.js";
import { placeMemStore } from "./mem/place-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { countyJsonStore } from "./json/county-json-store.js";
import { placeJsonStore } from "./json/place-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { countyMongoStore } from "./mongo/county-mongo-store.js";
import { placeMongoStore } from "./mongo/place-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  countyStore: null,
  placeStore: null,

  init(storeType) {
    switch (storeType) {
      case "json" :
        this.userStore = userJsonStore;
        this.countyStore = countyJsonStore;
        this.placeStore = placeJsonStore;
        break;
      case "mongo" :
        this.userStore = userMongoStore;
        this.countyStore = countyMongoStore;
        this.placeStore = placeMongoStore;
        connectMongo();
        break;
      default :
        this.userStore = userMemStore;
        this.countyStore = countyMemStore;
        this.placeStore = placeMemStore;
    }
  }
};
