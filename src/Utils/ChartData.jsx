import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useState, useEffect } from 'react';
import PieChart from '../Components/PieChart.jsx';
import { supabase } from '../Services/SupabaseClient';

Chart.register(CategoryScale);

const statusTypes = {
  1: '🟢 Available',
  2: '🟡 On Hold',
  3: '🔴 Checked Out',
  4: '🔧 Under Repair',
  5: '❌ Lost / Missing',
};

export default function ChartData() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: statusCounts, error: statusCountsError } =
        await supabase.rpc('get_status_counts');

      if (statusCounts) {
        setChartData({
          labels: statusCounts.map((data) => statusTypes[data.status_id]),
          datasets: [
            {
              label: 'Quantity ',
              data: statusCounts.map((data) => data.count),
              backgroundColor: [
                '#00D26A',
                '#FCD53F',
                '#F8312F',
                '#B4ACBC',
                '#B52246',
              ],
              borderColor: 'black',
              borderWidth: 2,
            },
          ],
        });
      }
    };

    fetchData();
  }, []);

  if (!chartData) return null;

  return (
    <div className="ChartData">
      <PieChart chartData={chartData} />
    </div>
  );
}
