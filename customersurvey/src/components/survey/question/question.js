import React from 'react';
import Option from './option';
import './question.css'
import CircleRating from './circlerating';
import StarRating from './starrating';

export default class Question extends React.Component{
    constructor(){
        super()
        this.state={
            optionarray:[],
            qsn:"",
            option:[],
            choose1:false,
            choose2:true,
            choosebtn:true,/* To Hide add */

            choosetext:false,
            showtext:true,

            rating:false,
            star:true,
            circle:true,
            starbtn:true,
            circlebtn:true,
            textvalue:"",
            type:'',
            edit:true,
            required:false,
        }
        this.ref=React.createRef();
        this.handleChange=this.handleChange.bind(this);
        this.getOption=this.getOption.bind(this);
    }


    

    handleChange(e){
        this.ref.current.style.height="auto";
        this.ref.current.style.height=`${e.target.scrollHeight}px`;
    }

    getOption(id,value){
        let a=this.state.optionarray.filter((x)=>x[0]!==id);
        this.setState({optionarray:[...a,[id,value]]})
    }


    render(){
        return <center> <div className="Qsn" >
            {
                this.state.edit ?
            (
                <textarea ref={this.ref} rows={1} className="qsntext" placeholder="Type your Question here..." value={this.state.qsn} onChange={(e)=>{this.setState({qsn:e.target.value});this.handleChange(e)}} onBlur={()=>this.setState({edit:false})} required/>):
                <div className='length' onClick={()=>this.setState({edit:true})}  >{this.state.qsn|| <div style={{color:"rgb(175, 175, 175)"}}>Click here to type Your question here...</div>}</div>
            }
            <label><input type="checkbox" name="req" onChange={()=>this.setState({required:!this.state.required})} style={{accentColor:"blue",height:"16px",width:"16px"}} ></input> Required</label>
             
            <center><button hidden={this.state.choose1} onClick={()=>this.setState({choose2:false,choose1:true,choosetext:true,rating:true})}>Choice</button>
            
            <button hidden={this.state.choosetext} onClick={()=>this.setState({type:"textarea",choose1:true,choosetext:true,showtext:false,rating:true})}>Text Box</button>
            
            <button hidden={this.state.rating} onClick={()=>this.setState({choose1:true,choosetext:true,rating:true,starbtn:false,circlebtn:false})}>Rating</button>
            
            <button hidden={this.state.choose2} onClick={()=>{
                var a={no:1,value:<Option id={1} getoption={this.getOption} type="radio" name={this.props.length}/>}
                this.setState({choose2:true,type:"radio",choosebtn:false,option:[...this.state.option,a]})
                }}>Single Choice</button>

            <button hidden={this.state.choose2} onClick={()=>{
                var a={no:1,value:<Option id={1} getoption={this.getOption} type="checkbox" name={this.props.length}/>}
                this.setState({choose2:true,type:"checkbox",choosebtn:false,option:[...this.state.option,a]})
                }}>Multi Choice</button>

            <button hidden={this.state.starbtn} onClick={()=>this.setState({starbtn:true,circlebtn:true,star:false,type:"star"})} style={{fontSize:"20px"}}>&#9733;</button>
            <button hidden={this.state.circlebtn} onClick={()=>this.setState({starbtn:true,circlebtn:true,circle:false,type:"circle"})} style={{fontSize:"16px",height:"2rem"}}>&#9711;</button>



            <textarea className='texttext' rows="4" placeholder="Type here..." value={this.state.textvalue} onChange={(e)=>this.setState({textvalue:e.target.value})} hidden={this.state.showtext}/>
            {this.state.star?(null):(<StarRating/>)}
            {this.state.circle?(null):(<CircleRating/>)}
            </center>

            {this.state.option.map((e)=><div  key={e["no"]}>{e["value"]}<button onClick={()=>{
                var opn=this.state.option.filter((x)=>e.no!==x.no)
                var opnarray=this.state.optionarray.filter((x)=>e.no!==x[0])
                this.setState({option:opn,optionarray:opnarray})
            }}>delete</button></div>)}


            <button hidden={this.state.choosebtn} style={{marginLeft:"7%"}} onClick={()=>{
                if(this.state.option.length===0){
                    this.setState({option:[{no:1,value:<Option id={1} getoption={this.getOption} type={this.state.type} name={this.props.length}/>}]})
                }else{
                var i=this.state.option[this.state.option.length-1]["no"]+1
                var a={no:i,value:<Option id={i} getoption={this.getOption} type={this.state.type} name={this.props.length}/>}
                this.setState({option:[...this.state.option,a]})}
            }}>Add</button>
        {this.props.getqsn(this.props.length,this.state.qsn,this.state.type,this.state.optionarray,this.state.required)}
        </div>
        </center>
    }
}