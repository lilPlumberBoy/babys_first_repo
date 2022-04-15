const hre = require("hardhat");
const { ethers } = require("@nomiclabs/hardhat-ethers");
const formatBytes32String = hre.ethers.utils.formatBytes32String
const parseBytes32String = hre.ethers.utils.parseBytes32String
const toNumber = hre.ethers.utils.toNumber

async function main() {

    const Registry = await hre.ethers.getContractFactory("registry");
    const registry = await Registry.attach("0xa513E6E4b8f2a923D98304ec87F64353C4D5C853");

    // addRegistry
    await registry.addRegistry(formatBytes32String('SaddleUSDPool'), '0x0C8BAe14c9f9BF2c953997C881BEfaC7729FD314');
    await registry.addRegistry(formatBytes32String('SaddleUSDPool'), '0x3911F80530595fBd01Ab1516Ab61255d75AEb066');

    // resolveNameToLatestAddress
    console.log('resolveNameToLatestAddress: ', await registry.resolveNameToLatestAddress(formatBytes32String('SaddleUSDPool')))

    // resolveNameAndVersionToAddress
    console.log('resolveNameAndVersionToAddress: ', await registry.resolveNameAndVersionToAddress(formatBytes32String('SaddleUSDPool'), 0))

    // resolveNameToAllAddresses
    console.log('resolveNameToAllAddresses: ', await registry.resolveNameToAllAddresses(formatBytes32String('SaddleUSDPool')))
    console.log('USDv2: ', formatBytes32String('USDv2'))
    // resolveAddressToRegistryData
    const reg_data = await registry.resolveAddressToRegistryData('0x3911F80530595fBd01Ab1516Ab61255d75AEb066')
    const name = parseBytes32String(reg_data['name'])
    const version = reg_data['version'].toNumber()
    const isLatest = reg_data['isLatest']
    console.log('name: ', name, ' version: ', version, ' isLatest: ', isLatest)


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });