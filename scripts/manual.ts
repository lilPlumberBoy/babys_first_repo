const hre = require("hardhat");
const { ethers } = require("@nomiclabs/hardhat-ethers");
import registry_abi from "../pools_abi.json";

async function main() {

    // convert a from hex to number
    // console.log({ _hex: '0x012a05f200', _isBigNumber: true }._hex.toString())

    // convert hex to number
    console.log(hre.ethers.BigNumber.from('0x012a05f200').toString())

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

//     name: 'NewAdminFee',
//   signature: 'NewAdminFee(uint256)',
//   topic: '0xab599d640ca80cde2b09b128a4154a8dfe608cb80f4c9399c8b954b01fd35f38',
//   args: [
//     BigNumber { _hex: '0x012a05f200', _isBigNumber: true },
//     newAdminFee: BigNumber { _hex: '0x012a05f200', _isBigNumber: true }
//   ]