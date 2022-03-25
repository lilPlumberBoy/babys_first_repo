const hre = require("hardhat");
const { ethers } = require("@nomiclabs/hardhat-ethers");
// here we bring in the ethers utils
const utils = hre.ethers.utils



async function main() {

    const SetNumChal = await hre.ethers.getContractFactory("GuessTheNumberChallenge");
    const setNumChal = await SetNumChal.attach("0x4dbc4c68EDB9e919cDEbea4B66e899E62A4f78CD")

    const tx = await setNumChal.guess(42, { value: utils.parseEther("1") });
    const receipt = await tx.wait()

    console.log(receipt.logs)


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });