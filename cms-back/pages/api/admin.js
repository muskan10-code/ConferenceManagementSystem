import db from "../../src/app/config/db";
import { runCorsMiddleware } from "@/middleware/corsMiddleware";

export default async function handler(req, res) {
    await runCorsMiddleware(req, res);

    // Handle POST request for login
    if (req.method === "POST") {
        const { username, password, action } = req.body;

        // Check if the action is login
        if (action === "login") {
            if (!username || !password) {
                return res.status(400).json({ message: "Username and password are required" });
            }

            // Query the database to check if the username exists
            const query = "SELECT * FROM admin WHERE uname = ? AND password = ?";
            db.query(query, [username, password], (err, results) => {
                if (err) {
                    return res.status(500).json({ message: "Error validating admin", error: err });
                }

                // If no matching user is found
                if (results.length === 0) {
                    return res.status(401).json({ message: "Invalid credentials" });
                }

                // If credentials are correct, allow the user to continue
                res.status(200).json({
                    success: true,
                    message: "Login successful",
                    userRole: "admin", // You can modify this based on your logic
                });
            });
        } else {
            res.status(400).json({ message: "Invalid action" });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
