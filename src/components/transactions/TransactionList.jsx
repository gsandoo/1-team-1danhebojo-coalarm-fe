// src/components/transactions/TransactionList.jsx
import React from 'react';

function TransactionList({ title, transactions }) {
  // 숫자 포맷팅 함수
  const formatNumber = (num) => {
    return num.toLocaleString('ko-KR');
  };

  return (
    <div className="bg-blue-900 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-sm">{title}</h3>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white opacity-50" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-gray-400 text-xs">
            <th className="text-left py-2">코인</th>
            <th className="text-right py-2">가격</th>
            <th className="text-right py-2">수량</th>
            <th className="text-right py-2">시간</th>
          </tr>
        </thead>
        <tbody>
          {transactions.slice(0, 5).map((tx) => (
            <tr key={tx.id} className="border-t border-gray-700">
              <td className="py-2 flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${tx.type === 'buy' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-white text-sm">{tx.coin}</span>
              </td>
              <td className={`py-2 text-right text-sm ${tx.type === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                {formatNumber(tx.price)}
              </td>
              <td className="py-2 text-white text-right text-sm">{tx.amount}</td>
              <td className="py-2 text-gray-400 text-right text-sm">{tx.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;