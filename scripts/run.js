//Deploy.js create a local blockchain and destroy it when finish runnig
const main = async () => {
    //Locate the Smart contract
    //O Hardhat Runtime Environment, ou HRE abreviado, é um objeto que contém todas as funcionalidades que a Hardhat expõe ao executar uma tarefa, teste ou script. Na realidade, Hardhat é o HRE.
    //HRE doc link -> https://hardhat.org/hardhat-runner/docs/advanced/hardhat-runtime-environment
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    
    //Create a simulated local blockchain
    //Set amount on the contract
    const waveContract = await waveContractFactory.deploy({
      value: hre.ethers.utils.parseEther("0.1"),
    });

    //wait until the simulated blockchain is ready to go
    await waveContract.deployed();

    //Show where this blockchain is located
    console.log("Contract deployed to:", waveContract.address);

    /*
    * Get the amount of the contract
    */
    let contractBalance = await hre.ethers.provider.getBalance(
      waveContract.address
    );
    console.log(
      "Contract amount:",
      hre.ethers.utils.formatEther(contractBalance)
    );

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log("Interactions count:", waveCount.toNumber())

    /*
    Sending a interactions with message
    */
    let waveTxn = await waveContract.wave("I'm one with the force and the force is with me 1");
    await waveTxn.wait(); //storing the message to be minered

    /*
    Sending a interactions with message
    */
    let waveTxn2 = await waveContract.wave("I'm one with the force and the force is with me 2");
    await waveTxn2.wait(); //storing the message to be minered

    //Get the owner's wallet address and get a random address wallet
    const [_, randomPerson] = await hre.ethers.getSigners();

    waveTxn = await waveContract.connect(randomPerson).wave("Maibe a sith here");
    await waveTxn.wait(); //storing another message to be minered

    /*
    * Get the new amount on the contract
    */
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
      "New Contract amount:",
      hre.ethers.utils.formatEther(contractBalance)
    );

    let allWaives = await waveContract.getTotalWaves();
    let waivesList = await waveContract.getAllWaves();
    console.log("All interactions: ", allWaives);
    console.log("List of interactions: ", waivesList)
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  //To run this type on terminal -> npx hardhat run scripts/run.js
  runMain();