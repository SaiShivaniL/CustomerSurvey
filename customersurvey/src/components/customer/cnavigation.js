import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
/*export default class Navigation extends React.Component{*/
const CNavigation=()=>{
    const navigate=useNavigate()
    return <div style={{position:"fixed",top:"3.5rem",color:"white",paddingTop:"1%",paddingLeft:"2%",paddingRight:"2%",paddingBottom:"1%",backgroundColor:"rgb(46, 64, 83)",borderTopRightRadius:"8px",borderBottomRightRadius:"8px",cursor:"pointer"}}>
        {/*<p style={{"position":"absolute","top":0,"right":25,color:"white"}}>&nbsp;Logged in by {localStorage.getItem("cName")}&nbsp;&nbsp;&nbsp;
                  <center>   <button onClick={()=>{navigate("/cfront")
            localStorage.removeItem("cName")
            localStorage.removeItem("cEmail")}}>LogOut</button></center>
</p>*/}
          <h3 onClick={()=>navigate("/viewPage")}>Survey</h3>
          <h3 onClick={()=>navigate("/customerPoll")}>Polls</h3>
          
        </div>

}
export default CNavigation;