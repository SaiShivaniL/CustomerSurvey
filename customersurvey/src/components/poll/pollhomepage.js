import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import '../login/navigation'
import Navigation from '../login/navigation';
import axios from 'axios';
import { useEffect } from 'react';

export default function PollHomePage() {
  const navigate=useNavigate()
  const abc = path => {
    navigate(path);
  };
  var {state}=useLocation()
    var {code}=state || "notsecret"
   console.log("insurvey=",code)
    useEffect(()=>{
        if(code==="notsecret"){
            navigate('/login')
        }
        if(!localStorage.getItem("Name")){
         navigate("/login")
        }
         axios.get("http://localhost:8000/users/"+localStorage.getItem("Name")).then((data)=>{
          if(data.data.length===0){
             navigate("/login")
          }
        })
     },[])
  return (
    
    <div>
        <Navigation/>
      <center>
      <button style={{
margin:"10vh",
  width:"300px",
    height:"100px",
    border:"0",
    color:"#3562FF",
    borderRadius: "20px",
    fontWeight:"bolder",
    fontSize: "30px",
    cursor:"pointer"
   
    }} onClick={() => abc('/createPoll')}>Create Poll </button>
      <br/>


    <button style={{
margin:"5vh",
  width:"300px",
    height:"100px",
    border:"0",
    color:"#3562FF",
    borderRadius: "20px",
    fontWeight:"bolder",
    fontSize: "30px",
    cursor:"pointer"
    
   
    }} onClick={() => abc('/showallpolls')}>Show All Polls </button>
     </center>
     </div>
    
  )
}