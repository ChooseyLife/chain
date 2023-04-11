require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const ALCHEMY_API_KEY_URL = process.env.ALCHEMY_API_KEY_URL;
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;

// npx hardhat run scripts/deploy.js --network sepolia
module.exports = {
  solidity: "0.8.4",
  networks: {
    sepolia: {
      url: ALCHEMY_API_KEY_URL,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.SEPOLIA_API_KEY,
  },
};