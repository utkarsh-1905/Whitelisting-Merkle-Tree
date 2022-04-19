const Migrations = artifacts.require("Migrations");
const Whitelist = artifacts.require("Whitelist");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Whitelist);
};
