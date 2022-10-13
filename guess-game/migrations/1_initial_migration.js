// const PETER = artifacts.require("PETER");

// module.exports = function (deployer) {
//   deployer.deploy(PETER, web3.utils.toWei("1000000", "ether"));
// };

const Inherited = artifacts.require('father')

module.exports = function(deployer) {
  deployer.deploy(Inherited)
}