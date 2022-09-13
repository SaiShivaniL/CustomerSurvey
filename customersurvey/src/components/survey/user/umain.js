import React from 'react';
import "../question/main.css"
import axios from "axios"
import UQuestion from './uquestion';

export default class Umain extends React.Component{
    constructor() {
        super();
        this.state={
            final:[],msg:[],
            survey:
                {
                  "_id": "63138d57b50f7a11082b41a7",
                  "id": "First Quiz202283225231",
                  "title": "First Quiz",
                  "question": [
                    {
                      "qid": 1,
                      "qn": "What comes after 10?",
                      "type": "radio",
                      "option": [
                        [1,"8"],[2,"7"],[3,"11"],[4,"9"]
                     ],
                      "required": true
                    },
                    {
                      "qid": 2,
                      "qn": "Which of the follow things used in cricket?",
                      "type": "checkbox",
                      "option": [
                        [1,"Bat"],
                        [2,"Ball"],
                        [3,"Pen"],
                        [4,"Bottle"]
                      ],
                      "required": false
                    },
                    {
                      "qid": 3,
                      "qn": "Briefly explain about cricket?",
                      "type": "textarea",
                      "option": [],
                      "required": true
                    },
                    {
                      "qid": 4,
                      "qn": "Provide your rating using this",
                      "type": "star",
                      "option": [],
                      "required": true
                    },
                    {
                      "qid": 5,
                      "qn": "Rating out of 5?",
                      "type": "circle",
                      "option": [],
                      "required": true
                    },
                    {
                        "qid": 6,
                        "qn": "Select all options?",
                        "type": "circle",
                        "option": [[
                            1,
                            "Bat"
                          ],
                          [
                            2,
                            "Ball"
                          ],
                          [
                            3,
                            "Pen"
                          ],
                          ],
                        "required": false
                      }
                  ]
                }
        }
        this.getFinal=this.getFinal.bind(this);
    }

    getFinal(e){
        var filt= this.state.final.filter((x)=>x.qid!==e.qid)
        this.setState({final:[...filt,e]})
    }
    componentDidMount(){
      var arry=[]
      var qsn=this.state.survey.question
      for(var i=0; i<qsn.length; i++){
        arry=[...arry,{qid:qsn[i].qid,qn:qsn[i].qn,type:qsn[i].type,required:qsn[i].required,ans:""}]
      }
      this.setState({final:arry})
    }
    render(){
      var msgfinal=this.state.msg.map((e,i)=>{
        return <li key={i}>{e}</li>
      })
        return (
            <center>
                <div>
                <div className="mainQsn">
                    <h1 style={{borderBottom:"2px solid blue"}} >{this.state.survey.title || "Title"}</h1>
                </div>
            {this.state.survey.question.map((e)=>{
                return <UQuestion key={e.qid} qsn={e} getfinal={this.getFinal}/>
            })}
            {this.state.msg.length>0?<div className='mainQsn' style={{color:"red"}}><h3>Answer for below question Required</h3>{msgfinal}</div>:("")}

            <button style={{margin:"3%"}} onClick={()=>{
              var c=this.state.final.sort((a,b)=>{
                return a.qid-b.qid
              });
              var msg=c.map((e)=>{
                if(e.required){
                  if(e.ans===""){
                    return e.qn
                  }
                }
              })
              this.setState({msg:msg.filter((e)=>e!==undefined)},()=>{
                if(this.state.msg.length===0){
                  var sorted=this.state.final.sort((a,b)=>{
                    return a.qid-b.qid
                  })
                  console.log({id:this.state.survey["id"],title:this.state.survey["title"],final:sorted})
                }
              })
            }
            }
            >Submit</button>
                </div>
            </center>
        )
    }
}