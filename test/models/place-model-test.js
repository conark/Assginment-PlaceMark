import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testCounties, testPlaces, dublin, cork, park, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Place Model tests", () => {

  let dublinList = null;

  setup(async () => {
    db.init("mongo");
    await db.countyStore.deleteAllCounties();
    await db.placeStore.deleteAllPlaces();
    dublinList = await db.countyStore.addCounty(dublin);
    for (let i = 0; i < testPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlaces[i] = await db.placeStore.addPlace(dublinList._id, testPlaces[i]);
    }
  });

  test("create single place", async () => {
    const corkList = await db.countyStore.addCounty(cork);
    const place = await db.placeStore.addPlace(corkList._id, park)
    assert.isNotNull(place._id);
    assertSubset (park, place);
  });

  test("create multiple placeApi", async () => {
    const places = await db.countyStore.getCountyById(dublinList._id);
    assert.equal(testPlaces.length, testPlaces.length)
  });

  test("delete all placeApi", async () => {
    const places = await db.placeStore.getAllPlaces();
    assert.equal(testPlaces.length, places.length);
    await db.placeStore.deleteAllPlaces();
    const newPlaces = await db.placeStore.getAllPlaces();
    assert.equal(0, newPlaces.length);
  });

  test("get a place - success", async () => {
    const corkList = await db.countyStore.addCounty(cork);
    const place = await db.placeStore.addPlace(corkList._id, park)
    const newPlace = await db.placeStore.getPlaceById(place._id);
    assertSubset (park, newPlace);
  });

  test("delete One Place - success", async () => {
    const id = testPlaces[0]._id;
    await db.placeStore.deletePlace(id);
    const places = await db.placeStore.getAllPlaces();
    assert.equal(places.length, testCounties.length - 1);
    const deletedPlace = await db.placeStore.getPlaceById(id);
    assert.isNull(deletedPlace);
  });

  test("get a County - bad params", async () => {
    assert.isNull(await db.placeStore.getPlaceById(""));
    assert.isNull(await db.placeStore.getPlaceById());
  });

  test("delete One User - fail", async () => {
    await db.placeStore.deletePlace("bad-id");
    const places = await db.placeStore.getAllPlaces();
    assert.equal(places.length, testCounties.length);
  });
});
