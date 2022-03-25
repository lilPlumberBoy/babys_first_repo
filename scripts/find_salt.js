const eth = require('ethereumjs-util')

// 0xff ++ deployingAddress is fixed:
var string1 = '0x0165878A594ca255338adfa4d48449f69242Eb8F'

// Hash of the bytecode is fixed. Calculated with eth.keccak256():
var string2 = '608060405234801561001057600080fd5b5061015d806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806306fdde031461003b5780637872ab4914610059575b600080fd5b61004361009d565b6040518082815260200191505060405180910390f35b61009b6004803603602081101561006f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506100c5565b005b60007f736d617278000000000000000000000000000000000000000000000000000000905090565b8073ffffffffffffffffffffffffffffffffffffffff1663380c7a676040518163ffffffff1660e01b8152600401600060405180830381600087803b15801561010d57600080fd5b505af1158015610121573d6000803e3d6000fd5b505050505056fea265627a7a723158200644fff801e040de27938ecb49cc047c3e59ed3ab7ff4de934097ea750fec52c64736f6c634300050c0032'

// In each loop, i is the value of the salt we are checking
for (var i = 0; i < 72057594037927936; i++) {
    // 1. Convert i to hex, and it pad to 32 bytes:
    var saltToBytes = i.toString(16).padStart(64, '0')

    // 2. Concatenate this between the other 2 strings
    var concatString = string1.concat(saltToBytes).concat(string2)

    // 3. Hash the resulting string (this is the actual formula for 
    //    determining the address that the contract will deploy)
    var hashed = eth.bufferToHex(eth.keccak256(concatString))

    // 4. Remove leading 0x and 12 bytes
    // 5. Check if the result contains badc0de
    if (hashed.substr(26).includes('badc0de')) {
        console.log(hashed.substr(26))
        console.log(hashed)
        console.log(saltToBytes)
        break
    }
}