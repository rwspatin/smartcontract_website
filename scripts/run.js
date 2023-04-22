//Deploy.js create a local blockchain and destroy it when finish runnig
const main = async () => {
    //Get the owner's wallet address and get a random address wallet
    const [owner, randomPerson] = await hre.ethers.getSigners();

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
    //Show the contract deployer's address
    console.log("Contract deployed by:", owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();
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