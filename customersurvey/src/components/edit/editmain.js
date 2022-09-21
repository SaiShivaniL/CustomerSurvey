import React from 'react';
import Question from './equestion';
import "../survey/question/main.css"
import axios from "axios"

export default class EditMain extends React.Component{
    constructor() {
        super();
        this.state={
            question:[],
            title:"",
            edit:true,
            final:[],
            submitqsn:{},
            msgshow:false,
            msg:[],
            survey:{}
        }
        this.getQuestion=this.getQuestion.bind(this);
    }

    getQuestion(qid,qn,type,option,required){
        let a=this.state.final.filter((x)=>qid!==x.qid);
        this.setState({final:[...a,{qid:qid,qn:qn,type:type,option:option,required:required}]})
    }

    async componentDidMount(){ 
     if(localStorage.getItem("Name")){
    var d=await axios.get("http://localhost:8000/user/"+localStorage.getItem("Name")+"/id/"+localStorage.getItem("EditId"))
        this.setState({survey:d.data},()=>{
            var arryanswer = this.state.survey.question.map((x)=>{
                return [x.qid,<Question length={x.qid} getqsn={this.getQuestion} qn={x.qn} type={x.type} option={x.option} required={x.required}/>]
            })
            this.setState({question:arryanswer, final :  this.state.survey.question,title:this.state.survey.title})
        })
    }
    else{
        this.props.navigate("/login")
    }
    }

    render(){
        
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
                    var id=this.state.survey.id
                    var sorted=this.state.final.sort((a,b)=>{
                        return a.qid-b.qid
                      });
                    this.setState({msgshow:false,submitqsn:{username:localStorage.getItem("Name"),survey:{user:localStorage.getItem("Name"),id:id,title:this.state.title,question:sorted}}},()=>{
                        if(localStorage.getItem("Name")){
                        console.log(this.state.submitqsn)
                        axios.patch("http://localhost:8000/user/"+localStorage.getItem("Name")+"/id/"+localStorage.getItem("EditId"),this.state.submitqsn).then(()=>{
                        axios.post("http://localhost:8000/newtheory/eid/"+localStorage.getItem("EditId"),this.state.submitqsn)    
                        this.props.navigate("/Page",{ state: {code:"secret"} })})
                        }else{
                            this.props.navigate("/login")
                        }
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