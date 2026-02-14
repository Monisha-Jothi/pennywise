import React, { useEffect } from 'react';
import { useTransactions } from '../context/TransactionContext';
import StatCard from '../components/StatCard';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import Charts from '../components/Charts';
import './Dashboard.css';

const Dashboard = () => {
  const { fetchTransactions, fetchStats, stats } = useTransactions();

  useEffect(() => {
    fetchTransactions();
    fetchStats();
  }, [fetchTransactions, fetchStats]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Track your income and expenses</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatCard
          label="Total Income"
          value={stats?.summary?.totalIncome}
          type="income"
        />
        <StatCard
          label="Total Expenses"
          value={stats?.summary?.totalExpenses}
          type="expense"
        />
        <StatCard
          label="Balance"
          value={stats?.summary?.balance}
          type="balance"
        />
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="form-section">
          <TransactionForm />
        </div>

        <div className="list-section">
          <TransactionList />
        </div>

        <div className="charts-section">
          <Charts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;