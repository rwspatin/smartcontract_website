// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    //This state variable is saved permanently on the contract
    uint256 totalWaves;

    constructor() {
        console.log("SmartContract Started. Let's the game begin");
    }

    function wave() public {
        totalWaves += 1;
        //msg.sender is the user's wallet address that called the function wave
        console.log("%s May The Force Be With You!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d 'people been one with the force'!", totalWaves);
        return totalWaves;
    }
}