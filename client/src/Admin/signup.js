import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const AdminSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [mandalname, setMandalName] = useState("");
  const [registration, setRegistration] = useState("")
  const [pincode , setPincode] = useState("")
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/create_admin_account`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        mandalname,
        registration,
        name,
        phone,
        address,
        pincode,
        email,
        password,
        active:"pending"
       
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "userRegister");
        if (data.status === "Admin") {
          alert("Registration Successful");
          navigate("/adminlogin")
        } else {
          alert("Something went wrong");
        }
      });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <div className="mb-3">
          <label>Association Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={(e) => setMandalName(e.target.value)}
            />
            
          </div>
          <div>
          <label>Registration Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Registration Number"
              onChange={(e) => setRegistration(e.target.value)}
            />
            
          </div>

          <div className="mb-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Phone Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Pin Code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Pin Code"
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
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

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/adminlogin">sign in?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminSignUp;
