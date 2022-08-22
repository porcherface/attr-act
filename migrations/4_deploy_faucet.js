var Caos = artifacts.require("Caos");
var Faucet = artifacts.require("Faucet");
module.exports = function(deployer) {
  deployer.deploy(Faucet, Caos.address);
};