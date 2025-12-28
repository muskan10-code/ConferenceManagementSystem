import db from "../../src/app/config/db";
import { runCorsMiddleware } from "@/middleware/corsMiddleware";

export default async function handler(req, res) {
  await runCorsMiddleware(req, res);

  if (req.method === "GET") {
    const query = "SELECT * FROM work_shop";
    db.query(query, (err, results) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Error fetching workshops", error: err });
      } else {
        res.status(200).json(results);
      }
    });
  } else if (req.method === "POST") {
    const { w_name, w_link } = req.body;

    if (!w_name || !w_link) {
      return res
        .status(400)
        .json({ message: "w_name and w_link are required" });
    }

    const query = "INSERT INTO work_shop (w_name, w_link) VALUES (?, ?)";
    db.query(query, [w_name, w_link], (err, result) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Error creating workshop", error: err });
      } else {
        res.status(201).json({
          message: "Workshop created successfully",
          workshopId: result.insertId,
        });
      }
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
