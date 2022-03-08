// const { expect } = require("chai");
// const { ethers, getNamedAccounts } = require("hardhat");
// const { deployContract } = waffle;
// const utils = ethers.utils;

import { expect } from "./chai-setup";
import { ethers, deployments, getNamedAccounts } from 'hardhat';
// import { deployContract } = waffle;
// import { utils } = ether.utils;

describe("nicknameOfChallenge", function () {

    it("Should set nickname to Test", async function () {
        const NicknameOfContract = await ethers.getContractFactory("nicknameOfChallenge");
        const nicknameOfContract = await NicknameOfContract.deploy();
        await nicknameOfContract.deployed();

        const inBytes = ethers.utils.formatBytes32String("Test");
        await nicknameOfContract.setNickname(inBytes)
        const { deployer } = await getNamedAccounts();
        expect(await nicknameOfContract.nicknameOf(deployer)).to.equal(inBytes);
    });

});
