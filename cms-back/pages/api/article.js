import db from "../../src/app/config/db";
import { runCorsMiddleware } from "@/middleware/corsMiddleware";

export default async function handler(req, res) {
  await runCorsMiddleware(req, res);
  if (req.method === "GET") {
    const query = "SELECT * FROM article";
    db.query(query, (err, results) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Error fetching articles", error: err });
      } else {
        res.status(200).json(results);
      }
    });
  } else if (req.method === "POST") {
    const { a_name, a_link } = req.body;
    if (!a_name || !a_link) {
      return res
        .status(400)
        .json({ message: "a_name and a_link are required" });
    }
    const query = "INSERT INTO article (a_name, a_link) VALUES (?, ?)";
    db.query(query, [a_name, a_link], (err, result) => {
      if (err) {
        res.status(500).json({ message: "Error creating article", error: err });
      } else {
        res.status(201).json({
          message: "Article created successfully",
          articleId: result.insertId,
        });
      }
    });
  } else if (req.method === "DELETE") {
    const { id } = req.query; // Extract ID from query params

    if (!id) {
      return res.status(400).json({ message: "Article ID is required" });
    }

    const query = "DELETE FROM article WHERE a_id = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        res.status(500).json({ message: "Error deleting article", error: err });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ message: "Article not found" });
      } else {
        res.status(200).json({ message: "Article deleted successfully" });
      }
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
