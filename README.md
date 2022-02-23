# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
```
get project spun up local node:
1. npx hardhat node
    - starts a local node with 10 accounts with 1000 ether each
    - automatically runs delpoy scripts found in /deploy
2. npx hardhat console —network localhost
    - enters hardhat console, we can use commands similar to a script or task
        - const Token = await ethers.getContractFactory(’Token’); <- instance of contract object
        - const Token = await Token.attach(’<address of contracted delpoyed>’) <- assign this object to an address (contract address of your deployed contract)
        - await Token.balanceOf(’0x...’) gives token balance of a given account address
        - can also do: 
            - const accounts = await hre.ethers.getSigners(); <- allows access to ethers accounts
            - await Token.balanceOf(accounts[3].address).toString() <- gets token balance of account 3

```