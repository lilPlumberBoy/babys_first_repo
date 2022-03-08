import { expect } from "./chai-setup";
import { ethers, deployments, getNamedAccounts } from 'hardhat';

// const { deployContract } = waffle;

describe("CallMeChallenge", function () {
  // let CallMeContract;
  // let callMeContract;

  // beforeEach(async function () {
  //   //runs before each test, sets up environment
  //   // const CallMeContract = await ethers.getContractFactory("CallMeChallenge");
  //   // const callMeContract = await CallMeContract.deploy();
  //   // await callMeContract.deployed();
  // })

  it("Should initialize as false", async function () {
    const CallMeContract = await ethers.getContractFactory("CallMeChallenge");
    const callMeContract = await CallMeContract.deploy();
    await callMeContract.deployed();
    expect(await callMeContract.isComplete()).to.equal(false);
  });

  // it("Should change to True once called", async function () {
  //   const callMeTX = await callMeContract.callme()
  //   await callMeTX.wait()
  //   expect(await callMeContract.isComplete()).to.equal(true);
  // });

});
