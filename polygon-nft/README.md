# Sample Hardhat NFT Project ON POLYGON

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

## 发布测试网
* npm run compile
* npm run deploy

```js
npx hardhat verify --network mumbai 0xc3086364a0EdB1E9D5BCF59F316aDe8C319DD9E6

// Nothing to compile
// No need to generate any newer typings.
// Successfully submitted source code for contract
// contracts/ChainBattles.sol:ChainBattles at 0xc3086364a0EdB1E9D5BCF59F316aDe8C319DD9E6
// for verification on the block explorer. Waiting for verification result...

// Successfully verified contract ChainBattles on Etherscan.
// https://mumbai.polygonscan.com/address/0xc3086364a0EdB1E9D5BCF59F316aDe8C319DD9E6#code

```
## env
* register polygonscan.com get POLYGONSCAN_API_KEY
* PRIVATE_KEY from metamask account private_key
* TESTNET_RPC is PRC URL

## opensea
https://testnets.opensea.io/