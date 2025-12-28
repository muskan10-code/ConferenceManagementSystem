//
import React, { useState } from "react";
import axios from "axios"; // Import axios
import Footer from "../components/Footer";
import "./Registration.css";

const Login = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // State to store validation errors
  const [errors, setErrors] = useState({});

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({}); // Clear errors before submission

      try {
        // Sending GET request to the backend with login credentials as query parameters
        const response = await axios.get("http://localhost:3002/api/users", {
          params: {
            uname: formData.username,
            password: formData.password,
          },
        });
        console.log("hi response" + response.data.email);

        if (response.status === 200) {
          // Login successful, redirect to home page
          console.log(response.data.uid);
          localStorage.setItem("userid", response.data.uid);
          localStorage.setItem("username", response.data.uname); // Avoid storing passwords in local storage
          localStorage.setItem("email", response.data.email || "");
          localStorage.setItem("loggedIn", true);
          console.log("userid", localStorage.getItem("userid"))
          alert("Login successful!");
          window.location.replace("/home"); // Redirect to home page
        }
      } catch (error) {
        // Error handling if login fails
        console.error("Error during login:", error);
        alert(
          error.response?.data?.message ||
          "An error occurred. Please try again."
        );
      }
    }
  };

  return (
    <>
      <div className="registration-form">
        <h2>Login</h2>
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

          <button type="submit">Login</button>
          <br />
          <br />
          <span>
            <a
              style={{ color: "green", float: "right" }}
              href="/forgot-password"
            >
              Forgot Password?
            </a>
            <a style={{ color: "green", float: "left" }} href="/signup">
              Sign up
            </a>
          </span>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
