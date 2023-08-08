
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const UserSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [mandalname, setMandalName] = useState("");
  const[data, setData] = useState([])
  const navigate = useNavigate();
  const[address, setAddress] = useState("");

  const handleSelectChange = (e) => {
    const [mandalname, address] = e.target.value.split(',');
    setMandalName(mandalname);
    setAddress(address);
  };
  
  useEffect(()=>{
    const getallmandals = async() =>{
        const get = axios.get("/api/getallmandals")
        .then((res)=>{
  
          // console.log(res)
             setData(res.data.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    getallmandals();
}, [])

   const handleSubmit = async(e) => {
    e.preventDefault();

    // const form ={
    //   mandalname,
    //   name,
    //   phone,
    //   address,
    //   email,
    //   password,
    //    status : "pending"
    // }
    // const save = await axios.post("http://localhost:5000/api/create_user_account", form)
    // if (save.data.status === "User") {

    //   alert("Registration Successful");
    //   navigate(`/userlogin`)

    // } else {
    //   alert("Something went wrong");


    // }
    fetch("/api/create_user_account", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        mandalname,
        name,
        phone,
        address,
        email,
        password,
         status : "pending"
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, "userRegister");
        if (data.status === "User") {

          alert("Registration Successful");
          navigate(`/userlogin`)

        } else {
          alert("Something went wrong");


        }
      });
  };
// console.log(data);
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          {/* <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div> */}

<div className="mb-3">
  <label>Association Name</label>
  <select
    className="form-control"
    onChange={(e) => handleSelectChange(e)}
  >
    <option value="">Select a Group</option>

{data.map((option) => (

  <option value={`${option.mandalname},${option.address}`} key={option.id}>

    {option.mandalname}

  </option>

))}



  </select>
</div>

          <div className="mb-3">
            <label>Name</label>
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
            Already registered <a href="/userlogin">sign in?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserSignUp;
