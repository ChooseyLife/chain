require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config({ path: ".env" });

// npx hardhat run scripts/deploy_pizza_v1.js –-network polygon
const ALCHEMY_API_KEY_URL = process.env.ALCHEMY_API_KEY_URL;
const POLYGON_PRIVATE_KEY = process.env.POLYGON_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.10",
  networks: {
    polygon: {
      url: ALCHEMY_API_KEY_URL,
      accounts: [POLYGON_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
};
