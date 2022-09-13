import React from "react";
import "./login.css";
import {FaPoll} from 'react-icons/fa'
import {RiSurveyLine} from 'react-icons/ri'
import {useNavigate} from "react-router-dom";
const SurveyPage = () => {
    const navigate=useNavigate()
    return (
      <div className="lpage">
          <p className="loginname">&nbsp;Logged in by &nbsp;<br></br> {localStorage.getItem("Name")}&nbsp;&nbsp;&nbsp;
          <br></br><center><button onClick={()=>{
            navigate("/login")
            localStorage.removeItem("Name")}}>LogOut</button></center>
        <br></br></p>
       <div className="lcover">
            <button className="survey-btn" onClick={()=>navigate("/Page")}>Survey/Feedback  <RiSurveyLine/></button>
            <button className="survey-btn" onClick={()=>navigate("/createPoll")}>Polls   <FaPoll/></button>
        </div>              
    </div>
       
    )
}
export default SurveyPage