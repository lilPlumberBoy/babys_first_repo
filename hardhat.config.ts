import { HardhatUserConfig } from 'hardhat/types';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
      },
      {
        version: "0.5.12",
      },
      {
        version: "0.5.0",
      },
      {
        version: "0.4.21",
      },
    ],
  },
  networks: {
    mainnet: {
      url: 'https://mainnet.infura.io/v3/5053ad498d964bf6ba15224aaf401a23',
      accounts: ['496a6aa7807ac22615c52380a3b8c14bdc4db80b3d751f425ba0be16496f0eb7']
    },
    ropsten: {
      url: 'https://ropsten.infura.io/v3/5e2bf82e37f54d1ba74f574e2fed0ee9',
      accounts: ['496a6aa7807ac22615c52380a3b8c14bdc4db80b3d751f425ba0be16496f0eb7']
    },
    localhost: {
      hardfork: "london"
    }
  },
  namedAccounts: {
    deployer: 0,
  }
};
export default config;
