const Lottery = artifacts.require("./Estate.sol");

module.exports = function (deployer) {
  deployer.deploy(Lottery,5,300,500);
};
