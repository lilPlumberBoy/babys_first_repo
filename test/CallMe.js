const { expect } = require("chai");
const { ethers } = require("hardhat");
const { deployContract } = waffle;

describe("CallMeChallenge", function () {

  it("Should initialize as false", async function () {
    const CallMeContract = await ethers.getContractFactory("CallMeChallenge");
    const callMeContract = await CallMeContract.deploy();
    await callMeContract.deployed();

    expect(await callMeContract.isComplete()).to.equal(false);
  });

  it("Should change to True once called", async function () {
    const CallMeContract = await ethers.getContractFactory("CallMeChallenge");
    const callMeContract = await CallMeContract.deploy();
    await callMeContract.deployed();
    const callMeTX = await callMeContract.callme()
    await callMeTX.wait()
    expect(await callMeContract.isComplete()).to.equal(true);
  });

});
