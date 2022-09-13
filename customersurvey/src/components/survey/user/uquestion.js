import React from 'react';
import '../question/question.css';
import UCircleRating from './ucircle';
import UOption from './uoption';
import UStarRating from './ustar';
import Textarea from './utextarea';

export default class UQuestion extends React.Component{
    constructor(){
        super();
        this.state={
            answer:{},
            option:[]
        }
        this.getText=this.getText.bind(this);
        this.getRadio=this.getRadio.bind(this);
        this.getCheckbox=this.getCheckbox.bind(this);
        this.getStar=this.getStar.bind(this);
        this.getCircle=this.getCircle.bind(this);
        this.deleteCheckbox=this.deleteCheckbox.bind(this);
    }

    getText(text){
        this.setState({answer:{qid:this.props.qsn.qid,qn:this.props.qsn.qn,type:this.props.qsn.type,required:this.props.qsn.required,ans:text}},()=>this.props.getfinal(this.state.answer))
    }

    getRadio(radio){
         this.setState({answer:{qid:this.props.qsn.qid,qn:this.props.qsn.qn,type:this.props.qsn.type,required:this.props.qsn.required,ans:radio}},()=>this.props.getfinal(this.state.answer))
    }

    getCheckbox(checkbox){
        this.setState({option:[...this.state.option,checkbox]},()=>{
            this.setState({answer:{qid:this.props.qsn.qid,qn:this.props.qsn.qn,type:this.props.qsn.type,required:this.props.qsn.required,ans:this.state.option}},()=>this.props.getfinal(this.state.answer))
        })
    }

    deleteCheckbox(checkbox){
        var filterr= this.state.answer.ans.filter((x)=>x!==checkbox)
        this.setState({answer:{qid:this.props.qsn.qid,qn:this.props.qsn.qn,type:this.props.qsn.type,required:this.props.qsn.required,ans:filterr}},()=>this.props.getfinal(this.state.answer))
    }
    getStar(star){
        this.setState({answer:{qid:this.props.qsn.qid,qn:this.props.qsn.qn,type:this.props.qsn.type,required:this.props.qsn.required,ans:star}},()=>this.props.getfinal(this.state.answer))
    }
    getCircle(circle){
        this.setState({answer:{qid:this.props.qsn.qid,qn:this.props.qsn.qn,type:this.props.qsn.type,required:this.props.qsn.required,ans:circle}},()=>this.props.getfinal(this.state.answer))
    }

    render(){
        // eslint-disable-next-line no-lone-blocks
        {
            // this.props.getfinal({qid:this.props.qsn.qid,qn:this.props.qsn.qn,type:this.props.qsn.type,required:this.props.qsn.required,ans:""})
            var question = this.props.qsn.qn;
            var qid = this.props.qsn.qid;
            var type = this.props.qsn.type;
            var option = this.props.qsn.option;
            var required = this.props.qsn.required;
            var o;
            // eslint-disable-next-line default-case
            switch(type){
                case "star":o=<UStarRating  getstar={this.getStar}/>;
                            break;
                case "circle":o=<UCircleRating  getcircle={this.getCircle} name={qid}/>;
                              break;
                case "textarea":o=<Textarea  gettextarea={this.getText}/>
                                break;
                case "radio":o=option.map((e)=>{
                    return <UOption key={e[0]} getradio={this.getRadio} type={type} value={e[1]} qid={qid}/>
                })
                break;
                case "checkbox":o=option.map((e)=>{
                    return <UOption key={e[0]}  getcheckbox={this.getCheckbox} deletecheckbox={this.deleteCheckbox} type={type} value={e[1]} qid={qid}/>
                })
                break;
            }
        }
        return <center> 
            <div className="Qsn" >
                <div className='length' >{question}{required?(<p style={{display:"inline",color:"red"}}>*</p>):("")}</div>
                {o}
                
            </div>
        </center>
    }
}
