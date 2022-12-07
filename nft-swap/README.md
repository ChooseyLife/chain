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
npx hardhat node
```