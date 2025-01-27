import React from 'react';
import { Pie } from 'react-chartjs-2';

function PieChart({ chartData }) {
  return (
    <div
      className="chart-container"
      style={{
        maxWidth: '500px',
        maxHeight: '500px',
        margin: '0 auto',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Catalog Status</h2>
      <Pie
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: {
              display: true,
              text: 'Count of all book statuses',
              color: '#FFF',
            },
            legend: {
              labels: {
                color: '#FFF',
              },
            },
          },
        }}
      />
    </div>
  );
}

export default PieChart;
