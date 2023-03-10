import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testCounties, cork } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("county Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.countyStore.deleteAllCounties();
    for (let i = 0; i < testCounties.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testCounties[i] = await db.countyStore.addCounty(testCounties[i]);
    }
  });

  test("create a county", async () => {
    const county = await db.countyStore.addCounty(cork);
    assertSubset(cork, county);
    assert.isDefined(county._id);
  });

  test("delete all counties", async () => {
    let returnedCounties = await db.countyStore.getAllCounties();
    assert.equal(returnedCounties.length, 3);
    await db.countyStore.deleteAllCounties();
    returnedCounties = await db.countyStore.getAllCounties();
    assert.equal(returnedCounties.length, 0);
  });

  test("get a county - success", async () => {
    const county = await db.countyStore.addCounty(cork);
    const returnedCounty = await db.countyStore.getCountyById(county._id);
    assertSubset(cork, county);
  });

  test("delete One Playist - success", async () => {
    const id = testCounties[0]._id;
    await db.countyStore.deleteCountyById(id);
    const returnedCounties = await db.countyStore.getAllCounties();
    assert.equal(returnedCounties.length, testCounties.length - 1);
    const deletedCounty = await db.countyStore.getCountyById(id);
    assert.isNull(deletedCounty);
  });

  test("get a county - bad params", async () => {
    assert.isNull(await db.countyStore.getCountyById(""));
    assert.isNull(await db.countyStore.getCountyById());
  });

  test("delete One county - fail", async () => {
    await db.countyStore.deleteCountyById("bad-id");
    const allCounties = await db.countyStore.getAllCounties();
    assert.equal(testCounties.length, allCounties.length);
  });
});
