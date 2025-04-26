
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ConfigPanelProps {
  isRunning: boolean;
  onToggleSimulation: () => void;
  onReset: () => void;
  onConfigureSystem: (config: {
    numLights: number;
    syncGroups: number[];
    conflicts: [number, number][];
  }) => void;
  onSpeedChange: (speed: number) => void;
  onTrafficRateChange: (rate: number) => void;
  simulationSpeed: number;
  trafficRate: number;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({
  isRunning,
  onToggleSimulation,
  onReset,
  onConfigureSystem,
  onSpeedChange,
  onTrafficRateChange,
  simulationSpeed,
  trafficRate,
}) => {
  // Fixed number of lights - no longer configurable
  const numLights = 4;
  
  // Default pairing: lights in pairs (0,0,1,1)
  const [syncGroups, setSyncGroups] = useState<number[]>([0, 0, 1, 1]);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedLight, setSelectedLight] = useState(0);
  
  // Helper to update sync group for a light
  const updateSyncGroup = (lightId: number, groupId: number) => {
    const newGroups = [...syncGroups];
    newGroups[lightId] = groupId;
    setSyncGroups(newGroups);
  };
  
  // Generate conflicts based on sync groups
  const generateConflicts = (): [number, number][] => {
    const conflicts: [number, number][] = [];
    for (let i = 0; i < syncGroups.length; i++) {
      for (let j = i + 1; j < syncGroups.length; j++) {
        if (syncGroups[i] !== syncGroups[j]) {
          conflicts.push([i, j]);
        }
      }
    }
    return conflicts;
  };
  
  // Apply configuration to the simulation
  const applyConfiguration = () => {
    const conflicts = generateConflicts();
    onConfigureSystem({
      numLights,
      syncGroups,
      conflicts,
    });
    setShowConfigModal(false);
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 h-full">
        <h3 className="text-lg font-medium mb-4">Contrôles de Simulation</h3>
        
        <div className="space-y-4">
          <div>
            <Button 
              onClick={onToggleSimulation} 
              variant={isRunning ? "destructive" : "default"}
              className="w-full"
            >
              {isRunning ? "Pause Simulation" : "Démarrer Simulation"}
            </Button>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Vitesse de Simulation</label>
              <span className="text-xs">{(1000 / simulationSpeed).toFixed(1)} cycles/seconde</span>
            </div>
            <Slider 
              value={[1100 - simulationSpeed]} 
              min={100}
              max={1000}
              step={100}
              onValueChange={(values) => onSpeedChange(1100 - values[0])}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Taux de Trafic</label>
              <span className="text-xs">{trafficRate}/10</span>
            </div>
            <Slider 
              value={[trafficRate]} 
              min={1}
              max={10}
              step={1}
              onValueChange={(values) => onTrafficRateChange(values[0])}
            />
          </div>
          
          <Separator />
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => setShowConfigModal(true)}
            >
              Configurer Groupes
            </Button>
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={onReset}
            >
              Réinitialiser
            </Button>
          </div>
          
          <div className="mt-4 bg-slate-50 p-3 rounded-md border border-gray-100">
            <h4 className="text-sm font-medium mb-2">Configuration Actuelle</h4>
            <div className="flex flex-wrap gap-1">
              {syncGroups.map((group, index) => (
                <Badge key={index} variant="outline" className="bg-white">
                  Feu {index + 1}: Groupe {group + 1}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Configuration Modal - only for sync groups now */}
      <AlertDialog open={showConfigModal} onOpenChange={setShowConfigModal}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Configurer les Groupes de Synchronisation</AlertDialogTitle>
            <AlertDialogDescription>
              Assignez les feux de circulation aux groupes de synchronisation. Les feux dans le même groupe changeront ensemble.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Configuration des Groupes</p>
              <p className="text-xs text-gray-500">
                Les feux dans le même groupe changeront ensemble et ne seront pas en conflit.
              </p>
              
              <div className="flex items-center gap-4 mt-2">
                <label className="text-sm w-24">Sélectionner Feu:</label>
                <Select 
                  value={selectedLight.toString()} 
                  onValueChange={(value) => setSelectedLight(parseInt(value))}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Sélectionner Feu" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: numLights }).map((_, i) => (
                      <SelectItem key={i} value={i.toString()}>Feu {i + 1}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-4">
                <label className="text-sm w-24">Assigner au Groupe:</label>
                <Select 
                  value={syncGroups[selectedLight].toString()} 
                  onValueChange={(value) => updateSyncGroup(selectedLight, parseInt(value))}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Sélectionner Groupe" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Allow selecting from 2 groups only */}
                    {Array.from({ length: 2 }).map((_, i) => (
                      <SelectItem key={i} value={i.toString()}>Groupe {i + 1}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Configuration Actuelle</p>
              <div className="grid grid-cols-2 gap-2">
                {syncGroups.map((group, index) => (
                  <div 
                    key={index} 
                    className={`p-2 border rounded-md text-sm ${
                      index === selectedLight ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    Feu {index + 1} → Groupe {group + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={applyConfiguration}>Appliquer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ConfigPanel;
