import React ,{useState} from "react";
import "./register.css"
import axios from "axios"
import {useNavigate} from "react-router-dom";
import {BiLogIn} from "react-icons/bi"

const RegisterPage = () => {
    const navigate=useNavigate()
    const [user ,setUser]=useState({
        id:"",
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
        
    }
    const register = ()=>{
        const {id,email,password,reEnterPassword}=user
        var d=/\d/
        var W=/[A-Z]/
        var w=/[a-z]/
        var idx=/[cd]\d/
        var emx=/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
        if(id && email && password){
            if(id.length==7 && idx.test(id)){
                if(emx.test(email)){   
                if(d.test(password) && W.test(password) && w.test(password) && password.length>=8){
                 
                if(password===reEnterPassword){
                //alert("posted!")
            axios.post("https://backendnodejscs1.herokuapp.com/register",user)
            .then(res=> {
                alert(res.data.message)
            })
            navigate("/login")
        }
        else{
            setMessage("Passwords did not match!!")
        }
    }else{
        setMessage("Password must contain 1 number 1 capital 1 small alphabet and minimum length is 8")
    }
    }
    else{
        setMessage("Enter valid Email")
    }
    }else{setMessage("ID length should be equal to 7 and should start with d or c ")}
}
else{
            setMessage("* All Fields are required!!")
        }
    }
    return (
        <div className="rpage">
        <div className="rcover">
           
            <div className='rbox'>
                <img src="telstralogo.jpg" alt="logo" height="100px" width="250px"/>
            </div>
          
            <h1 style={{marginTop:"-6px"}}>Registration</h1>
           <center> <p style={{color:"red",fontSize:"12.5px",marginTop:"-8px"}}>{message}</p> </center>
            <input style={{fontFamily:"Font Awesome 5 Free"}} type="text" name="id" value={user.id} placeholder="&#xf007;&nbsp;&nbsp;&nbsp; Employee Id" onChange={handleChange}/>
            <input style={{fontFamily:"Font Awesome 5 Free"}} type="text" name="email" value={user.email} placeholder="&#xf0e0;&nbsp;&nbsp;Employee Mail" onChange={handleChange}/>
            <input style={{fontFamily:"Font Awesome 5 Free"}} type="password" name="password" value={user.password} placeholder="&#xf023;&nbsp;&nbsp;&nbsp; Password" onChange={handleChange} />
            <input style={{fontFamily:"Font Awesome 5 Free"}} type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="&#xf023;&nbsp;&nbsp;&nbsp; ReEnter Password" onChange={handleChange} /><br></br>

            <button className="rlogin-btn" onClick={register} style={{marginTop:"-2px"}}>SignUp<BiLogIn/></button>  
            or
            <button className="rlogin-btn" onClick={()=>navigate("/login")} style={{marginTop:"-1px",marginBottom:"30px"}}>Login<BiLogIn/></button>       

        </div>
        </div>
    )
}

export default RegisterPage