import React from 'react';
import './options.css'


export default class Option extends React.Component{
    constructor(){
        super()
        this.state={
            value:'',
            edit: true
        }
    }
    render(){
    return (
        <div style={{margin:"1%",textAlign:"left",display:"inline"}}>
            <input id="option" type={this.props.type} value={this.state.value} name={this.props.name} style={{accentColor:"blue",height:"18px",width:"18px"}}/>{
                this.state.edit ? 
                (<input className="optiontext" type="text" value={this.state.value} onChange={(e)=>this.setState({value:e.target.value})} onBlur={()=>this.setState({edit:false})} style={{width:"50%",border:"none",borderBottom:"2px solid blue",backgroundColor:"rgb(243,243,243)"}}/>):
                (<label htmlFor='option'  style={{overflowWrap: "break-word"}} onClick={()=>this.setState({edit:true})}>{
                    (this.state.value)  || (<div style={{color:"rgb(175, 175, 175)"}}>Click here to type option</div>)} </label> )
            }
            {
                this.props.getoption(this.props.id,this.state.value)
            }
            <br/>

        </div>
    )
    }
}