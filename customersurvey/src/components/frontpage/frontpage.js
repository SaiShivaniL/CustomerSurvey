import React from 'react'
import "./frontpage.css"
import {useNavigate} from "react-router-dom";


const FrontPage = () => {
   const navigate=useNavigate()
    return ( 
        <div className="fpage">
        <div className="fcover">
            <div className='fbox'>
                <img src="telstralogo.jpg" alt="logo" height="100px" width="200px"/>
            </div>
            <button className="flogin-btn" onClick={()=>navigate("/login")}>Employee</button>

            <button className="flogin-btn" onClick={()=>navigate("/cfront")}>Customer</button>
        </div>
        </div>
    )
}

export default FrontPage