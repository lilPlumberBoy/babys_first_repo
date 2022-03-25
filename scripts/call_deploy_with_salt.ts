const hre = require("hardhat");
const { ethers } = require("@nomiclabs/hardhat-ethers");
// here we bring in the ethers utils
const utils = hre.ethers.utils

async function main() {

    const FuzzyIdChal = await hre.ethers.getContractFactory("FuzzyId_Deployer");
    const fuzzyIdChal = await FuzzyIdChal.attach("0x5FC8d32690cc91D4c39d9d3abcBD16989F875707");
    const tx = await fuzzyIdChal.deploy('0x0000000000000000000000000000000000000000000000000000000000408984');
    //  00000000000000000000000000000000000000000000000000000000002cdbca 
    console.log('deployed address: ',await tx.wait());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });