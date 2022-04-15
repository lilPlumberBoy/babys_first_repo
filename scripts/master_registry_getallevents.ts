const hre = require("hardhat");
const { ethers } = require("@nomiclabs/hardhat-ethers");
import registry_abi from "../master_registry_abi.json";

async function main() {

    // Set up ethereum provider
    const registry = await hre.ethers.getContractAt(registry_abi, "0xc5ad17b98D7fe73B6dD3b0df5b3040457E68C045");

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