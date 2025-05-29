import React from 'react';
import { ethers } from 'ethers';

interface LogFormProps {
    contract: ethers.Contract | null,
    message: string,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
    fetchLogs: () => Promise<void>
}

const LogForm: React.FC<LogFormProps> = ({ contract, message, setMessage, fetchLogs }) => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!contract) return;
        const tx = await contract.writeLog(message);
        await tx.wait();
        setMessage("");
        fetchLogs();
    };

    return (
        <div>
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
        </div>
    );
}

export default LogForm;
