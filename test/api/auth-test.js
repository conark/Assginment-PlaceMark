import { assert } from "chai";
import { walktrailService } from "./walktrail-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie, maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    walktrailService.clearAuth();
    await walktrailService.createUser(maggie);
    await walktrailService.authenticate(maggieCredentials);
    await walktrailService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await walktrailService.createUser(maggie);
    const response = await walktrailService.authenticate(maggieCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await walktrailService.createUser(maggie);
    const response = await walktrailService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    walktrailService.clearAuth();
    try {
      await walktrailService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
