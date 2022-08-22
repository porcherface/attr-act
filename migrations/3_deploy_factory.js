var Factory = artifacts.require("Factory");
var Caos = artifacts.require("Caos");

module.exports = function(deployer) {
  deployer.deploy(Factory, Caos.address);
};