import db from "../../src/app/config/db";
import { runCorsMiddleware } from "@/middleware/corsMiddleware";

export default async function handler(req, res) {
  await runCorsMiddleware(req, res);

  if (req.method === "GET") {
    const { uid } = req.query; // Check for 'uid' query parameter

    if (uid) {
      // Fetch conferences for a specific user (with uid)
      const query = "SELECT * FROM conferences WHERE uid = ?";
      db.query(query, [uid], (err, results) => {
        if (err) {
          res.status(500).json({ message: "Error fetching conferences", error: err });
        } else {
          res.status(200).json(results);
        }
      });
    }
    else {
      const query = "SELECT * FROM conferences";
      db.query(query, (err, results) => {
        if (err) {
          res
            .status(500)
            .json({ message: "Error fetching conferences", error: err });
        } else {
          res.status(200).json(results);
        }
      });
    }
  } else if (req.method === "POST") {
    const {
      conf_name,
      uid,
      date,
      pid,
      type,
      done_payment,
      sub_date,
      pres_date,
      conf_link,
    } = req.body;
    if (!conf_name || !uid || !date || !pid || !type) {
      return res.status(400).json({
        message: "conf_name, uid, date, pid, and type are required",
      });
    }
    const query = `
      INSERT INTO conferences (conf_name, uid, date, pid, type, done_payment, sub_date, pres_date, conf_link)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
      query,
      [
        conf_name,
        uid,
        date,
        pid,
        type,
        done_payment,
        sub_date,
        pres_date,
        conf_link,
      ],
      (err, result) => {
        if (err) {
          res
            .status(500)
            .json({ message: "Error creating conference", error: err });
        } else {
          res.status(201).json({
            message: "Conference created successfully",
            conferenceId: result.insertId,
          });
        }
      }
    );
  } else if (req.method === "DELETE") {
    // Extract 'id' from the query parameters (from ?id=9)
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Conference ID is required" });
    }

    const query = "DELETE FROM conferences WHERE cid = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        res.status(500).json({ message: "Error deleting conference", error: err });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ message: "Conference not found" });
      } else {
        res.status(200).json({ message: "Conference deleted successfully" });
      }
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
