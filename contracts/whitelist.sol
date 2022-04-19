//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract Whitelist {
    bytes32 public merkleRoot =
        0xb0d63c211bd098f173092331334aa442a0e7cae931a869fd9795ba393e29bd47;

    function checkWhitelist(bytes32[] calldata _hexProof)
        public
        view
        returns (bool)
    {
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(
            MerkleProof.verify(_hexProof, merkleRoot, leaf),
            "Not whitelisted"
        );
        return true;
    }
}
