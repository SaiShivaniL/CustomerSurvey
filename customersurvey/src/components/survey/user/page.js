import React from 'react';
import axios from "axios"
import "./page.css"
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom";
import Navigation from '../../login/navigation';

export default class Page extends React.Component{
    constructor() {
        super();
        this.state={
            survey:[]
        }
    }
    componentDidMount(){
        
        if(!localStorage.getItem("Name")){
         this.props.navigate("/login")
        }
        let a=axios.get("https://backendapicasestudy.herokuapp.com/user/"+localStorage.getItem("Name"));
                        a.then((data)=>{
                            var b=data.data[0].survey.reverse();
                            this.setState({survey:b})
                        })
    }
    render(){
        var {state}=this.props.location
        var {code}=!state?{code:"notsecret"}:state
        if(code==="notsecret"){
            this.props.navigate("/login")
        }
        else if(!localStorage.getItem("Name")){
         this.props.navigate("/login")
        }
        axios.get("https://backendapicasestudy.herokuapp.com/users/"+localStorage.getItem("Name")).then((data)=>{
            if(data.data.length===0){
               this.props.navigate("/login")
            }
          })
        // var a = axios.get("https://backendapicasestudy.herokuapp.com/api").then((data)=>this.setState({survey:data}))
        return (
                <div>
                    
                    <Navigation/>
                    {/*<Link to="create"><button className="create" >+</button></Link>*/}
                    <button className="create" onClick={()=>this.props.navigate("/create",{ state: {code:"secret"} })}>+</button>
                    <button className="refresh" onClick={()=>{
                        if(localStorage.getItem("Name")){
                        let a=axios.get("https://backendapicasestudy.herokuapp.com/user/"+localStorage.getItem("Name"));
                        a.then((data)=>{
                            var b=data.data[0].survey.reverse();
                            this.setState({survey:b})
                        })}else{this.props.navigate("/login")}
                    }}>&#10227;</button>
                    <center>
                        {this.state.survey.map((e)=>{
                            return <div key={e.id} className='content'>
                                <h1>{e.title}</h1>
                                {/*<h3>Created on : {a}</h3>*/}
                                <button style={{marginLeft:"2rem",marginRight:"2rem"}} onClick={()=>{
                                    localStorage.setItem("viewId", e.id)
                                    this.props.navigate("/view",{ state: {code:"secret"} })
                                    }}>View</button>
                                <button onClick={()=>{
                                    localStorage.setItem("EditId", e.id)
                                    this.props.navigate("/editpage",{ state: {code:"secret"} })
                                }}>edit</button>
                                <button style={{marginLeft:"2rem",marginRight:"2rem"}} onClick={()=>{
                                    if(localStorage.getItem("Name"))
                                    {axios.delete("https://backendapicasestudy.herokuapp.com/user/"+localStorage.getItem("Name")+"/"+e.id)
                                    var f=this.state.survey.filter((x)=>x.id!==e.id);
                                    this.setState({survey:f})}else{this.props.navigate("/login")}
                            }}>Delete</button>
                             <button onClick={()=>{
                                    localStorage.setItem("GraphId", e.id)
                                    this.props.navigate("/GraphPage",{ state: {code:"secret"} })
                                }}>survey graph</button>
                            </div>
                        })}

                    </center>
                </div>
        )
    }
}