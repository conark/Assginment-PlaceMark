import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { walktrailService } from "./walktrail-service.js";
import { maggie, maggieCredentials, testUsers } from "../fixtures.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    walktrailService.clearAuth();
    await walktrailService.createUser(maggie);
    await walktrailService.authenticate(maggieCredentials);
    await walktrailService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await walktrailService.createUser(testUsers[i]);
    }
    await walktrailService.createUser(maggie);
    await walktrailService.authenticate(maggieCredentials);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await walktrailService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all user", async () => {
    let returnedUsers = await walktrailService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await walktrailService.deleteAllUsers();
    await walktrailService.createUser(maggie);
    await walktrailService.authenticate(maggieCredentials);
    returnedUsers = await walktrailService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user", async () => {
    const returnedUser = await walktrailService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await walktrailService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await walktrailService.deleteAllUsers();
    await walktrailService.createUser(maggie);
    await walktrailService.authenticate(maggieCredentials);
    try {
      const returnedUser = await walktrailService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});
