import db from "../../src/app/config/db";
import { runCorsMiddleware } from "@/middleware/corsMiddleware";

export default async function handler(req, res) {
  await runCorsMiddleware(req, res);

  if (req.method === "GET") {
    const query = "SELECT * FROM mentorship";
    db.query(query, (err, results) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Error fetching mentorships", error: err });
      } else {
        res.status(200).json(results);
      }
    });
  } else if (req.method === "POST") {
    const { mname, dept, aoe } = req.body;
    if (!mname || !dept || !aoe) {
      return res
        .status(400)
        .json({ message: "mname, dept, and aoe are required" });
    }
    const query = "INSERT INTO mentorship (mname, dept, aoe) VALUES (?, ?, ?)";
    db.query(query, [mname, dept, aoe], (err, result) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Error creating mentorship", error: err });
      } else {
        res.status(201).json({
          message: "Mentorship created successfully",
          mentorshipId: result.insertId,
        });
      }
    });
  } else if (req.method === "DELETE") {
    const { id } = req.query; // Extract 'id' from dynamic route
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const query = "DELETE FROM mentorship WHERE mid = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Error deleting mentorship", error: err });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ message: "Mentorship not found" });
      } else {
        res.status(200).json({ message: "Mentorship deleted successfully" });
      }
    });
  }
  else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}