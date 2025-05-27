'use client';

import React from 'react';
import { ethers } from 'ethers';
// import contractAbi from '../lib/contractAbi.json';

const CONTRACT_ADDRESS = '0xYourDeployedContractAddressHere';

type Log = {
  sender: string,
  message: string,
  timestamp: string
}

export default function Home() {
  const [provider, setProvider] = React.useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = React.useState<ethers.Signer | null>(null);
  const [contract, setContract] = React.useState<ethers.Contract | null>(null);
  const [message, setMessage] = React.useState<string>('');
  const [logs, setLogs] = React.useState<Log[]>([]);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      ethProvider.getSigner().then((sig) => {
        setProvider(ethProvider);
        setSigner(sig);
        const logContract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, sig);
        setContract(logContract);
      });
    }
  }, []);

  const fetchLogs = async () => {
    if (!contract) return;
    const count = await contract.getAllLogsCount();
    const logList = [];
    for (let i = 0; i < count; i++) {
      const log = await contract.getLog(i);
      logList.push({
        sender: log[0],
        message: log[1],
        timestamp: new Date(Number(log[2]) * 1000).toLocaleString(),
      });
    }
    setLogs(logList.reverse());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contract) return;
    const tx = await contract.writeLog(message);
    await tx.wait();
    setMessage('');
    fetchLogs();
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📜 BlockLog – Immutable Logging</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tulis log kamu..."
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          🚀 Submit Log
        </button>
      </form>

      <button
        onClick={fetchLogs}
        className="mb-4 text-blue-500 underline"
      >
        🔄 Refresh Logs
      </button>

      <ul>
        {logs.map((log, idx) => (
          <li key={idx} className="border p-3 rounded mb-2">
            <p><strong>📨 {log.sender}</strong></p>
            <p>{log.message}</p>
            <p className="text-xs text-gray-500">🕒 {log.timestamp}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
