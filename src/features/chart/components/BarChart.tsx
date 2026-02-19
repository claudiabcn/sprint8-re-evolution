import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  servicesByType: Record<string, number>;
}

const BarChart = ({ servicesByType }: BarChartProps) => {
  const data = {
    labels: Object.keys(servicesByType),
    datasets: [
      {
        label: 'Nº de servicios',
        data: Object.values(servicesByType),
        backgroundColor: [
          'rgba(251, 113, 133, 0.7)',
          'rgba(253, 186, 116, 0.7)',
          'rgba(196, 181, 253, 0.7)',
          'rgba(134, 239, 172, 0.7)',
        ],
        borderColor: [
          '#fb7185',
          '#fdba74',
          '#c4b5fd',
          '#86efac',
        ],
        borderWidth: 2,
        borderRadius: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Servicios por tipo',
        color: '#881337',
        font: { size: 16, weight: 'bold' as const },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        grid: { color: 'rgba(251,113,133,0.1)' },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-pink-100 shadow-lg p-6">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;