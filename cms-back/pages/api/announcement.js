import db from "../../src/app/config/db";
import { runCorsMiddleware } from "@/middleware/corsMiddleware";

export default async function handler(req, res) {
  await runCorsMiddleware(req, res);

  if (req.method === "GET") {
    const query = "SELECT * FROM announcement";
    db.query(query, (err, results) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Error fetching announcements", error: err });
      } else {
        res.status(200).json(results);
      }
    });
  } else if (req.method === "DELETE") {
    const { id } = req.query; // Extract ID from query params

    if (!id) {
      return res.status(400).json({ message: "Announcement ID is required" });
    }

    const query = "DELETE FROM announcement WHERE ann_id = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        res.status(500).json({ message: "Error deleting announcement", error: err });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ message: "Announcement not found" });
      } else {
        res.status(200).json({ message: "Announcement deleted successfully" });
      }
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
