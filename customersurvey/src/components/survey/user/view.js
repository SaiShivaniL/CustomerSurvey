import React from 'react';
import "../question/main.css"
import axios from "axios"
import UQuestion from './uquestion';

export default class View extends React.Component{
    constructor() {
        super();
        this.state={
            final:[],
            survey:{}
        }         
        this.getFinal=this.getFinal.bind(this);
    }

    getFinal(e){
        var filt= this.state.final.filter((x)=>x.qid!==e.qid)
        this.setState({final:[...filt,e]})
    }
    async componentDidMount(){
        var d=await axios.get("http://localhost:8000/user/"+localStorage.getItem("Name")+"/id/"+localStorage.getItem("viewId"))
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

                <button style={{margin:"3%"}} disabled>Submit</button>
                </div>:""}
            </center>
        )
    }
}