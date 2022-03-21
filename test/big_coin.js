const BigCoin = artifacts.require("BigCoin");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("BigCoin", function (/* accounts */) {
  it("should assert true", async function () {
    await BigCoin.deployed();
    return assert.isTrue(true);
  });
});
