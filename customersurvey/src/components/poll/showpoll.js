import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Showpoll() {
  const navigate=useNavigate()
  const abc = path => {
    navigate(path);
  };
  return (
    
    <div>
      <p className="loginname">&nbsp;Logged in by &nbsp;<br></br> {localStorage.getItem("Name")}&nbsp;&nbsp;&nbsp;
        <br></br><center><button onClick={()=>{
            navigate("/login")
            localStorage.removeItem("Name")}}>LogOut</button></center>
        <br></br>
        </p>
      <center><h1 style={{ marginTop: "8vh"}}>Thank You For Submitting</h1>
    <button style={{
margin:"20vh",
  width:"300px",
    height:"100px",
    border:"0",
    color:"#3562FF",
    borderRadius: "20px",
    fontWeight:"bolder",
    fontSize: "30px",
    
   
    }} onClick={() => abc('/showallpolls')}>Show All Polls </button>
     </center>
     </div>
    
  )
}
