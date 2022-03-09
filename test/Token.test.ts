// Import Chai to use its assertion functions
import { expect } from "./chai-setup";

// Import our utilities
import { setupUsers, setupUser } from './utils';

// Import hardhat environment field we are planning to use
import { ethers, deployments, getNamedAccounts, getUnnamedAccounts } from 'hardhat';

// create a setup function that can be called by every test and setup variable for easy to read tests
async function setup() {
	// first ensures the deployment is executed and reset (use of evm_snapshot for faster tests)
	await deployments.fixture(["Token"]);

	// we get an instantiated contract in the form of a ethers.js Contract instance:
	const contracts = {
		Token: (await ethers.getContract('Token')),
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
			const { Token } = await setup()

			//This test expects the owner of the contract to be the deployer
			const { deployer } = await getNamedAccounts();
			expect(await Token.owner()).to.equal(deployer)
		});

		it("Should assign half the total supply of tokens to the owner", async function () {
			const { Token, deployer } = await setup();
			expect(await Token.balanceOf(deployer.address)).to.equal(await Token.totalSupply() / 2)
		});
	});
});

describe("Transactions", function () {
	it("Should transfer 50 tokens between accounts", async function () {
		const { Token, deployer, users } = await setup()
		// Transfer 50 tokens to users[2]

		// initial value of sender wallet
		const initialsenderbal = Token.balanceOf(deployer.address)
		// expect user to have 0 tokens before
		expect(await Token.balanceOf(users[2].address)).to.equal(0);
		// Transfer tokens to account
		await deployer.Token.transfer(users[2].address, 50);
		// expect tokens to now be 50
		expect(await Token.balanceOf(users[2].address)).to.equal(50);
		expect(await Token.balanceOf(deployer.address)).to.equal(await initialsenderbal - 50);
	});

	it("Should fail if sender doesn't have enough tokens", async function () {
		const { Token, users } = await setup()
		await expect(users[0].Token.transfer(users[1].address, 1)).to.be.revertedWith("Transfer less than balance");
		expect(await Token.balanceOf(users[1].address)).to.equal(0);
	});
});
