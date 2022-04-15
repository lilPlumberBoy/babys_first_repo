const hre = require("hardhat");
const { ethers } = require("@nomiclabs/hardhat-ethers");
import registry_abi from "../pool_registry_abi.json";

async function main() {

    // Set up ethereum provider
    const registry = await hre.ethers.getContractAt(registry_abi, "0xFb4DE84c4375d7c8577327153dE88f58F69EeC81");

    // Find legth of registry
    const registryLength = (await registry.getPoolsLength()).toString();
    console.log(registryLength);

    // Get PoolDataAtIndex for each pool index and append to list
    let poolDataList = [];
    for (let i = 0; i < registryLength; i++) {
        const poolData = await registry.getPoolDataAtIndex(i);
        poolDataList.push(poolData);
    }
    console.log(poolDataList);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });