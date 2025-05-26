import { expect } from "chai";
import pkg from "hardhat";
const { ethers } = pkg;

describe("LogWriter", function () {
  async function deployLogWriterFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const LogWriter = await ethers.getContractFactory("LogWriter");
    const logWriter = await LogWriter.deploy();

    return { logWriter, owner, otherAccount };
  }

  describe("writeLog", function () {
    it("Should store log with correct message and sender", async function () {
      const { logWriter, owner } = await deployLogWriterFixture();
      const message = "User A paid 50000";

      const tx = await logWriter.writeLog(message);
      await tx.wait();

      const log = await logWriter.getLog(0);

      expect(log[0]).to.equal(owner.address);
      expect(log[1]).to.equal(message);
      expect(typeof log[2]).to.equal("bigint"); // timestamp
    });
  });

  describe("getAllLogsCount", function () {
    it("Should return the correct number of logs", async function () {
      const { logWriter } = await deployLogWriterFixture();

      await logWriter.writeLog("Log 1");
      await logWriter.writeLog("Log 2");

      const count = await logWriter.getAllLogsCount();
      expect(count).to.equal(2);
    });
  });
});
