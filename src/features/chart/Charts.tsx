import { useChartData } from './hooks/useChartData';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';

const Charts = () => {
  const { data, loading, error } = useChartData();

  if (loading) return <p className="p-4">Cargando gráficos...</p>;
  if (error)   return <p className="p-4 text-red-500">{error}</p>;
  if (!data)   return null;

  return (
    <div className="p-6">
      <h1 className="text-4xl font-black text-rose-900 mb-8">Estadísticas</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart  byType={data.byType} />
        <LineChart byState={data.byState} />
      </div>
    </div>
  );
};

export default Charts;