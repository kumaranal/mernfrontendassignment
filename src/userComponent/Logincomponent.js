import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const API = `https://mernbackend-ukwc.onrender.com`;



const Logincomponent = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();




  const handleSubmit = (e) => {
    e.preventDefault();
    const user={
      email:email,
      password:pass
    }

    // console.log(user)
    axios({
      method: 'post',
      url: `${API}/login`,
      data:{
        email:email,
        password:pass
      }
    })
    .then(result=>{
      // console.log("result",result)
      if(result.data.msg.toLowerCase()== "success")
      {
        localStorage.setItem('AUTH', result.data.token);
        localStorage.setItem('USERNAME', result.data.username);

        navigate("/post");

      }

    })
    .catch(err=>{
      console.log(err);
      alert("Credentials Invaild")
      navigate("/login");

    })
  }

  // const handleLoginSuccess = (user) => {
  //   navigate("/home", {
  //     state: { user },
  //   });
  // };

const redirectRegister=()=>{
  navigate("/register");

}

  return (
    <div className='App'>
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email    *</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" required/>
        <label htmlFor="password">Password      *</label>
        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" required />
        <br/>
        <button type="submit">Log In</button>
      </form>
      <button className="link-btn" onClick={() =>  redirectRegister()}>Don't have an account? Register here.</button>
    </div>
    </div>
  )
}

export default Logincomponent


