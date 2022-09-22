import React from 'react';
import Question from "./question";
import "./main.css"
import axios from "axios"

export default class TryMain extends React.Component{
    constructor() {
        super();
        this.state={
            question:[],
            title:"",
            edit:true,
            final:[],
            submitqsn:{},
            msgshow:false,
            msg:[]
        }
        this.getQuestion=this.getQuestion.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    getQuestion(qid,qn,type,option,required){
        let a=this.state.final.filter((x)=>qid!==x.qid);
        this.setState({final:[...a,{qid:qid,qn:qn,type:type,option:option,required:required}]})
    }

    handleSubmit(){
        
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
        return (
            <center>
                <div>
                <div className="mainQsn">
                    {this.state.edit?<textarea rows={1} className="mainqsntext" placeholder="Type Title" value={this.state.title} onBlur={()=>this.setState({edit:false})} onChange={(e)=>this.setState({title:e.target.value})} required/>:<h1 style={{borderBottom:"2px solid blue"}} onClick={()=>this.setState({edit:true})}>{this.state.title || (<div style={{display: "inline",color:"rgb(175, 175, 175)"}}>Click here to type Title</div>)}</h1>}
                </div>
                {this.state.question.map((e)=><div key={e[0]}>{e[1]}<button onClick={()=>{
                var a=this.state.question.filter((x)=>x[0]!==e[0])
                var aarry=this.state.final.filter((x)=>e[0]!==x.qid)
                this.setState({question:a});
                this.setState({final:aarry});
            }}>delete</button></div>)}


            <button style={{marginTop:"2%"}} onClick={()=>{
                if(this.state.question.length===0){
                    this.setState({final:[{qid:1,qn:"",type:"",option:"",required:""}]})
                    this.setState({question:[[1,<Question getqsn={this.getQuestion} length={1} />]]})
                }else{
                    this.setState({final:[...this.state.final,{qid:this.state.question[this.state.question.length-1][0]+1,qn:"",type:"",option:"",required:""}]})
                    this.setState({question:[...this.state.question,[this.state.question[this.state.question.length-1][0]+1,<Question getqsn={this.getQuestion} length={this.state.question[this.state.question.length-1][0]+1} />]]})}}}
            >Add</button><br/>


            {this.state.msgshow?(<div className="mainQsn"><b style={{color:"red"}}><center>{this.state.msg}</center></b></div>):""}
            <button style={{margin:"3%"}} onClick={()=>{
                
                var a=[];
                if(this.state.final.length===0){
                    a=["Enter atleast one question"]
                }
                else{
                    for(var i=0;i<this.state.final.length;i++){
                        var e=this.state.final[i];
                        a=[];
                        if(!(/\S/).test(e.qn)){
                            a=["Question can't be blank"]
                            break;
                        }
                        if(e.type===""){
                            a=["Choose any one option type"]
                            break;
                        }
                        if(e.option.length===0 && (e.type==="checkbox" || e.type==="radio")){
                            a=["Type atleast one option"]
                            break;
                        }
                        if(e.option.length>0){
                            for(let j=0;j<e.option.length;j++) {
                                var x=e.option[j]
                                if(!(/\S/).test(x[1])){
                                    a=["Option can't be empty"]
                                    break
                                }
                            }
                        }
                       
}
                }
                this.setState({msg:a})
                if(a.length===0){
                    var date=new Date()
                    var id=this.state.title+date.getFullYear()+""+date.getMonth()+""+date.getDate()+""+date.getHours()+""+date.getMinutes()+""+date.getSeconds()
                    var sorted=this.state.final.sort((a,b)=>{
                        return a.qid-b.qid
                      });
                    this.setState({msgshow:false,submitqsn:{username:localStorage.getItem("Name"),survey:{user:localStorage.getItem("Name"),id:id,title:this.state.title,question:sorted}}},()=>{
                        if(localStorage.getItem("Name")){
                        axios.post("https://backendapicasestudy.herokuapp.com/user",this.state.submitqsn).then(async ()=>{
                        await axios.post("https://backendapicasestudy.herokuapp.com/addquestion",this.state.submitqsn)
                        this.props.navigate("/Page",{ state: {code:"secret"} })    
                        })
                    }else{this.props.navigate("/login")}
                    })
                }
                else{
                    this.setState({msgshow:true})
                }
            }}>Submit</button>
            
                </div>
            </center>
        )
    }
}