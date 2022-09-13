import React from "react";
import "./login.css";
import {useNavigate} from "react-router-dom";
import {AiOutlineFileAdd} from 'react-icons/ai'
import {VscGraphLine} from 'react-icons/vsc'
const HomePage = () => {
    const navigate=useNavigate()
    return (
        <div className="lpage">
        <p className="loginname">&nbsp;Logged in by &nbsp;<br></br> {localStorage.getItem("Name")}&nbsp;&nbsp;&nbsp;
        <br></br><center><button onClick={()=>{
            navigate("/login")
            localStorage.removeItem("Name")}}>LogOut</button></center>
        <br></br>
        </p>
        
       <div className="lcover">
           {console.log(localStorage.getItem("Name"))}
            <button className="survey-btn" onClick={()=>navigate("/SurveyPage")} >Create Survey <AiOutlineFileAdd/></button>
            <button className="survey-btn" onClick={()=>navigate('/GraphPage')}>Survey Reports  <VscGraphLine/></button>
        </div>                
       </div>
    )
}
export default HomePage