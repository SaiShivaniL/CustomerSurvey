import React from "react";
import "./login.css";
import {useNavigate,useLocation} from "react-router-dom";
import {AiOutlineFileAdd} from 'react-icons/ai'
import {VscGraphLine} from 'react-icons/vsc'
import axios from "axios";
import { useEffect} from "react";

const HomePage = () => {
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
        <br></br>
        </p>
        
       <div className="lcover">
           {console.log(localStorage.getItem("Name"))}
            <button className="survey-btn" onClick={()=>navigate("/SurveyPage",{ state: {code:"secret"} })} >Create Survey <AiOutlineFileAdd/></button>
            <button className="survey-btn" onClick={()=>navigate('/GraphPage',{ state: {code:"secret"} })}>Survey Reports  <VscGraphLine/></button>
        </div>                
       </div>
    )
}
export default HomePage