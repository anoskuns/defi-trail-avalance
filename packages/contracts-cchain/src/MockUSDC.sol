// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title MockUSDC
 * @notice Standard ERC-20 representation of USDC on Fuji C-Chain for the DeFi Trail MVP.
 * @dev 6 decimals. Mint role is intended solely for testnet seeding and deployment,
 * and can be renounced or transferred to another administrator.
 */
contract MockUSDC is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    event MinterRoleGranted(address indexed account, address indexed sender);
    event MinterRoleRevoked(address indexed account, address indexed sender);

    error ZeroAddress();

    constructor(address initialAdmin) ERC20("Mock USD Coin", "mUSDC") {
        address admin = initialAdmin == address(0) ? msg.sender : initialAdmin;
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(MINTER_ROLE, admin);
    }

    /**
     * @notice Decimals override to match canonical USDC (6 decimals).
     */
    function decimals() public pure override returns (uint8) {
        return 6;
    }

    /**
     * @notice Mints new MockUSDC tokens. Restricted to MINTER_ROLE.
     * @param to Recipient address.
     * @param amount Amount of tokens to mint in 6-decimal units.
     */
    function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
        if (to == address(0)) revert ZeroAddress();
        _mint(to, amount);
    }
}

