require("@nomiclabs/hardhat-waffle");
require('hardhat-deploy');
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-web3");


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("balance", "Prints an account's ether balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs) => {
    const account = web3.utils.toChecksumAddress(taskArgs.account);
    const balance = await web3.eth.getBalance(account);

    console.log(web3.utils.fromWei(balance, "ether"), "ETH");
  });

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const INFURA_API_KEY = "5e2bf82e37f54d1ba74f574e2fed0ee9";

const ROPSTEN_PRIVATE_KEY = "496a6aa7807ac22615c52380a3b8c14bdc4db80b3d751f425ba0be16496f0eb7";

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
      },
      {
        version: "0.4.21",
        settings: {},
      },
    ],
  },
  networks: {
    ropsten: {
      url: 'https://ropsten.infura.io/v3/5e2bf82e37f54d1ba74f574e2fed0ee9',
      accounts: ['496a6aa7807ac22615c52380a3b8c14bdc4db80b3d751f425ba0be16496f0eb7']
    }
  },
  ethereum: {
    url: 'https://mainnet.infura.io/v3/5053ad498d964bf6ba15224aaf401a23',
    accounts: ['']
  },
  namedAccounts: {
    deployer: 0
  },
};
