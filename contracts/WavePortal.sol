// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    //This state variable is saved permanently on the contract
    uint256 totalWaves;

    /*
     * Um pouco de mágica, use o Google para entender o que são eventos em Solidity!
     */
    event NewWave(address indexed from, uint256 timestamp, string message);

    /*
     * Crio um struct Wave.
     * Um struct é basicamente um tipo de dados customizado onde nós podemos customizar o que queremos armazenar dentro dele
     */
    struct Wave {
        address waver; // Endereço do usuário que deu tchauzinho
        string message; // Mensagem que o usuário envio
        uint256 timestamp; // Data/hora de quando o usuário tchauzinhou.
    }

    /*
     * Declara a variável waves que permite armazenar um array de structs.
     * Isto que me permite armazenar todos os tchauzinhos que qualquer um tenha me enviado!
     */
    Wave[] waves;

    constructor() {
        console.log("SmartContract Started. Let's the game begin");
    }

    function wave(string memory _message) public {
        totalWaves += 1;
        //msg.sender is the user's wallet address that called the function wave
        console.log("%s May The Force Be With You! %s", msg.sender, _message);

        //push the mensage on array
        waves.push(Wave(msg.sender, _message, block.timestamp));

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