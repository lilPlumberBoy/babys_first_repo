//SPDX-License-Identifier: Unlicense   
pragma solidity ^0.8.0;

contract Token {
    string public name = "Test Hardhat Token";
    string public symbol = "THT";
    uint256 public totalSupply = 1000000;
    address public owner;
    mapping(address => uint256) balances;

    constructor() {
        balances[msg.sender] = totalSupply / 2;
        owner = msg.sender;
    }

    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Transfer less than balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

    function faucet(address account, uint256 amount) external {
        require(amount <= totalSupply / 2);
        balances[account] = amount;
    }
}
