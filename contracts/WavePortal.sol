// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    //This state variable is saved permanently on the contract
    uint256 totalWaves;

    //Random number controll
    uint256 private seed;

    /*
     * Um pouco de mágica, use o Google para entender o que são eventos em Solidity!
     */
    event NewWave(address indexed from, uint256 timestamp, string message);

    /*
     * Creatimg Wave struct.
     * Struct is a base data customized type where we can customize what we want to save
     */
    struct Wave {
        address waver; // address of the user that interact
        string message; // message of the user
        uint256 timestamp; // the time of the interaction
    }

    /*
     * Declaration of the wave variable that able we to save the struct array.
     * That able us to save all the waves that anyone has sended
     */
    Wave[] waves;

    // payable set the contructor to be possible send amount to person who interact
    constructor() payable{
        console.log("SmartContract Started. Let's the game begin");

        //here we set the initial seed
        // block.difficulty is the difficulty of the block based on the block transactions
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {
        totalWaves += 1;
        //msg.sender is the user's wallet address that called the function wave
        console.log("%s May The Force Be With You! %s", msg.sender, _message);

        //push the mensage on array
        waves.push(Wave(msg.sender, _message, block.timestamp));

        //create a new seed every time any interaction happen
        // this make the random number be in a range of 0 to 100
        seed = (block.difficulty + block.timestamp + seed) % 100;

        console.log("# random generated: %d", seed);

        /*
         * Here we give a 50%  chance of the user receive the amount.
         */
        if (seed <= 50) {
            console.log("%s winner!", msg.sender);

            /*
             * O mesmo código que tínhamos anteriormente para enviar o prêmio.
             */
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Try to get more than the contract has"
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Fail when tried to get the amount of the contract");
        }

        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d 'people been one with the force'!", totalWaves);
        return totalWaves;
    }

    function getAllWaves() public view returns (Wave[] memory){
        return waves;
    }
}