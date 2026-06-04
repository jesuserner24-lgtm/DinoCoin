const { ethers } = require("ethers");
const fs = require("fs");
require("dotenv").config();

async function main() {
    //Validación de variables de entorno
    if (!process.env.RPC_URL || !process.env.PRIVATE_KEY) {
        console.error("Variables de entorno inexistentes o incorrectas");
        process.exit(1);
    }

    //Conexión a la red y creación de la wallet
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    console.log("Desplegando contrato con la cuenta:", wallet.address);

    //Compilación del contrato
    const artifactPath = "./out/DinoCoin.sol/DinoCoin.json";
    if (!fs.existsSync(artifactPath)) {
        console.error("Error de compilación: No se encontró el artefacto del contrato. Asegúrate de compilar el contrato antes de desplegarlo.");
        process.exit(1);
    }

    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
    const abi = artifact.abi;
    const bytecode = artifact.bytecode.object;

    //instanciación del contrato y despliegue
    const DinoCoinFactory = new ethers.ContractFactory(abi, bytecode, wallet);
    
    console.log("Enviando transacción de despliegue...");
    const contract = await DinoCoinFactory.deploy();
    
    //minado de bloque y obtención de la dirección del contrato
    await contract.waitForDeployment();
    const contractAddress = await contract.getAddress();

    console.log("¡Contrato DinoCoin desplegado con éxito!");
    console.log("Dirección del contrato:", contractAddress);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});