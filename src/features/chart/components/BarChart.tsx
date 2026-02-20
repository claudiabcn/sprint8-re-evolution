import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend,
} from 'chart.js';
import type { StatItem } from '../../../shared/types/types';
import { CHART_COLORS, BAR_COLORS } from '../../../config/appData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  byType: StatItem[];
}

const BarChart = ({ byType }: BarChartProps) => {
  const data = {
    labels: byType.map(i => i.label),
    datasets: [{
      label: 'Nº de servicios',
      data: byType.map(i => i.count),
      backgroundColor: BAR_COLORS.background,
      borderColor:     BAR_COLORS.border,
      borderWidth: 2,
      borderRadius: 12,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Servicios por tipo',
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
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;