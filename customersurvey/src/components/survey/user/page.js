import React from 'react';
import axios from "axios"
import "./page.css"
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom";

export default class Page extends React.Component{
    constructor() {
        super();
        this.state={
            survey:[]
        }
    }


    render(){
        // var a = axios.get("http://localhost:8000/api").then((data)=>this.setState({survey:data}))
        return (
                <div>
                    <h1 className="title" >Feedback</h1>
                    <p style={{"position":"absolute","top":0,"right":25,color:"white"}}>&nbsp;Logged in by {localStorage.getItem("Name")}&nbsp;&nbsp;&nbsp;
                     <center><button onClick={()=>{this.props.navigate("/login")
            localStorage.removeItem("Name")}}>LogOut</button></center>
                    </p>
                    {/*<Link to="create"><button className="create" >+</button></Link>*/}
                    <button className="create" onClick={()=>this.props.navigate("/create")}>+</button>
                    <button className="refresh" onClick={()=>{
                        let a=axios.get("http://localhost:8000/user/"+localStorage.getItem("Name"));
                        a.then((data)=>{
                            var b=data.data[0].survey.reverse();
                            this.setState({survey:b})
                        })
                    }}>&#10227;</button>
                    <center>
                        {this.state.survey.map((e)=>{
                            return <div key={e.id} className='content'>
                                <h1>{e.title}</h1>
                                <h3>id : {e.id}</h3>
                                <button style={{marginLeft:"2rem",marginRight:"2rem"}} onClick={()=>{
                                    localStorage.setItem("viewId", e.id)
                                    this.props.navigate("/view")
                                    }}>View</button>
                                <button style={{marginLeft:"2rem",marginRight:"2rem"}} onClick={()=>{
                                    axios.delete("http://localhost:8000/user/"+localStorage.getItem("Name")+"/"+e.id)
                                    var f=this.state.survey.filter((x)=>x.id!==e.id);
                                    this.setState({survey:f})
                            }}>Delete</button>
                            </div>
                        })}

                    </center>
                </div>
        )
    }
}