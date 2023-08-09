import React, { Component, useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";



export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

    fetch(`/api/authenticate_admin`, {
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
        // console.log(data, "userRegister");
        // console.log(data)
      //   if (data.status == "Admin") {
      //     if(data.active == "success"){
      //     alert("login successful");
      //    localStorage.setItem("info", JSON.stringify(data));
      //    setInfo(data)
      //    navigate(`/form/admin/${data.id}`)
      //     // window.localStorage.setItem("loggedIn", true);}
      //  }
      //  else{
      //   alert("login pending");
      //  }
      // }
      if (data.status === "Admin" && data.active === "success") {
        alert("Login successful");
        localStorage.setItem("info", JSON.stringify(data));
        navigate(`/form/admin/${data.id}`);
      } else {
        alert("Kindly Complete Your KYC to Login");
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
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right">
            <a href="/adminsignup">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}
