import React from 'react';
import "../survey/question/main.css"
import axios from "axios"
import UQuestion from '../survey/user/uquestion';

export default class Userview extends React.Component{
    constructor() {
        super();
        this.state={
            final:[],
            survey:{},
            name:"",
            id:"",
            title:"",
            message:"",
            showmsg:false
        }         
        this.getFinal=this.getFinal.bind(this);
    }

    getFinal(e){
        var filt= this.state.final.filter((x)=>x.qid!==e.qid)
        this.setState({final:[...filt,e]})
    }
    async componentDidMount(){
        var {state}=this.props.location;
        var {id,name,title}=state;
       // console.log(title)
        this.setState({id:id,name:name,title:title})
        var d=await axios.get("http://localhost:8000/user/"+name+"/id/"+id)
            this.setState({survey:d.data},()=>{
            var arry=[]
            var qsn=this.state.survey.question
            for(var i=0; i<qsn.length; i++){
                arry=[...arry,{qid:qsn[i].qid,qn:qsn[i].qn,type:qsn[i].type,required:qsn[i].required,ans:""}]
            }
            this.setState({final:arry})
        })
        }
    
    render(){
        return (
            <center>
                {this.state.final.length>0?
                <div>
                <div className="mainQsn">
                    <h1 style={{borderBottom:"2px solid blue"}} >{this.state.survey.title || "Title"}</h1>
                </div>
                {this.state.survey.question.map((e)=>{
                    return <UQuestion key={e.qid} qsn={e} getfinal={this.getFinal}/>
                })}
                {this.state.message?(<div className="mainQsn"><b style={{color:"red"}}>
                    <center>{this.state.message}</center></b></div>):""}
                <button style={{margin:"3%"}} onClick={()=>{
                    this.setState({message:""},async ()=>{
                        for(var i=0;i<this.state.final.length;i++){
                        if(this.state.final[i].required){
                            if(typeof this.state.final[i].ans==="string"){
                                if(this.state.final[i].ans===""){
                                    await this.setState({message:"Fill all the required fields"})

                                    break;
                                }   
                            }
                            if(typeof this.state.final[i].ans==="object"){
                                if(this.state.final[i].ans.length===0){
                                    await this.setState({message:"Fill all the required fields"})
                                    break;
                                }   
                            }
                        }
                 
                        }
                        if(this.state.message===""){
                           axios.post("http://localhost:8000/addres",{id:this.state.id,name:this.state.name,title:this.state.title,email:localStorage.getItem("cEmail"),ans:this.state.final}).then((d)=>console.log(d.data)).then(()=>{
                                axios.patch("http://localhost:8000/"+localStorage.getItem("cEmail")+"/addtocomp",{id:this.state.id}).then(()=>{
                                    this.props.navigate("/viewpage")
                                })
                                
                            })
                           // console.log(this.state.title,this.state.final,this.state.name)
                         }
                    }

                    )
                    
                
                }}>Submit</button>
                </div>:""}
            </center>
        )
    }
}