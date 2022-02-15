const { expect } = require("chai");
describe("Token Contract", function () {
	it("Deployment should assign the total supply of tokens / 2 to owner", async function () {

		// A signer in ether.js is an object that represents an Etheruem account. Its used
		// to send transactions to contract and other accounts. Here we are getting a list
		// of the accounts in the node we're connected to, which in this case is Hardhat
		// Network, and only keeping the first one.
		const [owner] = await ethers.getSigners();

		// A ContractFactory in ethers.js is an abstraction used to deploy new smart
		// contracts, so Token here is a factory for instances of our token contract
		const Token = await ethers.getContractFactory("Token");

		///Calling deploy() on a ContractFactory will start the deployment and return a 
		//Promise that resolves to a Contract. This is the object that has a method for each
		//of your smart contract functions
		const hardhatToken = await Token.deploy();

		// Once the contract is deployed, we can call our contract methods on hardHatToken
		// and use them to get the balance of the owner account by callint balanceOf()
		//
		// *note when using hardhat-ethers plugin, ContractFactory and Contract instances
		// are connected to the first signer by default. This means the account in the owner
		// variable executed the deployment, and balanceOf will show its supply
		const ownerBalance = await hardhatToken.balanceOf(owner.address);

		// He we're again using our Contract instance to call a smart contract function in
		// our solidity code. totalSupply() returns the token's supply amount
		//
		// To do this we are using "Chai" which is an assertions library. These asserting 
		// functions are called "matchers" and the ones we are using come from Waffle. This
		// is why we are using hardhat-waffle plugin, which makes asserting values for 
		// Ethereum easier
		expect(await hardhatToken.totalSupply() / 2).to.equal(ownerBalance);
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
