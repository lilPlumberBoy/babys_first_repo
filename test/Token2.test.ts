import { expect } from "./chai-setup";
import { ethers, deployments, getNamedAccounts } from 'hardhat';

describe("Token2 Contract", function () {
    it("Deployment should assign the total supply of tokens / 10 to owner", async function () {
        const [owner] = await ethers.getSigners();
        const Token2 = await ethers.getContractFactory("Token2");
        const hardhatToken = await Token2.deploy();
        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        expect(await hardhatToken.totalSupply() / 10).to.equal(ownerBalance);
    });
    describe("Transactions", function () {
        it("Should transfer tokens between accounts", async function () {
            // adding addrs to test a transaction
            const [owner, addr1, addr2] = await ethers.getSigners();
            // creating a factory for instances of our contract
            const Token = await ethers.getContractFactory("Token");
            // deploying an instance of our contract
            const hardhatToken = await Token.deploy();
            // Transfer 50 tokens from owner to addr1
            await hardhatToken.transfer(addr1.address, 50);
            expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);
            // Transfer 50 tokens from addr1 to addr2
            await hardhatToken.connect(addr1).transfer(addr2.address, 50);
            expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
        });

    });

});
