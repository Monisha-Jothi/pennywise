import React, { createContext, useState, useContext, useCallback } from 'react';
import { transactionAPI, statsAPI } from '../api/axios';
import { toast } from 'react-toastify';

const TransactionContext = createContext();

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within TransactionProvider');
  }
  return context;
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await transactionAPI.getAll();
      setTransactions(data);
    } catch (error) {
      toast.error('Failed to fetch transactions');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await statsAPI.getStats();
      setStats(data);
    } catch (error) {
      toast.error('Failed to fetch statistics');
      console.error(error);
    }
  }, []);

  const addTransaction = async (transactionData) => {
    try {
      const { data } = await transactionAPI.create(transactionData);
      setTransactions([data, ...transactions]);
      toast.success('Transaction added successfully!');
      fetchStats();
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add transaction');
      throw error;
    }
  };

  const updateTransaction = async (id, transactionData) => {
    try {
      const { data } = await transactionAPI.update(id, transactionData);
      setTransactions(
        transactions.map((t) => (t._id === id ? data : t))
      );
      toast.success('Transaction updated successfully!');
      fetchStats();
      return data;
    } catch (error) {
      toast.error('Failed to update transaction');
      throw error;
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await transactionAPI.delete(id);
      setTransactions(transactions.filter((t) => t._id !== id));
      toast.success('Transaction deleted successfully!');
      fetchStats();
    } catch (error) {
      toast.error('Failed to delete transaction');
      throw error;
    }
  };

  const value = {
    transactions,
    stats,
    loading,
    fetchTransactions,
    fetchStats,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContext;