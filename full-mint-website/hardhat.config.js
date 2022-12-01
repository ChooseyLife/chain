require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv");

dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    rinkeby: {
      url: process.env.REACT_APP_RINKEBY_RPC_URL,
      accounts: [process.env.REACT_APP_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.REACT_APP_ETHERSCAN_KEY
  }
};
