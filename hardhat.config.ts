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
        version: "0.4.21",
        settings: {},
      },
    ],
  },
  namedAccounts: {
    deployer: 0,
  },
};
export default config;
