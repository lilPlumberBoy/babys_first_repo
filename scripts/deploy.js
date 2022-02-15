async function main() {
	const [deployer] = await ethers.getSigners();

	console.log("Deploying contracts with the account:", deployer.address);

	console.log("Account balance:", (await deployer.getBalance()).toString());

        const Token = await ethers.getContractFactory("Token");
	const token = await Token.deploy();
	const Greeter = await ethers.getContractFactory("Greeter");
	const greeter = await Greeter.deploy('greeting inserted');
	await token.deployed();
	await greeter.deployed();

	console.log("Greeter deployed to:", greeter.address);
	console.log("Token deployed to:", token.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
