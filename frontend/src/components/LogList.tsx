import React from 'react';
import { Log } from '@/types/Log';

interface Logs {
    logs: Log[]
}

const LogList: React.FC<Logs> = ({ logs }) => {
    return (
        <div className="overflow-x-auto w-full">
            <table className="table-auto min-w-full border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Sender</th>
                        <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Message</th>
                        <th className="border border-gray-300 px-4 py-2 whitespace-nowrap">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, idx) => (
                        <tr key={idx}>
                            <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-sm">
                                <strong>📨 {log.sender}</strong>
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-sm break-words max-w-xs">
                                {log.message}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-xs text-gray-500 whitespace-nowrap">
                                🕒 {log.timestamp}
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default LogList;
