import { expect } from "./chai-setup";
import { ethers } from 'hardhat';

describe("CallMeChallenge", function () {
  it("Should initialize as false", async function () {
    const CallMeContract = await ethers.getContractFactory("CallMeChallenge");
    const callMeContract = await CallMeContract.deploy();
    await callMeContract.deployed();
    expect(await callMeContract.isComplete()).to.equal(false);
  });
  it("Should change to true once called false", async function () {
    const CallMeContract = await ethers.getContractFactory("CallMeChallenge");
    const callMeContract = await CallMeContract.deploy();
    await callMeContract.deployed();
    await callMeContract.callme();
    expect(await callMeContract.isComplete()).to.equal(true);
  });
});
