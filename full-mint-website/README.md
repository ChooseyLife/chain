# Sample Hardhat Project
## How to create this project
1. npx create-react-app
2. npm i -D hardhat
3. npx hardhat

## init project
1. npm i @openzeppelin/contracts
2. npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
3. npm i -D dotenv
4. npm i @nomiclabs/hardhat-etherscan

## deploy contract
1. npx hardhat clean
2. npx hardhat compile
3. npx hardhat run scripts/deploy.js --network goerli

## verify contract
1. npx hardhat verify --network goerli 0x1948b37b75d660B41d7d7c00f976135d64d6e031 (合约地址)
1.1 https://goerli.etherscan.io/address/0x1948b37b75d660B41d7d7c00f976135d64d6e031#code
## source website
1. create-react-app: https://create-react-app.dev/
2. hardhat: https://hardhat.org/
3. infura: https://infura.io/
4. etherscan: https://etherscan.io/
5. node: https://nodejs.org/en/download/
6. chakra ui: https://chakra-ui.com/guides/first-steps
7. https://etherscan.io/
# Getting Started with Create React App
This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
