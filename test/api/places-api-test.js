import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { walktrailService } from "./walktrail-service.js";
import { maggie, cork, maggieCredentials, testCounties, testPlaces, park } from "../fixtures.js";

suite("Place API tests", () => {
  let user = null;
  let dublinTrails = null;

  setup(async () => {
    walktrailService.clearAuth();
    user = await walktrailService.createUser(maggie);
    await walktrailService.authenticate(maggieCredentials);
    await walktrailService.deleteAllCounties();
    await walktrailService.deleteAllPlaces();
    await walktrailService.deleteAllUsers();
    user = await walktrailService.createUser(maggie);
    await walktrailService.authenticate(maggieCredentials);
    cork.userid = user._id;
    dublinTrails = await walktrailService.createCounty(cork);
  });

  teardown(async () => {});

  test("create place", async () => {
    const returnedPlace = await walktrailService.createPlace(dublinTrails._id, park);
    assertSubset(park, returnedPlace);
  });

  test("create Multiple places", async () => {
    for (let i = 0; i < testPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await walktrailService.createPlace(dublinTrails._id, testPlaces[i]);
    }
    const returnedPlaces = await walktrailService.getAllPlaces();
    assert.equal(returnedPlaces.length, testPlaces.length);
    for (let i = 0; i < returnedPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const place = await walktrailService.getPlace(returnedPlaces[i]._id);
      assertSubset(place, returnedPlaces[i]);
    }
  });

  test("Delete PlaceApi", async () => {
    for (let i = 0; i < testPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await walktrailService.createPlace(dublinTrails._id, testPlaces[i]);
    }
    let returnedPlaces = await walktrailService.getAllPlaces();
    assert.equal(returnedPlaces.length, testPlaces.length);
    for (let i = 0; i < returnedPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const place = await walktrailService.deletePlace(returnedPlaces[i]._id);
    }
    returnedPlaces = await walktrailService.getAllPlaces();
    assert.equal(returnedPlaces.length, 0);
  });

  test("denormalised County", async () => {
    for (let i = 0; i < testPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await walktrailService.createPlace(dublinTrails._id, testPlaces[i]);
    }
    const returnedCounty = await walktrailService.getCounty(dublinTrails._id);
    assert.equal(returnedCounty.places.length, testPlaces.length);
    for (let i = 0; i < testPlaces.length; i += 1) {
      assertSubset(testPlaces[i], returnedCounty.places[i]);
    }
  });
});
