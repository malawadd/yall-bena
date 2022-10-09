const hre = require("hardhat");
const {ethers} = require('hardhat');
const fs = require("fs");

async function main() {
  const Split = await ethers.getContractFactory("Split");
  const split = await Split.deploy();

  await split.deployed();

  console.log("split deployed to:", split.address);

  fs.writeFileSync(
    "././split.js", `
    export const split = "${split.address}"`
  )

}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

