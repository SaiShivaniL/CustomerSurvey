import React,{useState} from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const CompletePage =()=>{
    return (<div>
        <nav style={{position:"fixed",width:"100%",backgroundColor:"blue",textAlign:"center",height:"3rem"}}>
 
            <NavLink to="/viewpage"   style={({ isActive }) => ({color:'white',borderBottom:isActive?'2px solid white':'',textDecoration:'none',backgroundColor:'blue'})}>
                To-Do
            </NavLink>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <NavLink to="/complete"  style={({ isActive }) => ({color:'white',borderBottom:isActive?'2px solid white':'',textDecoration:'none',backgroundColor:'blue'})}>
                Completed
            </NavLink>
            </nav>
            <button style={{position:'fixed',right:'2%',top:'3.5rem',fontWeight:'bolder',fontSize:'1.5rem'}}>&#8635;</button>

    </div>
    )
}

export default CompletePage