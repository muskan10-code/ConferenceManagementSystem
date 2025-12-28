import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import "./Registration.css";
import { useState } from "react";

const RegistrationForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    paperName: "",
    email: "",
    submissionDate: "",
    presentationDate: "",
    ticketType: "",
  });

  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Payment details and errors
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cvv: "",
    expiryDate: "",
  });
  const [paymentErrors, setPaymentErrors] = useState({});

  // State to store validation errors for the form
  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle payment input changes
  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });
  };

  // Modal handlers
  const handlePayment = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Validate modal payment inputs
  const validatePayment = () => {
    const errors = {};
    if (
      !paymentDetails.cardNumber ||
      !/^\d{16}$/.test(paymentDetails.cardNumber)
    ) {
      errors.cardNumber = "Valid 16-digit card number is required";
    }
    if (!paymentDetails.cvv || !/^\d{3}$/.test(paymentDetails.cvv)) {
      errors.cvv = "Valid 3-digit CVV is required";
    }
    if (
      !paymentDetails.expiryDate ||
      !/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate)
    ) {
      errors.expiryDate = "Valid expiry date (MM/YY) is required";
    }
    return errors;
  };

  // Handle payment completion
  const completePayment = () => {
    const validationErrors = validatePayment();
    if (Object.keys(validationErrors).length > 0) {
      setPaymentErrors(validationErrors);
    } else {
      setIsPaymentDone(true);
      setIsModalOpen(false);
      alert("Payment completed successfully!");
      setPaymentErrors({});
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData.paperName) newErrors.paperName = "Paper Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.submissionDate)
      newErrors.submissionDate = "Submission Date is required";
    if (!formData.presentationDate)
      newErrors.presentationDate = "Presentation Date is required";
    if (!formData.ticketType) newErrors.ticketType = "Ticket type is required";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      alert(
        "Registration successful! An email with tickets is sent to your mailbox."
      );
      console.log("Form submitted successfully", formData);
      setFormData({
        paperName: "",
        email: "",
        submissionDate: "",
        presentationDate: "",
        ticketType: "",
      });
      setErrors({});
    }
  };

  return (
    <>
      <NavBar />
      <h1>Welcome {localStorage.getItem("username")}!</h1>
      <div className="registration-form">
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Paper Name:</label>
            <input
              type="text"
              name="paperName"
              value={formData.paperName}
              onChange={handleInputChange}
            />
            {errors.paperName && (
              <span style={{ color: "red" }}>{errors.paperName}</span>
            )}
          </div>

          <div>
            <label>Ticket Type:</label>
            <fieldset>
              <div>
                <input
                  type="radio"
                  id="presenter"
                  name="ticketType"
                  value="Presenter"
                  checked={formData.ticketType === "Presenter"}
                  onChange={handleInputChange}
                />
                <label htmlFor="presenter">Presenter</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="attendee"
                  name="ticketType"
                  value="Attendee"
                  checked={formData.ticketType === "Attendee"}
                  onChange={handleInputChange}
                />
                <label htmlFor="attendee">Attendee</label>
              </div>
            </fieldset>
            {errors.ticketType && (
              <span style={{ color: "red" }}>{errors.ticketType}</span>
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
            <label>Submission Date:</label>
            <input
              type="date"
              name="submissionDate"
              value={formData.submissionDate}
              onChange={handleInputChange}
            />
            {errors.submissionDate && (
              <span style={{ color: "red" }}>{errors.submissionDate}</span>
            )}
          </div>

          <div>
            <label>Paper Presentation Date:</label>
            <input
              type="date"
              name="presentationDate"
              value={formData.presentationDate}
              onChange={handleInputChange}
            />
            {errors.presentationDate && (
              <span style={{ color: "red" }}>{errors.presentationDate}</span>
            )}
          </div>

          <p>*Please complete the payment first to register</p>
          {isPaymentDone ? (
            <div>
              <button type="submit">Register</button>
            </div>
          ) : (
            <div>
              <button type="button" onClick={handlePayment}>
                Proceed to Payment
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Payment Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Enter Payment Details</h3>
            <div>
              <label>Credit Card Number:</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                maxLength="16"
                value={paymentDetails.cardNumber}
                onChange={handlePaymentInputChange}
              />
              {paymentErrors.cardNumber && (
                <span style={{ color: "red" }}>{paymentErrors.cardNumber}</span>
              )}
            </div>
            <div>
              <label>CVV:</label>
              <input
                type="text"
                name="cvv"
                placeholder="XXX"
                maxLength="3"
                value={paymentDetails.cvv}
                onChange={handlePaymentInputChange}
              />
              {paymentErrors.cvv && (
                <span style={{ color: "red" }}>{paymentErrors.cvv}</span>
              )}
            </div>
            <div>
              <label>Expiry Date:</label>
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={paymentDetails.expiryDate}
                onChange={handlePaymentInputChange}
              />
              {paymentErrors.expiryDate && (
                <span style={{ color: "red" }}>{paymentErrors.expiryDate}</span>
              )}
            </div>
            <div>
              <button onClick={completePayment}>Complete Payment</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default RegistrationForm;
