import React, { useState, useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TrafficIntersection from '@/components/TrafficIntersection';
import MetricsDisplay from '@/components/MetricsDisplay';
import ConfigPanel from '@/components/ConfigPanel';
import { initializeTrafficSystem } from '@/utils/trafficSystem';
import { 
  SimulationState, 
  runSimulationStep, 
  calculateMetrics,
  SimulationMetrics 
} from '@/utils/trafficSimulation';
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const defaultSyncGroups = [0, 0, 1, 1];
  
  const [simulationState, setSimulationState] = useState<SimulationState>({
    gameTheorySystem: initializeTrafficSystem(4, defaultSyncGroups),
    fixedTimingSystem: initializeTrafficSystem(4, defaultSyncGroups),
    simulationTick: 0,
    isRunning: false,
    simulationSpeed: 500, // milliseconds per tick
    trafficRate: 5, // 1-10 scale
    newVehicleRate: 2,
  });

  const [metrics, setMetrics] = useState<SimulationMetrics>({
    gameTheory: {
      totalWaitTime: 0,
      avgQueueLength: 0,
    },
    fixedTiming: {
      totalWaitTime: 0,
      avgQueueLength: 0,
    }
  });

  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const simulationTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const newMetrics = calculateMetrics(simulationState);
    setMetrics(newMetrics);
    
    if (simulationState.simulationTick % 5 === 0) {
      const dataPoint = {
        tick: simulationState.simulationTick,
        gameTheoryWait: simulationState.gameTheorySystem.totalWaitTime,
        fixedTimingWait: simulationState.fixedTimingSystem.totalWaitTime,
        gameTheoryQueue: newMetrics.gameTheory.avgQueueLength,
        fixedTimingQueue: newMetrics.fixedTiming.avgQueueLength,
      };
      
      setHistoricalData(prev => {
        const newData = [...prev, dataPoint];
        if (newData.length > 50) {
          return newData.slice(-50);
        }
        return newData;
      });
    }
  }, [simulationState]);

  useEffect(() => {
    if (simulationState.isRunning) {
      if (simulationTimerRef.current !== null) {
        window.clearTimeout(simulationTimerRef.current);
      }
      
      simulationTimerRef.current = window.setTimeout(() => {
        const nextState = runSimulationStep(simulationState);
        setSimulationState(nextState);
      }, simulationState.simulationSpeed);
    } else if (simulationTimerRef.current !== null) {
      window.clearTimeout(simulationTimerRef.current);
      simulationTimerRef.current = null;
    }
    
    return () => {
      if (simulationTimerRef.current !== null) {
        window.clearTimeout(simulationTimerRef.current);
      }
    };
  }, [simulationState.isRunning, simulationState]);

  const handleToggleSimulation = () => {
    setSimulationState(prevState => ({
      ...prevState,
      isRunning: !prevState.isRunning
    }));
  };

  const handleReset = () => {
    setSimulationState(prevState => {
      const { syncGroups } = extractConfigFromSystem(prevState.gameTheorySystem);
      return {
        gameTheorySystem: initializeTrafficSystem(4, syncGroups),
        fixedTimingSystem: initializeTrafficSystem(4, syncGroups),
        simulationTick: 0,
        isRunning: false,
        simulationSpeed: prevState.simulationSpeed,
        trafficRate: prevState.trafficRate,
        newVehicleRate: prevState.newVehicleRate,
      };
    });
    
    setHistoricalData([]);
    
    toast({
      title: "Simulation Réinitialisée",
      description: "La simulation a été réinitialisée à l'état initial.",
    });
  };

  const extractConfigFromSystem = (system: any) => {
    return {
      numLights: system.lights.length,
      syncGroups: system.lights.map((light: any) => light.syncGroup),
      conflicts: system.conflicts
    };
  };

  const handleConfigureSystem = (config: { numLights: number; syncGroups: number[]; conflicts: [number, number][]; }) => {
    setSimulationState(prevState => ({
      ...prevState,
      isRunning: false,
      gameTheorySystem: initializeTrafficSystem(4, config.syncGroups),
      fixedTimingSystem: initializeTrafficSystem(4, config.syncGroups),
      simulationTick: 0,
    }));
    
    setHistoricalData([]);
    
    toast({
      title: "Configuration Appliquée",
      description: "Les groupes de synchronisation ont été mis à jour.",
    });
  };

  const handleSpeedChange = (speed: number) => {
    setSimulationState(prevState => ({
      ...prevState,
      simulationSpeed: speed
    }));
  };

  const handleTrafficRateChange = (rate: number) => {
    setSimulationState(prevState => ({
      ...prevState,
      trafficRate: rate
    }));
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-emerald-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">Contrôleur Intelligent de Trafic</h1>
          <p className="mt-1 text-emerald-100">Théorie des Jeux pour l'Optimisation du Flux de Trafic</p>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="md:col-span-2">
            <Tabs defaultValue="simulation" className="h-full">
              <TabsList className="mb-4">
                <TabsTrigger value="simulation">Simulation</TabsTrigger>
                <TabsTrigger value="metrics">Métriques</TabsTrigger>
              </TabsList>
              
              <TabsContent value="simulation" className="h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                  <TrafficIntersection 
                    system={simulationState.gameTheorySystem} 
                    title="Contrôle par Théorie des Jeux"
                  />
                  <TrafficIntersection 
                    system={simulationState.fixedTimingSystem} 
                    title="Contrôle à Temps Fixe"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="metrics" className="h-full">
                <MetricsDisplay 
                  metrics={metrics}
                  historicalData={historicalData}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <ConfigPanel 
              isRunning={simulationState.isRunning}
              onToggleSimulation={handleToggleSimulation}
              onReset={handleReset}
              onConfigureSystem={handleConfigureSystem}
              onSpeedChange={handleSpeedChange}
              onTrafficRateChange={handleTrafficRateChange}
              simulationSpeed={simulationState.simulationSpeed}
              trafficRate={simulationState.trafficRate}
            />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-10">
          <h2 className="text-xl font-medium mb-3">Informations sur la Simulation</h2>
          <p className="mb-2 text-slate-700">
            Cette application simule l'optimisation du flux de trafic en utilisant la théorie des jeux, où chaque feu de circulation agit comme un joueur essayant de minimiser les temps d'attente pour sa file de véhicules.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="text-md font-medium mb-2">Approche par Théorie des Jeux</h3>
              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                <li>Chaque feu est un joueur qui optimise sa propre file.</li>
                <li>Les feux prennent des décisions basées sur la longueur de la file et le temps d'attente.</li>
                <li>Le système détecte et empêche les signaux verts conflictuels.</li>
                <li>Les groupes de feux synchronisés changent ensemble.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-md font-medium mb-2">Approche à Temps Fixe</h3>
              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                <li>Approche traditionnelle avec des temps prédéfinis (10s vert, 3s jaune, reste rouge).</li>
                <li>Les feux changent dans une séquence fixe indépendamment des conditions de trafic.</li>
                <li>Les groupes synchronisés changent toujours ensemble.</li>
                <li>Pas de comportement adaptatif pour les changements de trafic.</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-slate-500">
            <p>Cycle de Simulation: {simulationState.simulationTick}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
