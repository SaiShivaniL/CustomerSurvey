import React from 'react';

export default class Textarea extends React.Component{
    constructor(){
        super();
        this.state={
            value:""
        }
        this.ref=React.createRef();
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(e){
        this.ref.current.style.height="auto";
        this.ref.current.style.height=`${e.target.scrollHeight}px`;
    }

    render(){
        return (
            <div>
                <textarea className='qsntext' ref={this.ref} rows={3} value={this.state.value} placeholder={"Type here..."} onChange={(e)=>{this.setState({value:e.target.value},()=>this.props.gettextarea(this.state.value));this.handleChange(e);}}/>
            </div>
        )
    }
}