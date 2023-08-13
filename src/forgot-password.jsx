import React, { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email validation
    if (!emailIsValid(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    fetch("/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (response.ok) {
          setIsSubmitted(true);
          setSuccessMessage("Password reset email sent successfully.");
          setErrorMessage("");
        } else if (response.status === 404) {
          setIsSubmitted(true);
          setSuccessMessage("");
          setErrorMessage("Email not found. Please check your email address.");
        } else {
          throw new Error("Failed to send password reset email.");
        }
      })
      .catch((error) => {
        setIsSubmitted(true);
        setSuccessMessage("");
        setErrorMessage("An error occurred. Please try again later.");
        console.error("Error:", error);
      });
  };

  const emailIsValid = (email) => {
    // Simple email validation using regular expression
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {isSubmitted && successMessage && <p>{successMessage}</p>}
      {isSubmitted && errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
