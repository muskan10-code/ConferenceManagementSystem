import fs from "fs";
import path from "path";
import formidable from "formidable"; // A lightweight library for parsing incoming form data
import db from "../../src/app/config/db";
import { runCorsMiddleware } from "@/middleware/corsMiddleware";

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing for file uploads
  },
};

export default async function handler(req, res) {
  await runCorsMiddleware(req, res);

  if (req.method === "POST") {
    const form = new formidable.IncomingForm();

    // Define the upload directory
    const uploadDir = path.join(process.cwd(), "src/app/papers");

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log("Created upload directory:", uploadDir);
    }

    form.uploadDir = uploadDir; // Set the directory for file uploads
    form.keepExtensions = true; // Retain file extensions

    // Parse the incoming form
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Formidable error:", err);
        return res.status(400).json({ message: "Error parsing form data" });
      }

      const { pname, abstract, uid } = fields;
      const file = files.file; // The uploaded file, `file` must match the key in FormData

      console.log("Fields:", fields);
      console.log("File details:", file);

      // Validate the required fields
      if (!pname || !abstract || !uid || !file) {
        return res
          .status(400)
          .json({ message: "All fields are required, including a file" });
      }

      // Save the file with a unique name
      const filePath = path.join(uploadDir, `${Date.now()}-${file.originalFilename}`);
      fs.renameSync(file.filepath, filePath);

      // Insert data into the database
      const query = `
        INSERT INTO paper (pname, abstract, file, uid)
        VALUES (?, ?, ?, ?)
      `;
      db.query(query, [pname, abstract, filePath, uid], (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Error saving paper to database", error: err });
        }

        res.status(201).json({
          message: "Paper submitted successfully",
          paperId: result.insertId,
          filePath,
        });
      });
    });
  } else if (req.method === "GET") {
    // Fetch all papers from the database
    const query = "SELECT * FROM paper";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: "Error fetching papers", error: err });
      } else {
        res.status(200).json(results);
      }
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
