import db from "../../src/app/config/db"; // Adjust the path to your DB configuration
import { runCorsMiddleware } from "@/middleware/corsMiddleware";
export default async function handler(req, res) {
  await runCorsMiddleware(req, res);

  if (req.method === "GET") {
    // Handle GET request: Retrieve all contact submissions
    const query = `
      SELECT * FROM contact_us ORDER BY submitted_at DESC
    `;
    db.query(query, (err, results) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Error fetching contact submissions", error: err });
      } else {
        res.status(200).json(results);
      }
    });
  } else if (req.method === "POST") {
    // Handle POST request: Insert a new contact submission
    const { name, email, phone, subject, message } = req.body;
    console.log(req.body);
    // Validate input fields
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        message:
          "All fields (name, email, phone, subject, message) are required",
      });
    }

    const query = `
      INSERT INTO contact_us (name, email, phone, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(query, [name, email, phone, subject, message], (err, result) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Error submitting contact form", error: err });
      } else {
        res.status(201).json({
          message: "Contact form submitted successfully",
          contactId: result.insertId,
        });
      }
    });
  } else {
    // Method Not Allowed for other HTTP methods
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
