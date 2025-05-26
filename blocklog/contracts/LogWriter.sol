// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract LogWriter {
    struct LogEntry {
        address sender;
        string message;
        uint timestamp;
    }

    LogEntry[] public logs;

    event LogWritten(address indexed sender, string message, uint timestamp);

    function writeLog(string calldata message) external {
        LogEntry memory newLog = LogEntry({
            sender: msg.sender,
            message: message,
            timestamp: block.timestamp
        });

        logs.push(newLog);
        emit LogWritten(msg.sender, message, block.timestamp);
    }

    function getLog(uint index) external view returns (address, string memory, uint) {
        require(index < logs.length, "Invalid index");
        LogEntry memory log = logs[index];
        return (log.sender, log.message, log.timestamp);
    }

    function getAllLogsCount() external view returns (uint) {
        return logs.length;
    }
}
