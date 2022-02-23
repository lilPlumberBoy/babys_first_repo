//SPDX-License-Identifier: Unlicense   
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token2 {
    string public name = "2nd_Hardhat Token";
    string public symbol = "TH2";
    uint256 public totalSupply = 1000000;
    address public owner;
    mapping(address => uint256) balances;

    constructor() {
        balances[msg.sender] = totalSupply / 10;
        owner = msg.sender;
    }

    function transfer(address to, uint256 amount) external {
	console.log("Sender balance is %s tokens", balances[msg.sender]);
	console.log("Trying to send %s tokens to %s", amount, to);	
        require(balances[msg.sender] >= amount, "Transfer less than balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

    function faucet(address account, uint256 amount) external {
        require(amount <= address(this).balance);
        require(amount <= totalSupply / 10);
        balances[account] = amount;
    }
}
