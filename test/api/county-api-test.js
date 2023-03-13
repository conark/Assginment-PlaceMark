import { EventEmitter } from "events";
import { assert } from "chai";
import { walktrailService } from "./walktrail-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials, cork, testCounties } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("County API tests", () => {
  let user = null;

  setup(async () => {
    walktrailService.clearAuth();
    user = await walktrailService.createUser(maggie);
    await walktrailService.authenticate(maggieCredentials);
    await walktrailService.deleteAllCounties();
    await walktrailService.deleteAllUsers();
    user = await walktrailService.createUser(maggie);
    await walktrailService.authenticate(maggieCredentials);
    cork.userid = user._id;
  });

  teardown(async () => {});

  test("create county", async () => {
    const returnedCounty = await walktrailService.createCounty(cork);
    assert.isNotNull(returnedCounty);
    assertSubset(cork, returnedCounty);
  });

  test("delete a county", async () => {
    const county = await walktrailService.createCounty(cork);
    const response = await walktrailService.deleteCounty(county._id);
    assert.equal(response.status, 204);
    try {
      const returnedCounty = await walktrailService.getCounty(county.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No County with this id", "Incorrect Response Message");
    }
  });

  test("create multiple Counties", async () => {
    for (let i = 0; i < testCounties.length; i += 1) {
      testCounties[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await walktrailService.createCounty(testCounties[i]);
    }
    let returnedLists = await walktrailService.getAllCounties();
    assert.equal(returnedLists.length, testCounties.length);
    await walktrailService.deleteAllCounties();
    returnedLists = await walktrailService.getAllCounties();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant county", async () => {
    try {
      const response = await walktrailService.deleteCounty("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No County with this id", "Incorrect Response Message");
    }
  });
});
