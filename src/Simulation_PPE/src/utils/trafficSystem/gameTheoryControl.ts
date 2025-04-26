
/**
 * Game Theory traffic light control algorithm
 */
import { TrafficSystem } from './types';
import { findConflicts } from './conflictManagement';

// Configurable constants for fairness
const MAX_WAIT_TIME = 20; // Maximum number of cycles a light can wait before getting priority

// Game theory decision algorithm for next light to turn green
export const makeGameTheoryDecision = (system: TrafficSystem): TrafficSystem => {
  const updatedSystem = { ...system };
  
  // Track which sync groups are processing yellow lights
  const yellowGroups = new Set<number>();
  system.lights.forEach(light => {
    if (light.isYellow) {
      yellowGroups.add(light.syncGroup);
    }
  });
  
  // Find lights that are candidates for turning green (not yellow, not green)
  const lightsByGroup: Record<number, typeof system.lights> = {};
  
  system.lights.forEach(light => {
    if (!light.isGreen && !light.isYellow && !yellowGroups.has(light.syncGroup)) {
      if (!lightsByGroup[light.syncGroup]) {
        lightsByGroup[light.syncGroup] = [];
      }
      lightsByGroup[light.syncGroup].push(light);
    }
  });
  
  // For each green light, check if it should turn yellow
  system.lights.forEach(light => {
    if (light.isGreen) {
      // Check if this light has been green long enough and has a low queue
      const shouldTurnYellow = 
        light.greenTimeElapsed >= light.minGreenTime &&
        (light.queueLength <= 2 || light.greenTimeElapsed >= light.maxGreenTime);
      
      if (shouldTurnYellow) {
        // Turn all lights in this sync group yellow
        const syncGroup = light.syncGroup;
        updatedSystem.lights = updatedSystem.lights.map(l => {
          if (l.syncGroup === syncGroup && l.isGreen) {
            return {
              ...l,
              isGreen: false,
              isYellow: true,
              yellowTimeRemaining: 3,
              greenTimeElapsed: 0
            };
          }
          return l;
        });
      }
    }
  });
  
  // For each sync group that could turn green, evaluate the potential benefit
  const groupBenefits: [number, number, number][] = []; // [syncGroup, benefit, waitTime]
  
  Object.entries(lightsByGroup).forEach(([groupStr, lights]) => {
    const syncGroup = parseInt(groupStr);
    
    // Skip if any light in this group would conflict with a green light
    const wouldConflict = lights.some(light => 
      findConflicts(light.id, system).length > 0
    );
    
    if (!wouldConflict) {
      // Calculate benefit as total queue length of all lights in this group
      const totalQueue = lights.reduce((sum, light) => sum + light.queueLength, 0);
      
      // Calculate the maximum wait time for any light in this group
      // Each simulation tick where a light isn't green increments its wait time
      const maxWaitTime = lights.reduce(
        (maxWait, light) => Math.max(maxWait, light.waitTime || 0), 
        0
      );
      
      // Apply fairness correction: give very high priority to groups that have waited too long
      let fairnessFactor = 0;
      if (maxWaitTime >= MAX_WAIT_TIME) {
        fairnessFactor = maxWaitTime * 100; // Ensure it gets very high priority
      }
      
      const totalBenefit = totalQueue + fairnessFactor;
      groupBenefits.push([syncGroup, totalBenefit, maxWaitTime]);
    }
  });
  
  // Sort groups by benefit (highest first)
  groupBenefits.sort((a, b) => b[1] - a[1]);
  
  // Turn the highest benefit group green if it has waiting vehicles or has waited too long
  if (groupBenefits.length > 0 && (groupBenefits[0][1] > 0)) {
    const [bestGroup] = groupBenefits[0];
    updatedSystem.lights = updatedSystem.lights.map(light => {
      if (light.syncGroup === bestGroup && !light.isYellow && !light.isGreen) {
        return {
          ...light,
          isGreen: true,
          greenTimeElapsed: 0,
          waitTime: 0 // Reset wait time when turning green
        };
      } else if (!light.isGreen && !light.isYellow) {
        // Increment wait time for lights that remain red
        return {
          ...light,
          waitTime: (light.waitTime || 0) + 1
        };
      }
      return light;
    });
  }
  
  return updatedSystem;
};
