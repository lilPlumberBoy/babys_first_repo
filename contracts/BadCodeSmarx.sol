pragma solidity ^0.5.12;
import "./FuzzyIdentityChallenge.sol";

contract BadCodeSmarx is IName {
   function callAuthenticate(address _challenge) public {
      FuzzyIdentityChallenge(_challenge).authenticate(); 
   }
   function name() external view returns (bytes32) {
      return bytes32("smarx");
   }
}