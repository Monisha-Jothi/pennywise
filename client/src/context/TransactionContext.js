import React, { createContext, useState, useContext } from 'react';
import { transactionAPI, statsAPI } from '../api/axios';
import { toast } from 'react-toastify';

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data } = await transactionAPI.getAll();
      setTransactions(data);
    } catch (error) {
      toast.error('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await statsAPI.getStats();
      setStats(data);
    } catch (error) {
      toast.error('Failed to fetch stats');
    }
  };

  const addTransaction = async (transactionData) => {
    try {
      const { data } = await transactionAPI.create(transactionData);
      setTransactions([data, ...transactions]);
      toast.success('Transaction added!');
      fetchStats();
    } catch (error) {
      toast.error('Failed to add transaction');
      throw error;
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await transactionAPI.delete(id);
      setTransactions(transactions.filter(t => t._id !== id));
      toast.success('Transaction deleted!');
      fetchStats();
    } catch (error) {
      toast.error('Failed to delete transaction');
    }
  };

  return (
    <TransactionContext.Provider value={{
      transactions, stats, loading,
      fetchTransactions, fetchStats, addTransaction, deleteTransaction
    }}>
      {children}
    </TransactionContext.Provider>
  );
};
