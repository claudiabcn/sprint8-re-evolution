import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { CHART_COLORS, BAR_COLORS } from '../../../config/appData';
import { SERVICE_TYPES } from '../../../shared/constants/constants';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const SingleDonut = ({ month, byType }: any) => {
  const data = {
    labels: byType.map((i: any) => i.label),
    datasets: [{
      data: byType.map((i: any) => i.count),
      backgroundColor: byType.map((i: any) => BAR_COLORS.background[SERVICE_TYPES.indexOf(i.label)]),
      borderColor: byType.map((i: any) => BAR_COLORS.border[SERVICE_TYPES.indexOf(i.label)]),
      borderWidth: 2,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { color: CHART_COLORS.title, font: { size: 11 }, usePointStyle: true }
      }
    }
  };

  return (
    <div className="flex flex-col items-center flex-1 h-[250px]">
      <h3 className="text-xs font-bold text-pink-500 mb-2 uppercase tracking-widest">{month}</h3>
      <Doughnut data={data} options={options} />
    </div>
  );
};

const DonutChart = ({ monthsData }: any) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-pink-100 shadow-lg p-6 pb-12">
      <h2 className="text-[18px] font-bold text-[#881337] mb-8 text-center md:text-center">
       Actividades
      </h2>
      <div className="flex flex-col md:flex-row justify-around gap-4">
        {monthsData.slice(-3).map((m: any, i: number) => (
          <SingleDonut key={i} {...m} />
        ))}
      </div>
    </div>
  );
};

export default DonutChart;