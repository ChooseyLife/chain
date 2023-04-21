const { ethers, upgrades } = require("hardhat");
// npx hardhat run scripts/deploy_pizza_v1.js --network polygon
// npx hardhat verify --network polygon 0x0dcea5933b08245e04ae93b29dcef957664ff28d
const SLICES = 8;
async function main() {
  const Pizza = await ethers.getContractFactory("Pizza");

  console.log("Deploying Pizza...");

  const pizza = await upgrades.deployProxy(Pizza, [SLICES], {
    initializer: "initialize",
  });
  await pizza.deployed();

  console.log("Pizza proxy deployed to:", pizza.address);
}

main();
