# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

This is a starter template for [Learn Next.js](https://nextjs.org/learn).
## 安装
```
npx create-next-app@latest nft-swap --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"
npx hardhat
npm i --save-dev "hardhat@^2.12.2" "@nomicfoundation/hardhat-toolbox@^2.0.0"
npm install --save ethers
npm install --save @openzeppelin/contracts
```

## hardhat
```
npx hardhat clean
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.js --network localhost

// 该命令用于执行单元测试
```

## 本地运行节点
```
// 打开一个终端运行
npx hardhat node

// 另一个终端运行
/*
* npx hardhat run scripts/deploy.js 命令执行后悔输出一个合约地址
* {合约名称} with 1 ETH and unlock timestamp 1701959054 deployed to {合约地址}
*/
npx hardhat clean && npx hardhat compile && npx hardhat run scripts/deploy.js --network localhost
```

## MetaMask 钱包导入本地网络
```
// RPCURL
http://127.0.0.1:8545/

// chianId
31337

// 货币符号
NFT

## 项目介绍
* 使用 openzepplin
* 支持 enumerable 和 Token Url
* 支持 mint
* 支持铸币