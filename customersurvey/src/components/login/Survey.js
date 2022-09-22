import React, { useEffect } from "react";
import "./login.css";
import {FaPoll} from 'react-icons/fa'
import {RiSurveyLine} from 'react-icons/ri'
import {AiOutlineFileAdd} from 'react-icons/ai'
import {useNavigate,useLocation} from "react-router-dom";
import axios from "axios";
import './navigation'
import Navigation from "./navigation";
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
         axios.get("https://backendapicasestudy.herokuapp.com/users/"+localStorage.getItem("Name")).then((data)=>{
          if(data.data.length===0){
             navigate("/login")
          }
        })
     },[])
    return (
      <div className="lpage">
          <p className="loginname">&nbsp;Logged in by &nbsp;<br></br> {localStorage.getItem("Name")}&nbsp;&nbsp;&nbsp;
          <br></br><center><button onClick={()=>{
            navigate("/")
            localStorage.removeItem("Name")}}>LogOut</button></center>
        <br></br></p>
       <div className="lcover">
           <h1>Create<AiOutlineFileAdd/></h1>
            <button className="survey-btn" onClick={()=>navigate("/Page",{state: {code:"secret"} })}>Survey/Feedback  <RiSurveyLine/></button>
            <button className="survey-btn" onClick={()=>navigate("/pollhomepage",{state: {code:"secret"} })}>Polls   <FaPoll/></button>
        </div>              
    </div>
    )
}
export default SurveyPage