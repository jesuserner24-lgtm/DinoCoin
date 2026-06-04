DinoCoin (DNC) - ERC-20 Smart Contract & DApp

DinoCoin es un token ERC-20 avanzado diseñado con altos estándares de seguridad y optimización bajo el ecosistema de Solidity y Foundry. El proyecto incluye un contrato inteligente robusto con funciones administrativas de control de acceso, congelamiento de fondos (blacklist), pausado global y una suite de pruebas automatizadas con cobertura del 100%.

Características Principales

Estándar ERC-20: Implementación basada en las librerías seguras de OpenZeppelin.

Control de Suministro Estricto: Suministro máximo fijo de 5,000,000 de tokens.

Mecanismo de Quema (Burnable): Permite la destrucción opcional de tokens por parte de los usuarios.

Módulo de Pausa (Pausable): Capacidad de detener todas las transferencias del token de manera global en caso de emergencia.

Lista Negra (Blacklist): Funcionalidad administrativa para bloquear direcciones específicas (remitentes o receptores) involucradas en actividades maliciosas o auditorías.

Garantías de Seguridad: Cumplimiento estricto del patrón Checks-Effects-Interactions (CEI), uso exclusivo de `msg.sender` sobre `tx.origin`, y protección nativa contra desbordamientos (overflows/underflows).

---

Estructura del Proyecto

El repositorio mantiene una estructura híbrida optimizada para el desarrollo de contratos inteligentes con Foundry y una interfaz web nativa:

mi-token/
├── contracts/                  # Contratos inteligentes en Solidity
│   ├── DinoCoin.sol            # Token ERC-20 principal con lógica avanzada
├── frontend/                   # Interfaz de usuario (DApp)
│   ├── index.html              # Estructura visual de la interfaz
│   ├── style.css               # Estilos de la aplicación
│   ├── app.js                  # Lógica de integración con Ethers.js
│   └── abi.json                # ABI del contrato para la interacción Web3
├── test/                       # Suite de pruebas automatizadas
│   └── DinoCoin.t.sol          # Tests unitarios en Solidity (Foundry)
├── scripts/                    # Scripts de automatización
│   └── deploy.js               # Script de despliegue en JavaScript (Ethers.js)
├── .env                        # Variables de entorno y llaves privadas (Local)
├── .gitignore                  # Exclusiones de Git para seguridad y optimización
├── foundry.toml                # Configuración del compilador y entornos de Forge
└── package.json                # Dependencias de Node.js y scripts del proyecto

Requisitos necesarios:

--Node.js
--Foundry/Forge
--Wallet metamask

----INSTALAR DEPENDENCIAS NODE.JS----

npm install

----SUBMODULOS DE FOUNDRY PARA OPENZEPPELIN----

forge install openzeppelin/openzeppelin-contracts --no-commit

----VARIABLES EN ARCHIVO .ENV----

PRIVATE_KEY= clave privada de billetera
RPC_URL= api key de alchemy o infiura



## EJECUCIÓN DE TESTS UNITARIOS ##

----COMPILACIÓN DE CONTRATO----

npm run compile

----EJECUCION DE TEST UNITARIOS----

npm run test 

----GENERACION DE REPORTE DE COBERTURA----

npm run coverage


## DESPLIEGUE ##

node scripts/deploy.js
