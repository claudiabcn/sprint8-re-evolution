import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';
import type { StatItem } from '../../../shared/types/types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface LineChartProps {
  byState: StatItem[];
}

const LineChart = ({ byState }: LineChartProps) => {
  const data = {
    labels: byState.map(i => i.label),
    datasets: [{
      label: 'Servicios por estado',
      data: byState.map(i => i.count),
      borderColor: '#fb7185',
      backgroundColor: 'rgba(251, 113, 133, 0.15)',
      pointBackgroundColor: '#fdba74',
      pointBorderColor: '#fb7185',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
      borderWidth: 3,
      fill: true,
      tension: 0.4,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Servicios por estado final',
        color: '#881337',
        font: { size: 16, weight: 'bold' as const },
      },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: 'rgba(251,113,133,0.1)' } },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-pink-100 shadow-lg p-6">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;