import React from 'react';
import { useTransactions } from '../context/TransactionContext';
import './TransactionList.css';

const TransactionList = () => {
  const { transactions, deleteTransaction, loading } = useTransactions();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryClass = (category) => {
    return `cat-${category.toLowerCase()}`;
  };

  if (loading) {
    return <div className="loading">Loading transactions...</div>;
  }

  return (
    <div className="transaction-list-card">
      <h2>Recent Transactions</h2>
      <div className="transactions-list">
        {transactions.length === 0 ? (
          <div className="empty-state">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="80" height="80">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p>No transactions yet. Add your first transaction!</p>
          </div>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction._id} className="transaction-item">
              <div className="transaction-info">
                <div className="transaction-description">
                  {transaction.description}
                  <span className={`category-badge ${getCategoryClass(transaction.category)}`}>
                    {transaction.category}
                  </span>
                </div>
                <div className="transaction-meta">
                  {formatDate(transaction.date)}
                </div>
              </div>
              <div className={`transaction-amount ${transaction.type}`}>
                {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
              </div>
              <button
                className="delete-btn"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this transaction?')) {
                    deleteTransaction(transaction._id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;