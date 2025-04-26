
/**
 * Type definitions for the traffic system
 */

export interface TrafficLight {
  id: number;
  queueLength: number;
  isGreen: boolean;
  isYellow: boolean;
  yellowTimeRemaining: number;
  greenTimeElapsed: number;
  minGreenTime: number;
  maxGreenTime: number;
  syncGroup: number; // Lights with the same syncGroup will change together
  waitTime?: number; // Number of cycles this light has been waiting
}

export interface TrafficSystem {
  lights: TrafficLight[];
  totalWaitTime: number;
  conflicts: [number, number][]; // Pairs of light IDs that conflict (can't be green simultaneously)
}
