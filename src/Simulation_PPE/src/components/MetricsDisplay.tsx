
import React from 'react';
import { SimulationMetrics } from '@/utils/trafficSimulation';
import MetricCard from './metrics/MetricCard';
import HistoricalChart from './metrics/HistoricalChart';
import StatsTable from './metrics/StatsTable';

interface MetricsDisplayProps {
  metrics: SimulationMetrics;
  historicalData: {
    tick: number;
    gameTheoryWait: number;
    fixedTimingWait: number;
    gameTheoryQueue: number;
    fixedTimingQueue: number;
  }[];
}

const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ metrics, historicalData }) => {
  // Calculate improvement percentages
  const waitTimeImprovement = metrics.fixedTiming.totalWaitTime > 0 ? 
    ((metrics.fixedTiming.totalWaitTime - metrics.gameTheory.totalWaitTime) / metrics.fixedTiming.totalWaitTime) * 100 : 0;
  
  const queueImprovement = metrics.fixedTiming.avgQueueLength > 0 ?
    ((metrics.fixedTiming.avgQueueLength - metrics.gameTheory.avgQueueLength) / metrics.fixedTiming.avgQueueLength) * 100 : 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 h-auto max-h-[650px] overflow-y-auto">
      <h3 className="text-lg font-medium mb-4 text-center">Indicateurs de Performance</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <MetricCard 
          title="Temps d'Attente Total" 
          gameTheory={metrics.gameTheory.totalWaitTime}
          fixedTiming={metrics.fixedTiming.totalWaitTime}
          improvement={waitTimeImprovement}
          unit="cycles"
          preferLower={true}
        />
        
        <MetricCard 
          title="Longueur Moy. de File" 
          gameTheory={metrics.gameTheory.avgQueueLength}
          fixedTiming={metrics.fixedTiming.avgQueueLength}
          improvement={queueImprovement}
          unit="véhicules"
          preferLower={true}
        />
      </div>
      
      {/* Line Chart for Historical Data */}
      <div className="mb-4">
        <HistoricalChart historicalData={historicalData} />
      </div>
      
      {/* Detailed Stats Table */}
      <StatsTable 
        metrics={metrics}
        waitTimeImprovement={waitTimeImprovement}
        queueImprovement={queueImprovement}
      />
    </div>
  );
};

export default MetricsDisplay;
