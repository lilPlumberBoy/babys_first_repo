import { expect } from "./chai-setup";
import { ethers, deployments, getNamedAccounts } from 'hardhat';

describe("GuessTheNumberChallenge", function () {
    let GuessNumContract;
    let guessNumContract;

    // beforeEach(async function () {
    //     //runs before each test, sets up environment
    //     // GuessNumContract = await ethers.getContractFactory("GuessTheNumberChallenge");
    //     // const [addr1] = await ethers.getSigners();
    //     // const { deployer } = await getNamedAccounts();
    //     // guessNumContract = await GuessNumContract.deploy();
    //     // await guessNumContract.deployed();
    // })

    it("Should initialize as false", async function () {
        await deployments.fixture(["GuessTheNumberChallenge"]);
        const guessNumContract = await ethers.getContract("GuessTheNumberChallenge")
        expect(await guessNumContract.isComplete()).to.equal(false);
    });

    // it("Should change to True correct guess is made", async function () {
    //     const [addr1] = await ethers.getSigners();
    //     const callMeTX = await callMeContract.guess(42, { from: addr1.address, value: ethers.utils.parseEther("1") })
    //     await callMeTX.wait()
    //     expect(await callMeContract.isComplete()).to.equal(true);
    // });

});
