import React, { useEffect } from "react";
import "./login.css";
import {FaPoll} from 'react-icons/fa'
import {RiSurveyLine} from 'react-icons/ri'
import {useNavigate,useLocation} from "react-router-dom";
import axios from "axios";
const SurveyPage = () => {
    const navigate=useNavigate()
    var {state}=useLocation()
    var {code}=state || "notsecret"
   
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
      <div className="lpage">
          <p className="loginname">&nbsp;Logged in by &nbsp;<br></br> {localStorage.getItem("Name")}&nbsp;&nbsp;&nbsp;
          <br></br><center><button onClick={()=>{
            navigate("/login")
            localStorage.removeItem("Name")}}>LogOut</button></center>
        <br></br></p>
       <div className="lcover">
            <button className="survey-btn" onClick={()=>navigate("/Page",{state: {code:"secret"} })}>Survey/Feedback  <RiSurveyLine/></button>
            <button className="survey-btn" onClick={()=>navigate("/createPoll",{state: {code:"secret"} })}>Polls   <FaPoll/></button>
        </div>              
    </div>
    )
}
export default SurveyPage