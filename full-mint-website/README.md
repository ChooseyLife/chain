# Sample Hardhat Project
## How to create this project
1. npx create-react-app
2. npm i -D hardhat
3. npx hardhat

## init project
1. npm i @openzeppelin/contracts
2. npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
3. npm i -D dotenv

## deploy contract
1. npx hardhat clean
2. npx hardhat compile
3. npx hardhat run scripts/deploy.js --network rinkeby

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
