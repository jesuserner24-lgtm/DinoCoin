const CONTRACT_ADDRESS = "0x6bb61eEde1fA66a306257b4577B85912ad5e01cc";
const SEPOLIA_CHAIN_ID = "0xaa36a7";

const ABI = [{"type":"constructor","inputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"MAX_SUPPLY","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"allowance","inputs":[{"name":"owner","type":"address","internalType":"address"},{"name":"spender","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"approve","inputs":[{"name":"spender","type":"address","internalType":"address"},{"name":"value","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"nonpayable"},{"type":"function","name":"balanceOf","inputs":[{"name":"account","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"blacklist","inputs":[{"name":"_addr","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"blacklistRemove","inputs":[{"name":"_addr","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"blacklisted","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"burn","inputs":[{"name":"value","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"burnFrom","inputs":[{"name":"account","type":"address","internalType":"address"},{"name":"value","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"decimals","inputs":[],"outputs":[{"name":"","type":"uint8","internalType":"uint8"}],"stateMutability":"view"},{"type":"function","name":"mint","inputs":[{"name":"to","type":"address","internalType":"address"},{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"name","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"pause","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"paused","inputs":[],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"renounceOwnership","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"symbol","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"totalSupply","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"transfer","inputs":[{"name":"to","type":"address","internalType":"address"},{"name":"value","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"nonpayable"},{"type":"function","name":"transferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"value","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"nonpayable"},{"type":"function","name":"transferOwnership","inputs":[{"name":"newOwner","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"unpause","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"event","name":"AddressBlacklisted","inputs":[{"name":"account","type":"address","indexed":true,"internalType":"address"},{"name":"isBlacklisted","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"event","name":"Approval","inputs":[{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"spender","type":"address","indexed":true,"internalType":"address"},{"name":"value","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"name":"previousOwner","type":"address","indexed":true,"internalType":"address"},{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"Paused","inputs":[{"name":"account","type":"address","indexed":false,"internalType":"address"}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"name":"from","type":"address","indexed":true,"internalType":"address"},{"name":"to","type":"address","indexed":true,"internalType":"address"},{"name":"value","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"Unpaused","inputs":[{"name":"account","type":"address","indexed":false,"internalType":"address"}],"anonymous":false},{"type":"error","name":"ERC20InsufficientAllowance","inputs":[{"name":"spender","type":"address","internalType":"address"},{"name":"allowance","type":"uint256","internalType":"uint256"},{"name":"needed","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"ERC20InsufficientBalance","inputs":[{"name":"sender","type":"address","internalType":"address"},{"name":"balance","type":"uint256","internalType":"uint256"},{"name":"needed","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"ERC20InvalidApprover","inputs":[{"name":"approver","type":"address","internalType":"address"}]},{"type":"error","name":"ERC20InvalidReceiver","inputs":[{"name":"receiver","type":"address","internalType":"address"}]},{"type":"error","name":"ERC20InvalidSender","inputs":[{"name":"sender","type":"address","internalType":"address"}]},{"type":"error","name":"ERC20InvalidSpender","inputs":[{"name":"spender","type":"address","internalType":"address"}]},{"type":"error","name":"EnforcedPause","inputs":[]},{"type":"error","name":"ExpectedPause","inputs":[]},{"type":"error","name":"OwnableInvalidOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"OwnableUnauthorizedAccount","inputs":[{"name":"account","type":"address","internalType":"address"}]}];

let provider, signer, contract;
let tokenDecimals = 18;

// Utilidades 
function setStatus(msg, type = "") {
  const bar = document.getElementById("status-bar");
  bar.className = type;
  document.getElementById("status-text").textContent = msg;
  document.getElementById("tx-link-container").innerHTML = "";
}

function setTxStatus(hash) {
  setStatus("Transacción enviada: " + hash.slice(0, 18) + "…", "pending");
  const container = document.getElementById("tx-link-container");
  const link = document.createElement("a");
  link.href = "https://sepolia.etherscan.io/tx/" + hash;
  link.target = "_blank";
  link.className = "tx-link";
  link.textContent = "ver en Etherscan ↗";
  container.appendChild(link);
}

function toggle(id) {
  document.getElementById(id).classList.toggle("open");
}

function shortAddr(addr) {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

function toUnits(amount) {
  return ethers.utils.parseUnits(String(amount), tokenDecimals);
}

function fromUnits(amount) {
  return ethers.utils.formatUnits(amount, tokenDecimals);
}

// Error decoder 
const ERROR_NAMES = {
  "EnforcedPause":              "El contrato está pausado.",
  "ExpectedPause":              "El contrato no está pausado.",
  "OwnableUnauthorizedAccount": "No eres el owner del contrato.",
  "ERC20InsufficientBalance":   "Balance insuficiente.",
  "ERC20InsufficientAllowance": "Allowance insuficiente.",
};

function friendlyError(e) {
  for (const [name, msg] of Object.entries(ERROR_NAMES)) {
    if (e.message && e.message.includes(name)) return msg;
    if (e.reason  && e.reason.includes(name))  return msg;
  }
  return e.reason || e.message || String(e);
}

// Wallet state helpers 
function setConnectedUI(addr) {
  document.getElementById("wallet-addr").textContent = shortAddr(addr);
  const btnC = document.getElementById("btn-connect");
  btnC.textContent = "Conectado";
  btnC.classList.add("connected");
  document.getElementById("btn-disconnect").style.display = "inline-block";
}

function setDisconnectedUI() {
  document.getElementById("wallet-addr").textContent = "";
  const btnC = document.getElementById("btn-connect");
  btnC.textContent = "Conectar MetaMask";
  btnC.classList.remove("connected");
  document.getElementById("btn-disconnect").style.display = "none";
  ["info-name","info-symbol","info-decimals","info-supply","info-maxsupply","info-paused","info-owner"]
    .forEach(id => document.getElementById(id).textContent = "—");
  document.getElementById("balance-result").textContent = "";
}

// Conexión de Wallet
async function connectWallet() {
  if (!window.ethereum) {
    setStatus("MetaMask no detectado. Instálalo primero.", "err");
    return;
  }
  try {
    setStatus("Conectando MetaMask…", "pending");

    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    });

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      });
    } catch (se) {
      if (se.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: SEPOLIA_CHAIN_ID,
            chainName: "Sepolia Test Network",
            rpcUrls: ["https://rpc.sepolia.org"],
            nativeCurrency: { name: "SepoliaETH", symbol: "SEP", decimals: 18 },
            blockExplorerUrls: ["https://sepolia.etherscan.io"],
          }],
        });
      }
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    const addr = await signer.getAddress();

    setConnectedUI(addr);
    setStatus("Wallet conectada: " + addr, "ok");
    initContract();

  } catch (e) {
    if (e.code === 4001) {
      setStatus("Conexión cancelada por el usuario.", "err");
    } else {
      setStatus("Error al conectar: " + e.message, "err");
    }
  }
}

function disconnectWallet() {
  provider = null;
  signer = null;
  contract = null;
  tokenDecimals = 18;
  setDisconnectedUI();
  setStatus("Wallet desconectada.", "");
}

// Interacción con el Contrato
function initContract() {
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  document.getElementById("sec-info").classList.add("open");
  refreshInfo();
}

async function refreshInfo() {
  if (!contract) return;
  try {
    const [name, symbol, dec, supply, maxSupply, paused, owner] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.decimals(),
      contract.totalSupply(),
      contract.MAX_SUPPLY(),
      contract.paused(),
      contract.owner(),
    ]);
    tokenDecimals = dec;
    document.getElementById("info-name").textContent      = name;
    document.getElementById("info-symbol").textContent    = symbol;
    document.getElementById("info-decimals").textContent  = dec;
    document.getElementById("info-supply").textContent    = fromUnits(supply);
    document.getElementById("info-maxsupply").textContent = fromUnits(maxSupply);
    document.getElementById("info-paused").textContent    = paused ? "SÍ" : "NO";
    document.getElementById("info-owner").textContent     = owner;
  } catch(e) {
    setStatus("Error leyendo info: " + friendlyError(e), "err");
  }
}

async function getBalance() {
  if (!contract) { setStatus("Conecta MetaMask primero.", "err"); return; }
  const addr = document.getElementById("balance-addr").value.trim();
  if (!addr) { setStatus("Ingresa una dirección.", "err"); return; }
  try {
    const bal = await contract.balanceOf(addr);
    const sym = document.getElementById("info-symbol").textContent;
    document.getElementById("balance-result").textContent =
      "Balance: " + fromUnits(bal) + " " + sym;
  } catch(e) {
    setStatus("Error consultando balance: " + friendlyError(e), "err");
  }
}

// Funciones basicas del contrato
//Función de minteo
async function doMint() {
  if (!contract) { setStatus("Conecta MetaMask primero.", "err"); return; }
  const to     = document.getElementById("mint-to").value.trim();
  const amount = document.getElementById("mint-amount").value;
  if (!to || !amount) { setStatus("Completa todos los campos.", "err"); return; }
  try {
    setStatus("Enviando mint…", "pending");
    const tx = await contract.mint(to, toUnits(amount));
    setTxStatus(tx.hash);
    await tx.wait();
    setStatus("Mint completado ✓", "ok");
    refreshInfo();
  } catch(e) {
    setStatus("Error mint: " + friendlyError(e), "err");
  }
}

// Función de transferencia
async function doTransfer() {
  if (!contract) { setStatus("Conecta MetaMask primero.", "err"); return; }
  const to     = document.getElementById("transfer-to").value.trim();
  const amount = document.getElementById("transfer-amount").value;
  if (!to || !amount) { setStatus("Completa todos los campos.", "err"); return; }
  try {
    setStatus("Enviando transferencia…", "pending");
    const tx = await contract.transfer(to, toUnits(amount));
    setTxStatus(tx.hash);
    await tx.wait();
    setStatus("Transferencia completada ✓", "ok");
    refreshInfo();
  } catch(e) {
    setStatus("Error transfer: " + friendlyError(e), "err");
  }
}

// Función de quema
async function doBurn() {
  if (!contract) { setStatus("Conecta MetaMask primero.", "err"); return; }
  const amount = document.getElementById("burn-amount").value;
  if (!amount) { setStatus("Ingresa la cantidad a quemar.", "err"); return; }
  try {
    setStatus("Enviando burn…", "pending");
    const tx = await contract.burn(toUnits(amount));
    setTxStatus(tx.hash);
    await tx.wait();
    setStatus("Burn completado ✓", "ok");
    refreshInfo();
  } catch(e) {
    setStatus("Error burn: " + friendlyError(e), "err");
  }
}

// Funciones de pausa y blacklist
async function doPause() {
  if (!contract) { setStatus("Conecta MetaMask primero.", "err"); return; }
  try {
    setStatus("Pausando contrato…", "pending");
    const tx = await contract.pause();
    setTxStatus(tx.hash);
    await tx.wait();
    setStatus("Contrato pausado ✓", "ok");
    refreshInfo();
  } catch(e) {
    setStatus("Error pause: " + friendlyError(e), "err");
  }
}

async function doUnpause() {
  if (!contract) { setStatus("Conecta MetaMask primero.", "err"); return; }
  try {
    setStatus("Reanudando contrato…", "pending");
    const tx = await contract.unpause();
    setTxStatus(tx.hash);
    await tx.wait();
    setStatus("Contrato reanudado ✓", "ok");
    refreshInfo();
  } catch(e) {
    setStatus("Error unpause: " + friendlyError(e), "err");
  }
}

async function doBlacklist(add) {
  if (!contract) { setStatus("Conecta MetaMask primero.", "err"); return; }
  const addr = document.getElementById("blacklist-addr").value.trim();
  if (!addr) { setStatus("Ingresa una dirección.", "err"); return; }
  try {
    setStatus((add ? "Agregando" : "Quitando") + " dirección de blacklist…", "pending");
    const tx = add
      ? await contract.blacklist(addr)
      : await contract.blacklistRemove(addr);
    setTxStatus(tx.hash);
    await tx.wait();
    setStatus("Blacklist actualizada ✓", "ok");
  } catch(e) {
    setStatus("Error blacklist: " + friendlyError(e), "err");
  }
}

async function checkBlacklist() {
  if (!contract) { setStatus("Conecta MetaMask primero.", "err"); return; }
  const addr = document.getElementById("blacklist-check-addr").value.trim();
  if (!addr) { setStatus("Ingresa una dirección.", "err"); return; }
  try {
    const result = await contract.blacklisted(addr);
    document.getElementById("blacklist-result").textContent =
      "Estado: " + (result ? "EN BLACKLIST ✗" : "No está en blacklist ✓");
  } catch(e) {
    setStatus("Error consultando blacklist: " + friendlyError(e), "err");
  }
}

// ── Listeners ──────────────────────────────────────────────────────────────
if (window.ethereum) {
  window.ethereum.on("accountsChanged", () => location.reload());
  window.ethereum.on("chainChanged",    () => location.reload());
}
