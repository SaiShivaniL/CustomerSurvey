import React,{useState} from "react";
import "./login.css"
import axios from "axios";
import { useNavigate } from "react-router";
const OTPPage = () => {
    const navigate=useNavigate()
    const [user ,setUser]=useState({
        otp: null,
        email:"",
        password:"",
        reEnterPassword:""
    })
    const [message,setMessage]=useState("")
    const handleChange = e=>{
        setMessage("")
        const {name,value}=e.target;
        setUser({
            ...user,
            [name]:value
        })
        console.log(name,value)
    }
    const Update=()=>{
        const {otp,email,password,reEnterPassword}=user
        
        if(otp && password && email){
            if(password===reEnterPassword){
        axios.post("http://localhost:5055/change",user)
        .then( res=>{
            setMessage(res.data.message)
            if(res.data.message==="OTP Expired"){
                alert("OTP Expired")
                navigate("/ForgotPage")
            }
            if(res.data.message==="Updated Successfully")
            {
                navigate("/login")
                alert("Password Updated Successfully")
            }
        } )
        }
        else{alert("Passwords didn't match")}
            }else{alert("Fill all the fields")}
    } 
    return (
        <div className="lpage">
        <div className="lcover">
            <div className='lbox'>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <img src="telstralogo.jpg" alt="logo" height="100px" width="250px"/>
             
            <h1>Update Password</h1>
            <p style={{color:"red"}}>{message}</p>
            <input type="text" name="otp" placeholder="Enter OTP Received" value={user.otp} onChange={handleChange} />
            <input type="text" name="email" placeholder="&#xf0e0;&nbsp;&nbsp;&nbsp;Enter email" value={user.email} onChange={handleChange}/>
            <input type="password" name="password" placeholder="&#xf023;&nbsp;&nbsp;&nbsp;New password" value={user.password}onChange={handleChange}/>
            <input type="password" name="reEnterPassword" placeholder="&#xf023;&nbsp;&nbsp;&nbsp;Re Enter Password" value={user.reEnterPassword}onChange={handleChange}/>
            <br></br><br/>
            <button className="llogin-btn" onClick={(Update)}>Submit </button>  
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>    
            </div>
        </div>
        </div>
    )
}

export default OTPPage