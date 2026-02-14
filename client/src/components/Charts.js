import React from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { useTransactions } from '../context/TransactionContext';
import './Charts.css';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Charts = () => {
  const { stats } = useTransactions();

  const categoryChartData = {
    labels: Object.keys(stats?.categoryData || {}),
    datasets: [
      {
        data: Object.values(stats?.categoryData || {}),
        backgroundColor: [
          '#ef4444', '#f97316', '#f59e0b', '#eab308',
          '#84cc16', '#22c55e', '#10b981', '#14b8a6',
          '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1'
        ],
        borderWidth: 0,
      },
    ],
  };

  const categoryChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: false,
      },
    },
  };

  const comparisonChartData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Amount (₹)',
        data: [
          stats?.summary?.totalIncome || 0,
          stats?.summary?.totalExpenses || 0
        ],
        backgroundColor: ['#10b981', '#ef4444'],
      },
    ],
  };

  const comparisonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const hasData = stats && Object.keys(stats.categoryData || {}).length > 0;

  return (
    <>
      <div className="chart-card">
        <h2>Spending by Category</h2>
        <div className="chart-container">
          {hasData ? (
            <Doughnut data={categoryChartData} options={categoryChartOptions} />
          ) : (
            <div className="no-data">No expense data available</div>
          )}
        </div>
      </div>

      <div className="chart-card">
        <h2>Income vs Expenses</h2>
        <div className="chart-container">
          <Bar data={comparisonChartData} options={comparisonChartOptions} />
        </div>
      </div>
    </>
  );
};

export default Charts;