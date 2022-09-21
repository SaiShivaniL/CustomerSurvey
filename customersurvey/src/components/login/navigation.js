import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
/*export default class Navigation extends React.Component{*/
const Navigation=()=>{
    const navigate=useNavigate()
    return <div style={{display:"flex",justifyContent:"left",backgroundColor:"blue",color:"white",paddingLeft:"2%",height:"4.8rem",cursor:"pointer"}}>
        <p style={{"position":"absolute","top":0,"right":25,color:"white"}}>&nbsp;Logged in by {localStorage.getItem("Name")}&nbsp;&nbsp;&nbsp;
                  <center>   <button style={{cursor:"pointer"}}onClick={()=>{navigate("/")
            localStorage.removeItem("Name")}}>LogOut</button></center>
                    </p>
          <h3 onClick={()=>navigate("/SurveyPage",{state: {code:"secret"} })}>Home</h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <h3 onClick={()=>navigate("/Page",{state: {code:"secret"} })}>Survey</h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <h3 onClick={()=>navigate("/pollhomepage",{state:{code:"secret"}})}>Polls</h3>
          
        </div>

}
export default Navigation;