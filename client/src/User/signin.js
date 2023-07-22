import React, { Component, useState, useRef, useEffect } from "react";
// import Page from "./page";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AccountContext } from "../context/AccountProvider";
import axios from "axios";

const UserLogin = () => {
  const { setUser } = useContext(AccountContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loading,setLoading] = useState(false)
  const navigate = useNavigate();
  //  console.log(email, password);

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = {
      email,
      password,
    }

    fetch("/authenticate_user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // console.log(data.status == "User");
        if (data.status == "User") {
          console.log(data);
          alert("login successful");
          localStorage.setItem("link", JSON.stringify(data));
          setUser(data);
          navigate(`/form/${data.id}`)

        } else {
          alert(JSON.stringify(data.error));
        }
      });
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* <div className="mb-3">
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
          </div> */}

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>


          </div>
          <p className="forgot-password text-right">
            <a href="/usersignup">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;