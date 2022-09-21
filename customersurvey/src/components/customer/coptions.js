import React from "react";
import "../login/login.css";
import {FaPoll} from 'react-icons/fa'
import {RiSurveyLine} from 'react-icons/ri'
import {useNavigate} from "react-router-dom";
import axios from "axios";
const CsurveyPage = () => {
    const navigate=useNavigate() 
    {if(!localStorage.getItem("cName") && !localStorage.getItem("cEmail")){
        this.props.navigate("/cfront")
    }}    
    return (
      <div className="lpage">
          <p className="loginname">&nbsp;Logged in by &nbsp;<br></br> {localStorage.getItem("cName")}&nbsp;&nbsp;&nbsp;
          <br></br><center><button onClick={()=>{
            navigate("/")
            localStorage.removeItem("cName")
            localStorage.removeItem("cEmail")}}>LogOut</button></center>
        <br></br></p>
       <div className="lcover">
            <button className="survey-btn" onClick={()=>navigate("/viewPage")}>Survey/Feedback  <RiSurveyLine/></button>
            <button className="survey-btn" onClick={()=>navigate("/customerPoll")}>Polls  <FaPoll/></button>
        </div>              
    </div>
    )
}
export default CsurveyPage