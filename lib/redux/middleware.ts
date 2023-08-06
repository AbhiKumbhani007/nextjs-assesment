import { createLogger } from "redux-logger";

// Define an array `middleware` that will hold the Redux logger middleware
const middleware = [
  // Create a logger middleware instance with specific configuration options
  createLogger({
    duration: true, // Show the duration of each action (time taken to process the action)
    timestamp: false, // Do not show timestamps for each log entry
    collapsed: true, // Collapse log entries for actions with payloads (e.g., not showing the complete payload)
    colors: {
      title: () => "#139BFE", // Color for the action title in the log entry
      prevState: () => "#1C5FAF", // Color for the previous state in the log entry
      action: () => "#149945", // Color for the dispatched action in the log entry
      nextState: () => "#A47104", // Color for the next state in the log entry
      error: () => "#ff0005", // Color for errors in the log entry
    },
    predicate: () => typeof window !== "undefined", // Only log when running in a browser environment (not in Node.js)
  }),
];

// Export the `middleware` array for use in the Redux store setup
export { middleware };
