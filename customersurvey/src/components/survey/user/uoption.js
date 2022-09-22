import React from 'react';
import '../question/option.css'

export default class UOption extends React.Component{
    constructor(){
        super()
        this.state={
        }
        this.getvalue=this.getvalue.bind(this);
    }

    getvalue(e){
        if(this.props.type==="radio"){
            this.props.getradio(e.target.value)
        }
        if(this.props.type==="checkbox"){
            if(e.target.checked){
                this.props.getcheckbox(e.target.value)
            }
            else{
                this.props.deletecheckbox(e.target.value)
            }
        }
        
    }

    render(){
    return (
        <div style={{margin:"1%",textAlign:"left",display:"inline"}}>
            <input id={this.props.value} type={this.props.type} value={this.props.value} name={this.props.qid} onClick={(e)=>this.getvalue(e)} style={{accentColor:"blue",height:"18px",width:"18px"}}/>{
                <label htmlFor={this.props.value}  style={{overflowWrap: "break-word"}} >{
                    (this.props.value) } </label> 
            }
            <br/>
        </div>
    )
    }
}