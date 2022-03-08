const { ethers } = require("ethers");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    await deploy('GuessTheNumberChallenge', {
        from: deployer,
        args: [],
        gasLimit: 4000000,
        value: ethers.utils.parseEther("1"),
        log: true,
    });
};
module.exports.tags = ['GuessTheNumberChallenge'];

