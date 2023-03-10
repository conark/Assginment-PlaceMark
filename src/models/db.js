import { userMemStore } from "./mem/user-mem-store.js";
import { playlistMemStore } from "./mem/playlist-mem-store.js";
import { trackMemStore } from "./mem/track-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { playlistJsonStore } from "./json/playlist-json-store.js";
import { trackJsonStore } from "./json/track-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { countyMongoStore } from "./mongo/county-mongo-store.js";
import { trackMongoStore } from "./mongo/place-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  countyStore: null,
  trackStore: null,

  init(storeType) {
    switch (storeType) {
      case "json" :
        this.userStore = userJsonStore;
        this.countyStore = countyJsonStore;
        this.trackStore = trackJsonStore;
        break;
      case "mongo" :
        this.userStore = userMongoStore;
        this.countyStore = countyMongoStore;
        this.trackStore = trackMongoStore;
        connectMongo();
        break;
      default :
        this.userStore = userMemStore;
        this.countyStore = countyMemStore;
        this.trackStore = trackMemStore;
    }
  }
};
