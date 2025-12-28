import db from "../../src/app/config/db";
import { runCorsMiddleware } from "@/middleware/corsMiddleware";

export default async function handler(req, res) {
  await runCorsMiddleware(req, res);
  if (req.method === "GET") {
    const query = "SELECT * FROM peer_review";
    db.query(query, (err, results) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Error fetching peer reviews", error: err });
      } else {
        res.status(200).json(results);
      }
    });
  } else if (req.method === "POST") {
    const { pid, uid, cow, opq, mr, noc, comments, no_of_stars } = req.body;
    if (
      !pid ||
      !uid ||
      !cow ||
      !opq ||
      !mr ||
      !noc ||
      !comments ||
      !no_of_stars
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const query = `
      INSERT INTO peer_review (pid, uid, cow, opq, mr, noc, comments, no_of_stars)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
      query,
      [pid, uid, cow, opq, mr, noc, comments, no_of_stars],
      (err, result) => {
        if (err) {
          res
            .status(500)
            .json({ message: "Error creating peer review", error: err });
        } else {
          res.status(201).json({
            message: "Peer review created successfully",
          });
        }
      }
    );
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
