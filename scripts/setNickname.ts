const hre = require("hardhat");
const { ethers } = require("@nomiclabs/hardhat-ethers");
const utils = hre.ethers.utils



async function main() {

    const SetNicknameChal = await hre.ethers.getContractFactory("nicknameOfChallenge");
    const setNicknameChal = await SetNicknameChal.attach("0xf49Db1846Dd2bFf97b4606F1904B1393A0c44087")

    const tx = await setNicknameChal.setNickname(utils.formatBytes32String("Dirk Diggler"));
    const receipt = await tx.wait()

    console.log(receipt.logs)


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });