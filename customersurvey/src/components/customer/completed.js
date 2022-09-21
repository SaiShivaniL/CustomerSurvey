import React,{useState} from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Userview from "./userview";
import CNavigation from "./cnavigation";

export default class CompletedPage extends React.Component{
    constructor(){
        super()
        this.state={
            list:[],
            view:[]
        }
    }
    componentDidMount(){
        if(localStorage.getItem("cName")&&localStorage.getItem("cEmail")){
        axios.get("http://localhost:8000/customer/"+localStorage.getItem("cEmail")).then((data)=>{
                    var x=data.data[0].complete.map((e)=>[e.user,e.title,e.id])
                    this.setState({list:x})})}else{this.props.navigate("/cfront")}
    }
    render(){
        {if(!localStorage.getItem("cName") || !localStorage.getItem("cEmail")){
              this.props.navigate("/cfront")
        }}
        return <div>
            <nav style={{position:"fixed",top:"0",width:"100%",backgroundColor:"blue",textAlign:"center",height:"3rem"}}>
            <p style={{fontSize:'15px',color:'white',textAlign:'right',position:'absolute',top:'0',left:'20px'}}>&nbsp;Logged in as &nbsp;{localStorage.getItem("cName")} !</p>
                <NavLink to="/viewpage"   style={({ isActive }) => ({color:'white',borderBottom:isActive?'2px solid white':'',textDecoration:'none',backgroundColor:'blue'})}>
                    To-Do
                </NavLink>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <NavLink to="/complete"  style={({ isActive }) => ({color:'white',borderBottom:isActive?'2px solid white':'',textDecoration:'none',backgroundColor:'blue'})}>
                    Completed
                </NavLink>
                <p><button style={{position:'absolute',top:'0',right:'20px'}} onClick={()=>{
            this.props.navigate("/")
            localStorage.removeItem("cName")
            localStorage.removeItem("cEmail")}}>LogOut</button></p>
            </nav>
            <CNavigation/>
            <button style={{position:'fixed',right:'2%',top:'3.5rem',fontWeight:'bolder',fontSize:'1.5rem'}} onClick={()=>{
                 if(localStorage.getItem("cName")&&localStorage.getItem("cEmail")){
                axios.get("http://localhost:8000/customer/"+localStorage.getItem("cEmail")).then((data)=>{
                    var x=data.data[0].complete.map((e)=>[e.user,e.title,e.id])
                    this.setState({list:x})
                })}else{this.props.navigate("/cfront")}
                // this.setState({list:[["d","titlt","id1"],["d","titlt","id2"],["d","titlt","id3"]]})
            }}>&#8635;</button>
            <div style={{marginTop:"4rem"}}></div>
            <center>
            <div >
                {this.state.list.map((e)=>{
                    return <div key={e[2]} style={{margin:"2rem",padding:"1rem",backgroundColor:"rgb(243,243,243)",width:"70%",height:"auto",borderRadius:"8px",cursor:"pointer"}} onClick={()=>{
                        
                    }}>
                        <h3>Created by :{e[0]}</h3>
                        <h1>Title : {e[1]}</h1>
                        {/*<h3>id : {e[2]}</h3>*/}
                    </div>
                })}
            </div>
            </center>
        </div>
    }
}