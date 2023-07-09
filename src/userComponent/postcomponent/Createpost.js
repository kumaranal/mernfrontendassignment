import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const API = `https://mernbackend-ukwc.onrender.com`;

const Createpost = (props) => {
    const [title, settitle] = useState('');
    const [body, setbody] = useState('');
    const [latitude,setLatitude]=useState(0)
    const [longitude,setLongitude]=useState(0)
    const auth = localStorage.getItem('AUTH');
    const navigate = useNavigate();

    useEffect(() => {
      getlocation()
    },[]);

    const getlocation=async()=>{
      // console.log("gk")
      if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(async(pos,err) => {
          let position = await pos;
          // console.log("position", position)
          await setLatitude(position.coords.latitude);
          await setLongitude(position.coords.longitude);
        });
      }
      else{
        // console.log("alert")
        alert("location permission needed for better reach of post")
      }
    } 

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const latitudeData=await latitude.toString()
        const longitudeData=await longitude.toString()

        // console.log(latitudeData,longitudeData)

        axios({
          method: 'post',
          url: `${API}/tasks`,
          data:{
            title:title,
            body:body,
            status:1,
            latitude:latitudeData,
            longitude:longitudeData
          },
          headers: {
              "Authorization": auth
          }
      })
          .then(result => {
            if(result.data.msg.toLowerCase()== "success")
            {
              navigate("/post/view");
            }
          })
          .catch(err => {
              console.log(err);
              alert("Invalid Credentials")
          })
    }
  return (
    <div className='App'>
    <div className="auth-form-container">
    <h2>POST </h2>
    <form className="login-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input value={title} onChange={(e) => settitle(e.target.value)} type="text" placeholder="title" id="title" name="title" required/>
      <label htmlFor="body">Body</label>
      <textarea value={body} onChange={(e) => setbody(e.target.value)} type="text" placeholder="write your content" id="body" name="body" rows={6} cols={40} required/>
      <br/>
      <button type="submit">Submit Post</button>
    </form>
  </div> 
  </div>
   )
}

export default Createpost