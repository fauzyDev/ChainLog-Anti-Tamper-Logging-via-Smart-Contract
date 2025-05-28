import doteenv from "dotenv";
import pkg from "hardhat";

const { ethers } = pkg;

doteenv.config();

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, ethers.provider);

  console.log("Deploying with wallet:", wallet.address);

  const LogWriter = await ethers.getContractFactory("LogWriter", wallet);
  const contract = await LogWriter.deploy();

  await contract.waitForDeployment();

  console.log("✅ Contract deployed at:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
