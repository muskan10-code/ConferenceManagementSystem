import db from "../../src/app/config/db";
import { runCorsMiddleware } from "@/middleware/corsMiddleware";

export default async function handler(req, res) {
  await runCorsMiddleware(req, res);

  // Handle GET for login (first)
  if (req.method === "GET") {
    const { uname, password } = req.query; // Use query params for GET

    // Check if username and password are provided
    if (!uname || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Query to find the user by username
    const query = "SELECT * FROM users WHERE uname = ?";
    db.query(query, [uname], (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }

      // Check if user exists
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      console.log(results);
      const storedPassword = results[0].password;
      const { uid, uname, email } = results[0];

      // Compare the provided password with the stored password (plain text comparison)
      if (password !== storedPassword) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      // Successful login
      return res
        .status(200)
        .json({ message: "Login successful", uid, uname, email });
    });
  }

  // Handle POST for registration (second)
  else if (req.method === "POST") {
    const { action, uname, email, password } = req.body;

    if (!action) {
      return res.status(400).json({ message: "Action (register) is required" });
    }

    if (action === "register") {
      // Validate fields for registration
      if (!uname || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Query to check if the user already exists
      const checkQuery = "SELECT * FROM users WHERE email = ?";
      db.query(checkQuery, [email], (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        }

        if (results.length > 0) {
          return res
            .status(400)
            .json({ message: "User already exists with this email" });
        }

        // Query to insert the new user with the plain text password
        const insertQuery =
          "INSERT INTO users (uname, email, password) VALUES (?, ?, ?)";
        db.query(insertQuery, [uname, email, password], (err, result) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error creating user", error: err });
          }

          return res.status(201).json({
            message: "User created successfully",
            userId: result.insertId,
          });
        });
      });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid action. Use 'register'" });
    }
  }
  // Handle PUT for updating user details (including password)
  else if (req.method === "PUT") {
    const { uname, email, newPassword, newEmail } = req.body;

    if (!uname || !newPassword) {
      return res
        .status(400)
        .json({ message: "Username and new password are required" });
    }

    // Query to check if the user exists
    const checkUserQuery = "SELECT * FROM users WHERE uname = ?";
    db.query(checkUserQuery, [uname], (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }

      // Check if user exists
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      // Prepare update query (can include optional email change)
      const updateQuery = `
        UPDATE users 
        SET password = ?, 
            email = IFNULL(?, email) 
        WHERE uname = ?
      `;
      const queryParams = [newPassword, newEmail, uname];

      db.query(updateQuery, queryParams, (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error updating user", error: err });
        }

        return res.status(200).json({ message: "User updated successfully" });
      });
    });
  }

  // Handle unsupported methods
  else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}