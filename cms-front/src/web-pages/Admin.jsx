import React from "react";
import Footer from "../components/Footer";
import "./Registration.css";
import { useState } from "react";

const Admin = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // State to store validation errors
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // To handle loading state
  const [loginError, setLoginError] = useState(""); // To show login errors

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";

    return newErrors;
  };

  const baseurl = window.location.href;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Clear any previous login errors
      setLoginError("");
      setLoading(true);

      try {
        const response = await fetch("http://localhost:3002/api/admin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "login",
            username: formData.username,
            password: formData.password,
          }),
        });

        const data = await response.json();

        // Check if login was successful
        if (response.ok) {
          window.location.replace(baseurl + "home");
          console.log("Login successful", data);
        } else {
          // Display error message from the response
          setLoginError(data.message || "Login failed. Please try again.");
        }
      } catch (error) {
        setLoginError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }

      // Reset form data after submission
      setFormData({
        username: "",
        password: "",
      });
    }
  };

  return (
    <>
      <div className="registration-form">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && (
              <span style={{ color: "red" }}>{errors.username}</span>
            )}
          </div>

          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <span style={{ color: "red" }}>{errors.password}</span>
            )}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
          <br />
          <br />
          {/* <span>
            <a style={{ color: "green", float: "right" }}>Forgot Password?</a>
            <a
              style={{ color: "green", float: "left" }}
              href={baseurl + "signup"}
            >
              Sign up
            </a>
          </span> */}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
