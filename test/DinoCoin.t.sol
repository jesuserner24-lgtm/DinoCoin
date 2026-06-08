// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../contracts/DinoCoin.sol";

contract DinoCoinTest is Test {
    DinoCoin public token;
    address public owner = address(1);
    address public user1 = address(2);
    address public user2 = address(3);

    function setUp() public {
        vm.prank(owner);
        token = new DinoCoin();
    }

    // 1. constructor
    function test_Initialization() public view {
        assertEq(token.name(), "DinoCoin");
        assertEq(token.symbol(), "DNC");
        assertEq(token.owner(), owner);
        assertEq(token.balanceOf(owner), 100000 * 10 ** 18);
    }

    // 2. test de función mint
    function test_MintAsOwner() public {
        vm.prank(owner);
        token.mint(user1, 1000 * 10 ** 18);
        assertEq(token.balanceOf(user1), 1000 * 10 ** 18);
    }

    function test_MintFailNotOwner() public {
        vm.prank(user1);
        vm.expectRevert(abi.encodeWithSignature("OwnableUnauthorizedAccount(address)", user1));
        token.mint(user1, 1000 * 10 ** 18);
    }

    function test_MintFailMaxSupply() public {
        uint256 amountToMint = token.MAX_SUPPLY() - token.totalSupply() + 1;
        vm.prank(owner);
        vm.expectRevert("Max supply reached");
        token.mint(user1, amountToMint);
    }

    // 3. test de función blacklist
    function test_BlacklistAddress() public {
        vm.prank(owner);
        vm.expectEmit(true, false, false, true);
        emit DinoCoin.AddressBlacklisted(user1, true);
        token.blacklist(user1);

        assertTrue(token.blacklisted(user1));
    }

    function test_BlacklistFailInvalidAddress() public {
        vm.prank(owner);
        vm.expectRevert("Direccion invalida");
        token.blacklist(address(0));
    }

    function test_BlacklistFailAlreadyBlacklisted() public {
        vm.startPrank(owner);
        token.blacklist(user1);
        vm.expectRevert("Ya esta en la lista negra");
        token.blacklist(user1);
        vm.stopPrank();
    }

    function test_RemoveFromBlacklist() public {
        vm.startPrank(owner);
        token.blacklist(user1);

        vm.expectEmit(true, false, false, true);
        emit DinoCoin.AddressBlacklisted(user1, false);
        token.blacklistRemove(user1);
        vm.stopPrank();

        assertFalse(token.blacklisted(user1));
    }

    function test_BlacklistRemoveFailNotBlacklisted() public {
        vm.prank(owner);
        vm.expectRevert("La direccion no esta en la lista negra");
        token.blacklistRemove(user1);
    }

    function test_TransferFailWhenFromIsBlacklisted() public {
        vm.prank(owner);
        token.mint(user1, 1000 * 10 ** 18);

        vm.prank(owner);
        token.blacklist(user1);

        vm.prank(user1);
        vm.expectRevert("La cuenta remitente se encuentra bloqueada");
        token.transfer(user2, 500 * 10 ** 18);
    }

    function test_TransferFailWhenToIsBlacklisted() public {
        vm.prank(owner);
        token.blacklist(user2);

        vm.prank(owner);
        vm.expectRevert("La cuenta a la que desea enviar se encuentra bloqueada");
        token.transfer(user2, 500 * 10 ** 18);
    }

    // 4. test de función pause
    function test_PauseAndUnpause() public {
        vm.startPrank(owner);
        token.pause();

        // Comprobacion de fallo estando pausado
        vm.expectRevert(abi.encodeWithSignature("EnforcedPause()"));
        token.transfer(user1, 500 * 10 ** 18);

        token.unpause();
        token.transfer(user1, 500 * 10 ** 18);
        vm.stopPrank();

        assertEq(token.balanceOf(user1), 500 * 10 ** 18);
    }
}
