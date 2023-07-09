import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const API = `https://mernbackend-ukwc.onrender.com`;

const Registercomponent = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email,pass,name);
    axios({
      method: 'post',
      url: `${API}/signup`,
      data:{
        email:email,
        password:pass,
        name:name
      }
    })
    .then(result=>{
      // console.log("result",result)
      if(result.data.msg.toLowerCase()== "success")
      {
        navigate("/login");

      }

    })
    .catch(err=>{
      console.log(err);
      alert("Credentials Invaild")
      navigate("/register");

    })
  }

  const redirectLogin=()=>{
    navigate("/login");
  
  }
  return (
    <div className='App'>

    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full name     *</label>
        <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" required/>
        <label htmlFor="email">Email         *</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" required/>
        <label htmlFor="password">Password        *</label>
        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" required/>
        <br />
        <button type="submit">Register</button>
      </form>
      <button className="link-btn" onClick={() => redirectLogin()}>Already have an account? Login here.</button>
    </div>
    </div>
  )
}

export default Registercomponent