import React,{useState} from "react";
import "../login/login.css"
import axios from "axios";
import { useNavigate } from "react-router";
const OTPPageC = () => {
    const navigate=useNavigate()
    const [user ,setUser]=useState({
        otp: null
    })
    const [message,setMessage]=useState("")
    const handleChange = e=>{
        setMessage("")
        const {name,value}=e.target;
        setUser({
            ...user,
            [name]:value
        })
    }
    const Update=()=>{
        const {otp}=user
        const final={email:localStorage.getItem("cEmail"),otp:otp}
        const final1={name:localStorage.getItem("cName"),email:localStorage.getItem("cEmail"),todo:[],complete:[]}
        if(otp){
           axios.post("https://backendnodejscs1.herokuapp.com/checkotp",final).then((res)=>{
            if(res.data.message==="success"){
               axios.post("https://backendapicasestudy.herokuapp.com/custdatbase",final1)
               navigate("/coptions")
            }else if(res.data.message==="invalid otp"){
                setMessage("Otp is invalid")
            }
            else if(res.data.message==="OTP Expired"){
                alert("OTP is expired")
                navigate("/cfront")
            }
           })
        }
    } 
    return (
        <div className="lpage">
        <div className="lcover">
            <div className='lbox'>
                <br></br><br></br>
                <img src="telstralogo.jpg" alt="logo" height="100px" width="250px"/>
                <br></br><br></br><br></br>
            <h1>OTP Details</h1>
            <p style={{color:"red"}}>{message}</p>
            <p style={{color:"red"}}>Check your mail : {localStorage.getItem("cEmail")} for otp</p>
            <br/>
            <input type="text" name="otp" placeholder="Enter OTP Received" value={user.otp} onChange={handleChange} />
            <button className="llogin-btn" onClick={(Update)}>Submit </button>  
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>    
            </div>
        </div>
        </div>
    )
}

export default OTPPageC