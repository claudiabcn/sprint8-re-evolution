import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';
import type { StatItem } from '../../../shared/types/types';
import { CHART_COLORS } from '../../../config/appData';

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
      borderColor:        CHART_COLORS.primary,
      backgroundColor:    CHART_COLORS.primaryFill,
      pointBackgroundColor: CHART_COLORS.point,
      pointBorderColor:   CHART_COLORS.primary,
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
        color: CHART_COLORS.title,
        font: { size: 16, weight: 'bold' as const },
      },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: CHART_COLORS.grid } },
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