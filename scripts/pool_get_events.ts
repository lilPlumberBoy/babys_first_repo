const hre = require("hardhat");
const { ethers } = require("@nomiclabs/hardhat-ethers");
import registry_abi from "../pools_abi.json";

async function main() {

    // Set up ethereum provider
    const registry = await hre.ethers.getContractAt(registry_abi, "0xaCb83E0633d6605c5001e2Ab59EF3C745547C8C7");

    // Get all AddRegistry events
    const provider = hre.ethers.provider;

    const filter = {
        address: registry.address,
        fromBlock: 0,
        toBlock: 'latest',
    };
    const filtered_logs = await provider.getLogs(filter);

    // Setup interface for registry
    const iface = new hre.ethers.utils.Interface(registry_abi)
    // Parse each log into a readable event
    for (let i = 0; i < filtered_logs.length; i++) {
        const decoded = iface.parseLog(filtered_logs[i]);
        console.log(decoded);
    }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });