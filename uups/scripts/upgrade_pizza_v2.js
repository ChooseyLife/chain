const { ethers, upgrades } = require("hardhat");
// npx hardhat run scripts/upgrade_pizza_v2.js --network polygon
// npx hardhat verify –-network polygon 0x54b03e6f10e38195bd0cd4f73b4d0afef420735d
// npx hardhat verify --network polygon 0x54b03e6f10e38195bd0cd4f73b4d0afef420735d

// proxy_address 0xd42964924d43c6917df099ad09fe0f7c070b62d8
const PROXY = "0xd42964924d43c6917df099ad09fe0f7c070b62d8";

async function main() {
  const PizzaV2 = await ethers.getContractFactory("PizzaV2");
  console.log("Upgrading Pizza...");
  await upgrades.upgradeProxy(PROXY, PizzaV2);
  console.log("Pizza upgraded successfully");
}

main();