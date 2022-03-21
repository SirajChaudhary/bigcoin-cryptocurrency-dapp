var bigCoin = artifacts.require("./BigCoin.sol");
module.exports = function(deployer) {
   deployer.deploy(bigCoin, 200000);
};