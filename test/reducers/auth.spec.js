import assert from "power-assert";
import reducer from "../../src/js/reducers/auth";

describe("Reducer - Auth", () => {
  it("Should handle SIGN_IN_REQUEST", () => {
    assert.deepStrictEqual(reducer(undefined, { type: "SIGN_IN_REQUEST" }), {
      isFetching: true,
      authenticated: false,
      hasJwtToken: false,
      user: null
    });
  });
});
