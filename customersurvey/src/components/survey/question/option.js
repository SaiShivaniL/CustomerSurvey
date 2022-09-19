import React from 'react';
import './option.css'

export default class Option extends React.Component{
    constructor(){
        super()
        this.state={
            value:'',
            edit: true
        }
    }

    componentDidMount(){
        if(this.props.value!==undefined){
            this.setState({value:this.props.value})
        }
    }

    render(){
    return (
        <div style={{margin:"1%",textAlign:"left",display:"inline"}}>
            <input id="option" type={this.props.type} value={this.state.value} name={this.props.name} required/>{
                this.state.edit ? 
                (<input className="optiontext" type="text" value={this.state.value} onChange={(e)=>this.setState({value:e.target.value})} onBlur={()=>this.setState({edit:false})}/>):
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