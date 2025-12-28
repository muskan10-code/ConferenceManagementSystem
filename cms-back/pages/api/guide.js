import db from "../../src/app/config/db";
import { runCorsMiddleware } from "@/middleware/corsMiddleware";

export default async function handler(req, res) {
  await runCorsMiddleware(req, res);
  if (req.method === "GET") {
    const query = "SELECT * FROM guide";
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ message: "Error fetching guides", error: err });
      } else {
        res.status(200).json(results);
      }
    });
  } else if (req.method === "POST") {
    const { g_name, g_link } = req.body;
    if (!g_name || !g_link) {
      return res
        .status(400)
        .json({ message: "g_name and g_link are required" });
    }
    const query = "INSERT INTO guide (g_name, g_link) VALUES (?, ?)";
    db.query(query, [g_name, g_link], (err, result) => {
      if (err) {
        res.status(500).json({ message: "Error creating guide", error: err });
      } else {
        res.status(201).json({
          message: "Guide created successfully",
          guideId: result.insertId,
        });
      }
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
