import React,{useState,useRef} from "react";
import "./login.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPage = () => {
    const navigate=useNavigate()
    const emailRef=useRef()
    const [user ,setUser]=useState({
        email:""
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
    
    const forgot=()=>{
        const {email}=user
        var emx=/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
        if(emx.test(email)){
            axios.post("http://localhost:5055/forgot",user).then(
                res=>{
                    setMessage(res.data.message)
                    console.log(res.data.message)
                    if(res.data.message==="Please Check your email id")
                    {
                        navigate("/OTPpage")
                        alert(res.data.message)
                    }
                } 
            )
           // alert("OTP is being processed")
            //navigate("/OTPPage")
        }
        else{
            setMessage("Enter valid email")
        }
    }
    return (
        <div className="lpage">
        <div className="lcover">
            <div className='lbox'>
                <br></br><br></br><br></br><br></br>
                <img src="telstralogo.jpg" alt="logo" height="100px" width="250px"/>
            <br></br><br></br>
            <h1>Forgot password</h1>
            <p style={{color:'red'}}>{message}</p>
            <br></br><br></br>
            <input type="email" name="email" value={user.email} ref={emailRef} placeholder="&#xf0e0;&nbsp;&nbsp;&nbsp;Enter email for otp" onChange={handleChange} />
            <br></br><br/>
            <button className="llogin-btn" onClick={forgot}>Send OTP</button>  
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>    
            </div>
        </div>
        </div>
    )
}

export default ForgotPage