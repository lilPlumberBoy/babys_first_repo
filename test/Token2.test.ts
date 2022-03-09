// Import Chai to use its assertion functions
import { expect } from "./chai-setup";

// Import our utilities
import { setupUsers, setupUser } from './utils';

// Import hardhat environment field we are planning to use
import { ethers, deployments, getNamedAccounts, getUnnamedAccounts } from 'hardhat';

// create a setup function that can be called by every test and setup variable for easy to read tests
async function setup() {
    // first ensures the deployment is executed and reset (use of evm_snapshot for faster tests)
    await deployments.fixture(["Token2"]);

    // we get an instantiated contract in the form of a ethers.js Contract instance:
    const contracts = {
        Token2: (await ethers.getContract('Token2')),
    };

    // we get the deployer account
    const { deployer } = await getNamedAccounts();

    // Get the unnammedAccounts (which are all accounts not named in the config)
    // This is useful for tests as you can be sure they have not been given tokens
    // We then use the utilities function to generate user objects
    // These objects allow you to write things like 'users[0].Token.transfer(...)
    const users = await setupUsers(await getUnnamedAccounts(), contracts);
    // finally we return the whole object (including tokenOwner setup as a User object)
    return {
        // ... or 'spread syntax' takes in an iterable(array) and expands it to its elements
        // used here to return however many contracts we pass
        ...contracts,
        users,
        deployer: await setupUser(deployer, contracts),
    };
}

// 'describe' is a Mocha function that allows you to organize your tests
// 'describe' receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be an async function
describe("Token contract", function () {

    // can nest describes
    describe("Deployments", function () {
        // 'it' is another mocha function to define tests, it receieves the test name, and a callback function
        it("Should set the right owner", async function () {
            //Expect recieves a value, and wraps it in an Assertion object
            // before the test, we call the fixture function
            const { Token2 } = await setup()

            //This test expects the owner of the contract to be the deployer
            const { deployer } = await getNamedAccounts();
            expect(await Token2.owner()).to.equal(deployer)
        });

        it("Should assign half the total supply of tokens to the owner", async function () {
            const { Token2, deployer } = await setup();
            expect(await Token2.balanceOf(deployer.address)).to.equal(await Token2.totalSupply() / 2)
        });
    });
});

describe("Transactions", function () {
    it("Should transfer 50 tokens between accounts", async function () {
        const { Token2, deployer, users } = await setup()
        // Transfer 50 tokens to users[2]

        // initial value of sender wallet
        const initialsenderbal = Token2.balanceOf(deployer.address)
        // expect user to have 0 tokens before
        expect(await Token2.balanceOf(users[2].address)).to.equal(0);
        // Transfer tokens to account
        await deployer.Token2.transfer(users[2].address, 50);
        // expect tokens to now be 50
        expect(await Token2.balanceOf(users[2].address)).to.equal(50);
        expect(await Token2.balanceOf(deployer.address)).to.equal(await initialsenderbal - 50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
        const { Token2, users } = await setup()
        await expect(users[0].Token2.transfer(users[1].address, 1)).to.be.revertedWith("Transfer less than balance");
        expect(await Token2.balanceOf(users[1].address)).to.equal(0);
    });
});


// import { expect } from "./chai-setup";
// import { ethers, deployments, getNamedAccounts } from 'hardhat';

// describe("Token2 Contract", function () {
//     it("Deployment should assign the total supply of tokens / 10 to owner", async function () {
//         const [owner] = await ethers.getSigners();
//         const Token2 = await ethers.getContractFactory("Token2");
//         const hardhatToken = await Token2.deploy();
//         const ownerBalance = await hardhatToken.balanceOf(owner.address);
//         expect(await hardhatToken.totalSupply() / 10).to.equal(ownerBalance);
//     });
//     describe("Transactions", function () {
//         it("Should transfer tokens between accounts", async function () {
//             // adding addrs to test a transaction
//             const [owner, addr1, addr2] = await ethers.getSigners();
//             // creating a factory for instances of our contract
//             const Token = await ethers.getContractFactory("Token");
//             // deploying an instance of our contract
//             const hardhatToken = await Token.deploy();
//             // Transfer 50 tokens from owner to addr1
//             await hardhatToken.transfer(addr1.address, 50);
//             expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);
//             // Transfer 50 tokens from addr1 to addr2
//             await hardhatToken.connect(addr1).transfer(addr2.address, 50);
//             expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
//         });

//     });

// });
