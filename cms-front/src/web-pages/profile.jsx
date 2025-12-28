import React, { useEffect, useState } from "react";
import "./Profile.css"; // Import the CSS file

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  console.log(localStorage.getItem("userid"));
  // Simulate fetching user details (Replace with actual API or context)
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")) || {
      username: localStorage.getItem("username"),
      email: localStorage.getItem("email"),
      profilePic:
        "https://img.freepik.com/premium-photo/funny-raccoon-green-sunglasses-shown_937306-180.jpg", // Placeholder profile picture
    };
    setUser(userData);
    setFormData({
      username: userData.username,
      email: userData.email,
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    console.log("Updated user data:", formData);
    setUser({ ...user, ...formData }); // Update the local user state
    setIsEditing(false); // Exit edit mode
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      alert("New password and confirmation do not match!");
      return;
    }
    console.log("Password change data:", passwordData);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    alert("Password updated successfully!"); // Replace with real API call
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <a href="/home" className="back-home-link">
        &#8592; Back to Home
      </a>
      <div className="profile-header">
        <img
          src={user.profilePic}
          alt="User Profile"
          className="profile-picture"
        />
        <h2 className="profile-title">User Profile</h2>
      </div>

      {/* Profile Details Section */}
      <form className="profile-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className="form-control"
          />
        </div>
        {/* <div className="button-container">
          {isEditing ? (
            <button type="button" className="save-button" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button type="button" className="edit-button" onClick={toggleEdit}>
              Edit
            </button>
          )}
        </div> */}
      </form>

      {/* Password Update Section */}
      {/* <form className="profile-form">
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmNewPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={passwordData.confirmNewPassword}
            onChange={handlePasswordChange}
            className="form-control"
          />
        </div>
        <div className="button-container">
          <button
            type="button"
            className="save-button"
            onClick={handleChangePassword}
          >
            Update Password
          </button>
        </div>
      </form> */}
    </div>
  );
};

export default Profile;
