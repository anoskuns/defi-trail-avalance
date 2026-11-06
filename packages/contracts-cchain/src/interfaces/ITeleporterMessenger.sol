// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @notice Minimal Teleporter Messenger ABI used by the DeFi Trail gateways.
 * @dev This mirrors the L1 interface. Deployments must pin the same Teleporter
 *      Messenger major version on Game L1 and Fuji C-Chain.
 */
interface ITeleporterMessenger {
    struct TeleporterFeeInfo {
        address feeTokenAddress;
        uint256 amount;
    }

    struct TeleporterMessageInput {
        bytes32 destinationBlockchainID;
        address destinationAddress;
        TeleporterFeeInfo feeInfo;
        uint256 requiredGasLimit;
        address[] allowedRelayerAddresses;
        bytes message;
    }

    function sendCrossChainMessage(TeleporterMessageInput calldata messageInput)
        external
        payable
        returns (bytes32 messageID);
}

interface ITeleporterReceiver {
    function receiveTeleporterMessage(bytes32 originBlockchainID, address originSenderAddress, bytes calldata message)
        external;
}
