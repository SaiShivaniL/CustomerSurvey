import React,{useState} from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

export default class ViewPage extends React.Component{

}




const viewPage = ()=>{
    const C=async ()=>{
      var a=await axios.get("http://localhost:8000/customer/"+localStorage.getItem("cEmail"))
      var x=a.data[0].todo.map((e)=>[e.user,e.title,e.id])
    return(
        <div style={{width:"70%",height:"auto",backgroundColor:"white",borderRadius:"16px"}}>
               {
                x.map((e)=>{
                   <div> <h1>created by {e[0]}</h1>
                    <h2>{e[1]}</h2>
                    <h2>{e[2]}</h2>
                </div>
                })
               }
        </div>
    )
    }
    return (
    <div>
        <nav style={{position:"fixed",width:"100%",backgroundColor:"blue",textAlign:"center",height:"3rem"}}>

<NavLink to="/viewpage"   style={({ isActive }) => ({color:'white',borderBottom:isActive?'2px solid white':'',textDecoration:'none',backgroundColor:'blue'})}>
    To-Do
</NavLink>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<NavLink to="/complete"  style={({ isActive }) => ({color:'white',borderBottom:isActive?'2px solid white':'',textDecoration:'none',backgroundColor:'blue'})}>
    Completed
</NavLink>
</nav>
<button style={{position:'fixed',right:'2%',top:'3.5rem',fontWeight:'bolder',fontSize:'1.5rem'}} onClick={()=>{
    setList(C())
    
}}>&#8635;</button>
{console.log(list)}
    </div>
    )
}
