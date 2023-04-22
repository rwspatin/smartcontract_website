//Deploy the code to a Blockchain
//each time we change anythin on the code we have to deploy again to the blochchain
// To run a local endless blockchain just run in another terminal (onde the project folder) the command -> npx hardhat node
// To localy deploy on the blockchain just run -> npx hardhat run scripts/deploy.js --network localhost
const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
  
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());
  
    const Token = await hre.ethers.getContractFactory("WavePortal");
    const portal = await Token.deploy();
    await portal.deployed();
  
    console.log("WavePortal address: ", portal.address);
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