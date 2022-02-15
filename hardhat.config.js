require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const INFURA_API_KEY = "5e2bf82e37f54d1ba74f574e2fed0ee9";

const ROPSTEN_PRIVATE_KEY = "496a6aa7807ac22615c52380a3b8c14bdc4db80b3d751f425ba0be16496f0eb7";

module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: 'https://ropsten.infura.io/v3/5e2bf82e37f54d1ba74f574e2fed0ee9',
      accounts: ['496a6aa7807ac22615c52380a3b8c14bdc4db80b3d751f425ba0be16496f0eb7']
    }
  }
};
