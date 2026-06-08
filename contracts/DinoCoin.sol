// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

//Importación de contratos openzeppelin

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";

contract DinoCoin is ERC20, ERC20Burnable, ERC20Pausable, Ownable {
    //Definición de constantes, el suministro masximo se definió en 5,000,000 de tokens,
    //ademas tambien se definio el evento de blacklist para que se puede emitir un cambio de estado al usar la funcion
    uint256 public constant MAX_SUPPLY = 5000000 * 10 ** 18;
    mapping(address => bool) public blacklisted;

    event AddressBlacklisted(address indexed account, bool isBlacklisted);

    //Constructor en el que definimos el nombre y simbolo de la criptomoneda
    constructor() ERC20("DinoCoin", "DNC") Ownable(msg.sender) {
        //El deployer obtiene 100,000 tokens
        _mint(msg.sender, 100000 * 10 ** 18);
    }

    //Funcion de minteo en la que solo el owner del contrato puede acuñar más tokens
    //además se define que no se puede superar el suministro maximo
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Max supply reached");
        _mint(to, amount);
    }

    //Funcion blacklist y blacklistRemove para bloquear y desbloquear ciertas cuentas y que no puedan interactuar con el contrato
    function blacklist(address _addr) external onlyOwner {
        require(_addr != address(0), "Direccion invalida");
        require(!blacklisted[_addr], "Ya esta en la lista negra");

        blacklisted[_addr] = true;
        emit AddressBlacklisted(_addr, true);
    }

    function blacklistRemove(address _addr) external onlyOwner {
        require(blacklisted[_addr], "La direccion no esta en la lista negra");
        blacklisted[_addr] = false;
        emit AddressBlacklisted(_addr, false);
    }

    //Función pause para que nadie pueda interactuar con el contrato a discreción del owner
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    //Modificadores para evitar transacciones a/desde cuentas en la lista negra
    function _update(address from, address to, uint256 value) internal override(ERC20, ERC20Pausable) {
        require(!blacklisted[from], "La cuenta remitente se encuentra bloqueada");
        require(!blacklisted[to], "La cuenta a la que desea enviar se encuentra bloqueada");
        super._update(from, to, value);
    }
}
