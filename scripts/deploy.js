//Deploy the code to a Blockchain
//each time we change anythin on the code we have to deploy again to the blochchain
// To run a local endless blockchain just run in another terminal (onde the project folder) the command -> npx hardhat node
// To localy deploy on the blockchain just run -> npx hardhat run scripts/deploy.js --network localhost
const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
      value: hre.ethers.utils.parseEther("0.1"),
    });

    await waveContract.deployed();

    console.log("Endereço do WavePortal: ", waveContract.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  runMain();