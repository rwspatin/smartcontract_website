const main = async () => {
    //Locate the Smart contract
    //O Hardhat Runtime Environment, ou HRE abreviado, é um objeto que contém todas as funcionalidades que a Hardhat expõe ao executar uma tarefa, teste ou script. Na realidade, Hardhat é o HRE.
    //HRE doc link -> https://hardhat.org/hardhat-runner/docs/advanced/hardhat-runtime-environment
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    //Create a simulated local blockchain
    const waveContract = await waveContractFactory.deploy();
    //wait until the simulated blockchain is ready to go
    await waveContract.deployed();
    //Show where this blockchain is located
    console.log("Contract deployed to:", waveContract.address);
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