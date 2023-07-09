import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom"
import Switch from '@mui/material/Switch';
import { ToggleButton } from '@mui/material';
const API = `https://mernbackend-ukwc.onrender.com`;

const Updatepost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // console.log("location",location.state)
    const [title, settitle] = useState(location.state.title);
    const [body, setbody] = useState(location.state.body);
    const [latitude,setLatitude]=useState(location.state.latitudeData)
    const [longitude,setLongitude]=useState(location.state.longitude)

    let val=true;
    if(location.state.status=="Active")
    { val=true}
    else{
      val=false
    }
    const [checked, setChecked] = useState(val);

    const auth = localStorage.getItem('AUTH');
    const userId=location.state.id;
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(title);
        if (navigator.geolocation) {

          navigator.geolocation.getCurrentPosition((pos,err) => {
            let position = pos;
            // console.log("position", position)
            const latitudeData=position.coords.latitude.toString()
            const longitudeData=position.coords.longitude.toString()
            setLatitude(latitudeData);
            setLongitude(longitudeData);
          });
        }
        let statusValue=1
        if(checked==false){
          statusValue=0
        }
        axios({
          method: 'put',
          url: `${API}/tasks/${userId}`,
          data:{
            title:title,
            body:body,
            latitude:latitude,
            longitude:longitude,
            status:statusValue
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
    <h2>Update Post </h2>
    <form className="login-form" onSubmit={handleSubmit}>
      <label htmlFor="title">title</label>
      <input value={title} onChange={(e) => settitle(e.target.value)} type="title" placeholder="title" id="title" name="title" />
      <label htmlFor="body">body</label>

      <textarea value={body} onChange={(e) => setbody(e.target.value)} type="text" placeholder="write your content" id="body" name="body" rows={6} cols={40} />
      <br/>
      <label htmlFor="status">Status</label>

      <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    /> 
      <br/>
      <button type="submit">Update Post</button>
    </form>
  </div> 
  </div>  )
}

export default Updatepost