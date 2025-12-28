import db from "../../src/app/config/db";
import { runCorsMiddleware } from "@/middleware/corsMiddleware";

export default async function handler(req, res) {
  await runCorsMiddleware(req, res);

  if (req.method === "GET") {
    const query = "SELECT * FROM job_board";
    db.query(query, (err, results) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Error fetching job board entries", error: err });
      } else {
        res.status(200).json(results);
      }
    });
  } else if (req.method === "POST") {
    const { jname, j_link } = req.body;
    if (!jname || !j_link) {
      return res
        .status(400)
        .json({ message: "job name and job link are required" });
    }
    const query = "INSERT INTO job_board (jname, j_link) VALUES (?, ?)";
    db.query(query, [jname, j_link], (err, result) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Error creating job board entry", error: err });
      } else {
        res.status(201).json({
          message: "Job board entry created successfully",
          jobId: result.insertId,
        });
      }
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
