const hre = require("hardhat");
const { ethers } = require("@nomiclabs/hardhat-ethers");

async function main() {

    const CallMeChal = await hre.ethers.getContractFactory("CallMeChallenge");
    const callMeChal = await CallMeChal.attach("0xBcf97d709aF78F76D7a35b7FBE534700F86DbC0C")

    // the 'await' is needed because the call to the contract takes some time, without it the constant is
    // just a promise that the call was made

    // call the callme() function on the contract
    await callMeChal.callme();

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });