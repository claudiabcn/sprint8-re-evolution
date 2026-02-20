import Layout from '../../shared/components/Layout';
import ServiceCards from './components/ServiceCards';
import { HOME_CONTENT, HOME_LAYOUT } from '../../config/appData';

const Home = () => {
  return (
    <Layout title={HOME_LAYOUT.title} subtitle={HOME_LAYOUT.subtitle}>
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-black text-rose-900 mb-4 tracking-tight">
          {HOME_CONTENT.hero.heading}
        </h2>
        <p className="text-rose-700/70 text-lg max-w-2xl mb-6">
          {HOME_CONTENT.hero.description}
        </p>
        <div className="w-32 h-2 bg-gradient-to-r from-pink-500 to-amber-500 rounded-full mx-auto md:mx-0" />
      </div>

      <ServiceCards />

      <div className="mt-20 text-center">
        <div className="inline-flex items-center gap-3 p-2 pr-8 rounded-full bg-white shadow-sm border border-rose-100">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 text-white animate-pulse">
            {HOME_CONTENT.quote.icon}
          </span>
          <p className="text-rose-900 font-semibold italic">
            "{HOME_CONTENT.quote.text}"
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;