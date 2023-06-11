import React, { Component, useContext, useState } from "react";
import context from "react-bootstrap/esm/AccordionContext";
import { Context } from "../store/appContext";
// import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = sessionStorage.getItem("token");

  const clickHandler = () => {
    const opt = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    fetch("http://127.0.0.1:3001/api/token", opt)
      .then((resp) => {
        if (resp.status === 200) return resp.json();
        else alert("An error has been found");
      })
      .then((data) => {
        console.log("Backend data check", data);
        sessionStorage.setItem("token", data.access_token);
        window.location.reload();
      })
      .catch((error) => {
        console.error("ERROR ERROR ERROR DOES NOT COMPUTE", error);
      });
  };

  return (
    <div className="auth-wrapper">
      {token && token != "" && token != undefined ? (
        "This is the token logged in" + token
      ) : (
        <div className="auth-inner">
          <form>
            <h3>Sign In</h3>
            <p className="forgot-password text-right">
              Not registered? <a href="/sign-up"> Sign Up! </a>
            </p>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={clickHandler}
              >
                Submit
              </button>
            </div>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};
