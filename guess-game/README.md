# 猜拳游戏
> 基于 `truffle-cli` 创建，需要先安装 truffle
https://trufflesuite.com/docs/truffle/getting-started/installation/
## 先部署合约
> truffle develop 后将生成以下日志，包含本地测试账号与私钥，将私钥导入到钱包中，每个账号都会有100ETH
```
Truffle Develop started at http://127.0.0.1:9545/
Accounts:
(0) 0xce39d080a6be7c86f07f82de4b9fb38b2edfb932
(1) 0xffbec72dd03d7b366c5c7dbc76b7f73a144fd164
(2) 0xae3eb9b6cccb1eed1c95939a8a5c6ee3ea0da7d4
(3) 0x8ab02afb50506358c4014c8b7b7c466e1e159360
(4) 0x1370320da9c275f1cb4fa8dd2e76806f875a44ab
(5) 0xcc55a9a8b0c17e48e034da6564f76004cf79d947
(6) 0xd3edcfa225e459e9c159f3fc0916fd8438b5507b
(7) 0x328a1aa315c068c29471390b510279660447b1b9
(8) 0x669ff246c40544a5d15fcd5583d393c1d80acfe0
(9) 0x366da6ce8c61ba3a8534c5b91f3268923c05f8e4

Private Keys:
(0) d3b6cfb5836a9d82f83a1a9544a4053aa54144d08e49c057bc38343fa5608c1c
(1) 5a17355aba5d899222e7aa945c39c28a8af9b65afb5ae6d46f33664e7666bdd7
(2) 0ae07e26ff354e7e7a47ae97fb5c3124ff5b139726b3326235717804d5e1343f
(3) 9328232d4a9541ce8595e8929adfd0046cf98ad7af6d29801bbee5c023b3d4a0
(4) bf616f270c4d1208c1a4640efacafed6092f01e7776c345cdf7f70f2f975441d
(5) 354a73fed39e8b2e2ed966c29918fd0a8484f3bee74500d700d30830ea17e7bb
(6) b5aa7c1da1e45503d1f9cd75579781e74e882e3f674d668a29636931788fb2b8
(7) e214091d3ff51e14cd8055220721580edafa816a996095ca6363b2dcef676cbe
(8) 6a7967d443474efbb195ebbfb1629725c85a9c26c50e73b639223d18270c3daf
(9) fcc6941a77970b5b61fca400f73324ed7cee9e18c60b5ab34ce849b2beaabfd2
```
* truffle develop
* truffle compile
* truffle migrate
> 复制 `build` 文件夹下的**GuessGame.json**到`app`下

## 运行项目
* npm i
* npm run dev

## 注意
> 必须要链接钱包，并将develop生成的账号导入到钱包中
