import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;

    const { deployer } = await getNamedAccounts();

    await deploy('TokenBankChallenge', {
        from: deployer,
        gasLimit: 4000000,
        args: ['0xF65426fFE174E0F636A8F739d7a2196D9A44Eda9'],
        log: true,
    });
};
export default func;
func.tags = ['TokenBankChallenge'];
