import React,{useState} from "react";
import "./login.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {BiLogIn} from "react-icons/bi"
import {HiOutlineIdentification} from "react-icons/hi"
import { FaUserAlt } from 'react-icons/fa';

const LoginPage = () => {
    const navigate=useNavigate()
    const [user ,setUser]=useState({
        id:"",
        password:""
        })
    const [message,setMessage]=useState("")
    const handleChange = e=>{
        setMessage("")
        const {name,value}=e.target;
        setUser({
            ...user,
            [name]:value
        })
        //console.log(name,value)
    }
    const regis=()=>{
        navigate("/register")
    }
    const login=()=>{
        const {id,password}=user
        if(id && password){
        axios.post("http://localhost:5055/login",user)
        .then(res=>{
            setMessage(res.data.message)
            //navigate("/homepage")
            console.log(res.data.message)
            if(res.data.message==="Login Successfull")
            {
                localStorage.setItem("Name",id)
                navigate("/SurveyPage",{ state: {code:"secret"} })
            }
        })
    }
        else{
            ///alert("Fill all the fields")
            setMessage("* Fill all the fields")
        }
    }
    return (
        
        <div className="lpage">
        <div className="lcover">
            {console.log("User",user)}
      
            <div className='lbox'>
                <img src="telstralogo.jpg" alt="logo" height="100px" width="250px"/>
            </div>
            <h1 style={{marginTop:"-9px"}}>Login</h1>
            <p style={{color:"red",backgroundColor:"white",marginTop:"-8px"}}>{message}</p>
            {/*<div style={{backgroundColor:"rgb(229, 226, 226)",height: "4em",width: "65%",paddingTop:"20px"}}>
                <HiOutlineIdentification size="40px"/><input type="text" name="id" value={user.id} placeholder="Employee Id" onChange={handleChange} style={{border:"none"}} />
    </div>*/}
            <input style={{fontFamily:"Font Awesome 5 Free"}} type="text" name="id" value={user.id} placeholder="&#xf007;&nbsp;&nbsp;&nbsp; Employee Id" onChange={handleChange}/>
            <input style={{fontFamily:"Font Awesome 5 Free"}} type="password" name="password" value={user.password} placeholder="&#xf023;&nbsp;&nbsp;&nbsp; Password" onChange={handleChange} />
            <button className="llogin-btn" onClick={login}>Login <BiLogIn/></button>

        
            <a href="" onClick={()=>navigate("/ForgotPage")}>Forget password?</a>   
            <button className="llogin-btn" onClick={regis}>SignUp <BiLogIn/></button> 
        </div>
        </div>
    )
}

export default LoginPage