
import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown, FaExchangeAlt, FaSearch } from 'react-icons/fa';

const History = () => {
  const [filter, setFilter] = useState('all'); // all, deposit, withdraw
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://remocoin.onrender.com/api/users/transactions', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        // Assuming data is an array of transactions
        setTransactions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const filteredData = transactions.filter(item => 
    filter === 'all' ? true : item.type?.toLowerCase() === filter
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-nunito">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Transaction History</h1>
            <p className="text-gray-500 text-sm">Keep track of your deposits, withdrawals, and trades.</p>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
            {['all', 'deposit', 'withdraw'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                  filter === type 
                  ? 'bg-green-500 text-white shadow-md' 
                  : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-20 text-center">
              <div className="animate-spin h-10 w-10 border-4 border-green-500 rounded-full border-t-transparent mx-auto mb-4"></div>
              <p className="text-gray-500 font-medium">Loading your records...</p>
            </div>
          ) : filteredData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wider font-bold">
                    <th className="px-6 py-4">Transaction</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredData.map((tx) => (
                    <tr key={tx._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            tx.type === 'deposit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }`}>
                            {tx.type === 'deposit' ? <FaArrowDown /> : <FaArrowUp />}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 capitalize">{tx.type}</p>
                            <p className="text-xs text-gray-400">{tx.method || 'Crypto'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-800">
                        {tx.type === 'deposit' ? '+' : '-'}${tx.amount?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          tx.status === 'completed' || tx.status === 'success'
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-20 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaExchangeAlt className="text-gray-300 text-2xl" />
              </div>
              <h3 className="text-gray-800 font-bold text-lg">No transactions yet</h3>
              <p className="text-gray-400 text-sm max-w-xs mx-auto">Once you make your first deposit or withdrawal, it will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;