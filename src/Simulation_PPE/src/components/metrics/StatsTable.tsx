
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SimulationMetrics } from '@/utils/trafficSimulation';

interface StatsTableProps {
  metrics: SimulationMetrics;
  waitTimeImprovement: number;
  queueImprovement: number;
}

const StatsTable: React.FC<StatsTableProps> = ({ 
  metrics, 
  waitTimeImprovement, 
  queueImprovement
}) => {
  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium mb-2">Statistiques Détaillées</h4>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Métrique</TableHead>
            <TableHead>Théorie des Jeux</TableHead>
            <TableHead>Temps Fixe</TableHead>
            <TableHead>Amélioration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Temps d'Attente Total</TableCell>
            <TableCell>{metrics.gameTheory.totalWaitTime.toFixed(1)}</TableCell>
            <TableCell>{metrics.fixedTiming.totalWaitTime.toFixed(1)}</TableCell>
            <TableCell className={waitTimeImprovement > 0 ? "text-green-600" : "text-amber-600"}>
              {waitTimeImprovement.toFixed(1)}%
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Longueur Moy. de File</TableCell>
            <TableCell>{metrics.gameTheory.avgQueueLength.toFixed(1)}</TableCell>
            <TableCell>{metrics.fixedTiming.avgQueueLength.toFixed(1)}</TableCell>
            <TableCell className={queueImprovement > 0 ? "text-green-600" : "text-amber-600"}>
              {queueImprovement.toFixed(1)}%
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default StatsTable;
