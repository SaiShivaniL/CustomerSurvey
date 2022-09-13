import React,{useState} from "react";
import axios from "axios";
import "./customer.css";
import { useNavigate } from "react-router-dom";
import {BiLogIn} from "react-icons/bi"


const CustomerPage = () => {
    const navigate=useNavigate()
    const [user ,setUser]=useState({
        name:"",
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
        //console.log(name,value)
    }

    const customer=()=>{
        const {name,email}=user
        const final={name:name,email:email,todo:[],complete:[]}
        var emx=/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
        if(name && email){
            if(emx.test(email)){
                axios.post("http://localhost:8000/newcustomer",final).then(()=>{
                    localStorage.setItem("cEmail",email)
                    navigate("/viewpage")
                })
            }
            else{
                setMessage("Enter valid email")
            }
        }
        else{

            setMessage("* Fill all the fields ")
        }
    }
    return (
        <div className="cpage">
        <div className="ccover">
            <div className='cbox'>
                <img src="telstralogo.jpg" alt="logo" height="100px" width="250px" />
            
            <p style={{color:"red",backgroundColor:"white",marginTop:"-8px"}}>{message}</p>
            </div>
            <h1>Cutomer Details</h1>
            <input  type="text" name="name" style={{marginTop:"-10px"}}value={user.name} placeholder="Enter your Name" onChange={handleChange}/>
            <input  type="email" name="email" value={user.email} className="cinput" placeholder=" Enter your email" onChange={handleChange} />
            <button className="clogin-btn" onClick={customer}>Go to Survey<BiLogIn/></button>
        </div>
        </div>
    )
}

export default CustomerPage