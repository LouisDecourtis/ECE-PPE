import { TrafficSystem } from "./types";

const GREEN_DURATION = 10; // Duration in ticks for green phase
const YELLOW_DURATION = 3; // Duration in ticks for yellow phase

interface FixedTimingState {
  currentGreenGroup: number;
  phase: "green" | "yellow";
  timer: number;
  cycleCount: number; // Track cycle count to ensure proper cycling
}

export function fixedTimingControl(system: TrafficSystem): TrafficSystem {
  // Use a type assertion to extend TrafficSystem with an optional fixedTimingState property.
  const sys = system as TrafficSystem & { fixedTimingState?: FixedTimingState };

  // Extract a sorted list of unique sync groups from the system's lights
  const syncGroups = Array.from(
    new Set(sys.lights.map(light => light.syncGroup))
  ).sort((a, b) => a - b);

  // Initialize the fixed timing state if it doesn't exist
  if (!sys.fixedTimingState) {
    sys.fixedTimingState = {
      currentGreenGroup: syncGroups[0], // Start with the first group
      phase: "green",
      timer: GREEN_DURATION,
      cycleCount: 0
    };
  }

  const state = sys.fixedTimingState;

  // Decrement the timer
  state.timer -= 1;

  // Check if the current phase timer has expired
  if (state.timer <= 0) {
    if (state.phase === "green") {
      // Transition from green to yellow
      state.phase = "yellow";
      state.timer = YELLOW_DURATION;
    } else if (state.phase === "yellow") {
      // When yellow finishes, cycle to the next sync group
      
      // Find the current index in the sync groups
      const currentIndex = syncGroups.indexOf(state.currentGreenGroup);
      
      // Calculate the next index, ensuring we cycle through all groups
      const nextIndex = (currentIndex + 1) % syncGroups.length;
      
      // Get the next group
      state.currentGreenGroup = syncGroups[nextIndex];
      
      // Increment cycle count
      state.cycleCount++;
      
      // Start the new group in green phase
      state.phase = "green";
      state.timer = GREEN_DURATION;
    }
  }

  // Update every light's status based on the fixed timing state:
  // Only lights in the currentGreenGroup are active (green/yellow); others are red.
  sys.lights.forEach(light => {
    if (light.syncGroup === state.currentGreenGroup) {
      light.isGreen = state.phase === "green";
      light.isYellow = state.phase === "yellow";
    } else {
      light.isGreen = false;
      light.isYellow = false;
    }
  });

  return system;
}
