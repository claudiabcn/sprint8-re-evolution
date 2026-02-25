import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS, LinearScale, PointElement,
  LineElement, Title, Tooltip, Legend, CategoryScale
} from 'chart.js';
import type { Service } from '../../../shared/types/types';
import { CHART_COLORS } from '../../../config/appData';
import { FINAL_STATES } from '../../../shared/constants/constants';

ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineChartProps {
  services: Service[];
  month: number;
  year: number;
}

const MONTH_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                     'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const LineChart = ({ services, month, year }: LineChartProps) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const points = services
    .filter(s => {
      const d = new Date(s.fecha);
      return s.tipo_servicio === 'Rehabilitación vestibular' &&
             d.getMonth() === month && d.getFullYear() === year &&
             s.estado_final;
    })
    .map(s => ({
      x: new Date(s.fecha).getDate(),
      y: s.estado_final 
    }))
    .sort((a, b) => a.x - b.x);

  const data = {
    datasets: [
      {
        label: 'Estado',
        data: points,
        backgroundColor: CHART_COLORS.point,
        pointRadius: 7,
        zIndex: 2,
      },
      {
        type: 'line' as const,
        label: 'Tendencia',
        data: points,
        borderColor: CHART_COLORS.primary,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        zIndex: 1,
      }
    ]
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: `Evolución Vestibular — ${MONTH_NAMES[month]}`,
        color: CHART_COLORS.title,
        font: { size: 18, weight: 'bold' },
        padding: { bottom: 20 }
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => ` Día ${ctx.parsed.x}: ${ctx.raw.y}`
        }
      }
    },
    scales: {
      y: {
        type: 'category',
        labels: FINAL_STATES,
        offset: true, 
        ticks: {
          color: CHART_COLORS.title,
          font: { size: 11, weight: '600' }
        },
        grid: { color: CHART_COLORS.grid }
      },
      x: {
        min: 1,
        max: daysInMonth,
        ticks: {
          stepSize: 1,
          color: CHART_COLORS.title,
          font: { size: 11 }
        },
        grid: { display: false }
      }
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-pink-100 shadow-lg p-6 h-[400px]">
      <Scatter data={data} options={options} />
    </div>
  );
};

export default LineChart;