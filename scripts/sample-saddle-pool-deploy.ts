import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
//gets address from folder with hardcoded multisig address
import { FANTOM_MULTISIG_ADDRESS } from "../../utils/accounts"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre
    // execute: executes function call on contract -> 
    //    execute(
    //      name: name of contract to call on
    //      options: Transaction options({from: address, ...}),
    //      methodName: string (method you want to call),
    //      ...args: any[] (any number of args the function takes
    //      )
    //  get:
    //    get(name: string) -> Promise<Deployment>; fetch a deployment by name, throw error if it doesnt exist
    //  getOrNull:
    //     getOrNull(name: string) -> Promise<Deployment>; fetch a deployment by name, return null if not exist
    //  log:
    //    log(...args: any[]): void; log data to deploy terminal
    //  read: same as execute but makes a read-only call to a contract
    //  save: (name: string, deployment: DeploymentSubmission): Promise<void>; : saves the deployment under name
    const { execute, get, getOrNull, log, read, save } = deployments
    const { deployer } = await getNamedAccounts()

    // Manually check if the pool is already deployed
    // Below resolves to the deployment by that name, or returns null if not deployed
    const saddleFtmUSDPool = await getOrNull("SaddleFtmUSDPool")
    if (saddleFtmUSDPool) {
        log(`reusing "SaddleFtmUSDPool" at ${saddleFtmUSDPool.address}`)
    } else {
        // Constructor arguments
        const TOKEN_ADDRESSES = [
            // these deployments occur from 'deploy/mainnet/999_impersonate_owners.ts
            // it mocks a deployment of the tokens to pass those active addresses to multiple deploy scripts
            (await get("FRAX")).address,
            (await get("USDC")).address,
        ]
        const TOKEN_DECIMALS = [18, 6]
        const LP_TOKEN_NAME = "Saddle FRAX/USDC"
        const LP_TOKEN_SYMBOL = "saddleFtmUSD"
        const INITIAL_A = 400
        const SWAP_FEE = 4e6 // 4bps
        // guess we are a charity, go defi community
        const ADMIN_FEE = 0

        // calls the SwapFlashLoan contract, specifically calls the initalize function. This also calls Swap from Swap Utils and 
        // is given all tokens for this pool. Essentially creates the pool with these given paramters
        await execute(
            "SwapFlashLoan",
            // cannot find documentation on waitConfirmations**, but im assuming it waits (maybe 3 blocks?) untill this creation is confirmed
            { from: deployer, log: true, waitConfirmations: 3 },
            "initialize",
            TOKEN_ADDRESSES,
            TOKEN_DECIMALS,
            LP_TOKEN_NAME,
            LP_TOKEN_SYMBOL,
            INITIAL_A,
            SWAP_FEE,
            ADMIN_FEE,
            // gets the address from the generic LP token contract, confused on this since each pool would have a different LP token but
            // would all be referenceing the same LP token address? Im assuming the LP token initalize is called during Swap (pool creation)
            // but still confused about what address this exactly is?
            // after some digging...
            // LPToken lpToken = LPToken(Clones.clone(lpTokenTargetAddress)); is found in the swap contract, so the first LP token is used as the clone factory
            (
                await get("LPToken")
            ).address,
        )
        // saves this deployment in 'deployment/' to be accessed by hardhat in other areas
        await save("SaddleFtmUSDPool", {
            abi: (await get("SwapFlashLoan")).abi,
            address: (await get("SwapFlashLoan")).address,
        })
        //gets the LP token address specific to this pool, above we see that the Swap clones the OG LP token contract, so this is a new addr
        const lpTokenAddress = (await read("SaddleFtmUSDPool", "swapStorage"))
            .lpToken
        log(`Saddle Fantom USD Pool LP Token at ${lpTokenAddress}`)
        // saves this address in hardhat to be used later
        await save("SaddleFtmUSDPoolLPToken", {
            abi: (await get("LPToken")).abi, // LPToken ABI
            address: lpTokenAddress,
        })
        // transfers owership from deployer (Saddle Factory deployer) to the Fantom Multisig address (the final owner of the contract)
        await execute(
            "SaddleFtmUSDPool",
            { from: deployer, log: true },
            "transferOwnership",
            FANTOM_MULTISIG_ADDRESS,
        )
    }
}
export default func
func.tags = ["SaddleFtmUSDPool"]
// needs these to be deployed before starting this deployment, "FtmUSDPoolTokens" comes from "110_check_FtmUSDPoolTokens.ts" deploy script
func.dependencies = ["SwapUtils", "SwapFlashLoan", "FtmUSDPoolTokens"]