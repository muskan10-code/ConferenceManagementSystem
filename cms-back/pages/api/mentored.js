import db from "../../src/app/config/db";
import { runCorsMiddleware } from "@/middleware/corsMiddleware";

export default async function handler(req, res) {
  await runCorsMiddleware(req, res);

  if (req.method === "GET") {
    const query = "SELECT * FROM mentored";
    db.query(query, (err, results) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Error fetching mentored data", error: err });
      } else {
        res.status(200).json(results);
      }
    });
  } else if (req.method === "POST") {
    const { uid, mid, topics, date, start_time, end_time } = req.body;
    if (!uid || !mid || !topics || !date || !start_time || !end_time) {
      return res.status(400).json({
        message:
          "uid, mid, topics, date, start_time, and end_time are required",
      });
    }
    const query = `
      INSERT INTO mentored (uid, mid, topics, date, start_time, end_time)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(
      query,
      [uid, mid, topics, date, start_time, end_time],
      (err, result) => {
        if (err) {
          res
            .status(500)
            .json({ message: "Error creating mentored record", error: err });
        } else {
          res.status(201).json({
            message: "Mentored record created successfully",
          });
        }
      }
    );
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
