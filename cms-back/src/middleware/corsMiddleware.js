import Cors from "cors";

// Initialize CORS middleware
const cors = Cors({
  methods: ["GET", "POST", "OPTIONS", "DELETE", "FETCH"],
  origin: "http://localhost:3000", // Your frontend URL (adjust as needed)
  credentials: true, // Include credentials if needed
});

export function runCorsMiddleware(req, res) {
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}