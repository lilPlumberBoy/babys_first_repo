pragma solidity ^0.5.12;

interface IName {
    function name() external view returns (bytes32);
}

contract FuzzyIdentityChallenge {
    bool public isComplete;

    function authenticate() public {
        require(isSmarx(msg.sender));
        require(isBadCode(msg.sender));

        isComplete = true;
    }

    function isSmarx(address addr) internal view returns (bool) {
        return IName(addr).name() == bytes32("smarx");
    }

    // My main confusion comes here, i understand << is moving the bytes around
    // bitwise operators here: https://medium.com/@imolfar/bitwise-operations-and-bit-manipulation-in-solidity-ethereum-1751f3d2e216
    function isBadCode(address _addr) internal pure returns (bool) {
        bytes20 addr = bytes20(_addr); //qwert3468976kjdshfgkdfj
        bytes20 id = hex"000000000000000000000000000000000badc0de";
        bytes20 mask = hex"000000000000000000000000000000000fffffff";

        for (uint256 i = 0; i < 34; i++) {
            // addr & mask is explained in the bytewise operator page above
            // the & will only take the bits from our addr in the positions of the 'f's of the mask
            // The '==' then compares this to id, which contains our target bits
            // finally if this comparison fails, <<= will move the target bits one
            // space to the left, then does the comparison again
            if (addr & mask == id) {
                return true;
            }
            mask <<= 4;
            id <<= 4;
        }

        return false;
    }
}
