// import React from "react";
// import Footer from "../components/Footer";
// import "./Registration.css";
// import { useState } from "react";

// const SignUp = () => {
//   // State to store form data
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "", // Add ticketType to form state
//   });

//   // State to store validation errors
//   const [errors, setErrors] = useState({});

//   // Handle input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Validate form inputs
//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.username) newErrors.username = "username is required";
//     if (!formData.email) newErrors.email = "email is required";

//     if (!formData.password) newErrors.password = "Password is required";
//     if (!formData.cpassword) newErrors.cpassword = "Confirm your password ";

//     return newErrors;
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//     } else {
//       // Handle successful form submission (e.g., send data to server)
//       console.log("Form submitted successfully", formData);
//       // Reset form data after submission
//       setFormData({
//         username: "",
//         password: "",
//       });
//       setErrors({});
//     }
//   };

//   return (
//     <>
//       <div className="registration-form">
//         <h2>Sign Up</h2>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>User Name:</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleInputChange}
//             />
//             {errors.username && (
//               <span style={{ color: "red" }}>{errors.username}</span>
//             )}
//           </div>

//           <div>
//             <label>Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//             />
//             {errors.email && (
//               <span style={{ color: "red" }}>{errors.email}</span>
//             )}
//           </div>

//           <div>
//             <label>Password:</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//             />
//             {errors.email && (
//               <span style={{ color: "red" }}>{errors.password}</span>
//             )}
//           </div>

//           <div>
//             <label>Confirm Password:</label>
//             <input
//               type="password"
//               name="cpassword"
//               value={formData.cpassword}
//               onChange={handleInputChange}
//             />
//             {errors.email && (
//               <span style={{ color: "red" }}>{errors.cpassword}</span>
//             )}
//           </div>

//           <button
//             type="submit"
//             onSubmit="window.location.href = 'https://website.com/my-account'"
//           >
//             Register
//           </button>
//         </form>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default SignUp;
import React, { useState } from "react";
import Footer from "../components/Footer";
import "./Registration.css";
import axios from "axios"; // Import axios

const SignUp = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "", // Confirm password
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
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.cpassword) newErrors.cpassword = "Confirm your password";

    if (formData.password !== formData.cpassword) {
      newErrors.cpassword = "Passwords do not match";
    }

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
        // Sending POST request to the backend for registration
        const response = await axios.post("http://localhost:3002/api/users", {
          action: "register",
          uname: formData.username,
          email: formData.email,
          password: formData.password,
        });

        if (response.status === 201) {
          alert("Registration successful!");
          window.location.replace("/"); // Redirect to login page
        }
      } catch (error) {
        // Error handling if registration fails
        console.error("Error during registration:", error);
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
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>User Name:</label>
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
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email}</span>
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

          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="cpassword"
              value={formData.cpassword}
              onChange={handleInputChange}
            />
            {errors.cpassword && (
              <span style={{ color: "red" }}>{errors.cpassword}</span>
            )}
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
