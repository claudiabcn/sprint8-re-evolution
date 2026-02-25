import { useChartData } from './hooks/useChartData';
import LineChart from './components/LineChart';
import DurationChart from './components/DurationChart';
import DonutChart from './components/DonutChart';

const Charts = () => {
  const { data, loading, error } = useChartData();

  if (loading) return <div className="p-10 text-center text-rose-800 animate-pulse">Cargando estadísticas...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-rose-900 mb-2">Estadísticas</h1>
        <div className="h-1.5 bg-gradient-to-r from-pink-500 to-amber-500 rounded-full w-24"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {data.byMonths && data.byMonths.length > 0 && (
          <div className="lg:col-span-2">
            <DonutChart monthsData={data.byMonths} />
          </div>
        )}

        <LineChart
          services={data.services}
          month={currentMonth}
          year={currentYear}
        />

        <LineChart
          services={data.services}
          month={previousMonth}
          year={previousYear}
        />

        {data.byDuration && (
          <DurationChart dataByMonth={data.byDuration} />
        )}

 
      </div>
    </div>
  );
};

export default Charts;
