import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const SignUp = () => {
  const { store } = useContext(Context);
  const history = useNavigate();

  const [formData, setFormData] = useState({
    names: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [registrationMessage, setRegistrationMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registration successful
        console.log("Registration successful");
        setRegistrationMessage("Registration successful");
        setTimeout(() => {
          history("/sign-in");
        }, 2000);
      } else {
        const errorData = await response.json();
        // Handle registration error
        console.log(errorData.msg);
        setRegistrationMessage("Registration failed: " + errorData.msg);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error:", error);
      setRegistrationMessage("Registration failed: " + error.message);
    }
  };

  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      history("/private");
    }
  }, [store.token, history]);

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <p className="forgot-password text-right">
            Already registered? <a href="/sign-in"> Sign In! </a>
          </p>
          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              name="names"
              value={formData.names}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
        </form>
        {registrationMessage && (
          <div className="registration-message">{registrationMessage}</div>
        )}
      </div>
    </div>
  );
};
