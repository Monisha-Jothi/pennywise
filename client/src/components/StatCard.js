import React from 'react';
import './StatCard.css';

const StatCard = ({ label, value, type }) => {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className={`stat-value ${type}`}>
        ₹{value?.toFixed(2) || '0.00'}
      </div>
    </div>
  );
};

export default StatCard;