import React from 'react';
import Option from '../survey/question/option';
import './question1.css'
import CircleRating from '../survey/question/circlerating';
import StarRating from '../survey/question/starrating';

export default class Question extends React.Component{
    constructor(){
        super()
        this.state={
            optionarray:[],
            qsn: "",
            option:[],

            choose1:true,
            choose2:true,
            text:true,
            star:true,
            circle:true,

            textvalue:"",
            type:'',
            edit:true,
            required:"",
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

    componentDidMount(){
        if(this.props.qn!==undefined){
        this.setState({required:this.props.required,qsn:this.props.qn,edit:false,type:this.props.type},()=>{
            if(this.props.type==="textarea"){
                this.setState({text:false})
            }
            else if(this.props.type==="star"){
                this.setState({star:false})
            }
            else if(this.props.type==="circle"){
                this.setState({circle:false})
            }
            else if(this.props.type==="radio"){
                var options=this.props.option.map((e)=>{
                    return {"no":e[0],"value":<Option id={e[0]} getoption={this.getOption} type="radio" name={this.props.qid} value={e[1]}/>}
                })
                this.setState({optionarray:this.props.option,option:options,choose1:false})
            }
            else if(this.props.type==="checkbox"){
                var options=this.props.option.map((e)=>{
                    return {"no":e[0],"value":<Option id={e[0]} getoption={this.getOption} type="checkbox" name={this.props.qid} value={e[1]}/>}
                })
                this.setState({optionarray:this.props.option,option:options,choose2:false})
            }
        })}
    }


    render(){
        
        return <center>
             <div className="Qsn" >
            {
                this.state.edit ?
            (
                <textarea ref={this.ref} rows={1} className="qsntext" placeholder="Type your Question here..." value={this.state.qsn} onChange={(e)=>{this.setState({qsn:e.target.value});this.handleChange(e)}} onBlur={()=>this.setState({edit:false})} required/>):
                <div className='length' onClick={()=>this.setState({edit:true})}  >{this.state.qsn|| <div style={{color:"rgb(175, 175, 175)"}}>Click here to type Your question here...</div>}</div>
            }
            <label><input type="checkbox" name="req" onChange={()=>this.setState({required:!this.state.required})} style={{accentColor:"blue"}} checked={this.state.required}></input> Required</label>
             
            <center>
            <button className="button" onClick={()=>{
                var a={no:1,value:<Option id={1} getoption={this.getOption} type="radio" name={this.props.length}/>}
                this.setState({choose1:false,choose2:true,text:true,circle:true,star:true,type:"radio",option:[a]})
            }}>Single Choice</button>

            <button className="button" onClick={()=>{
                var a={no:1,value:<Option id={1} getoption={this.getOption} type="checkbox" name={this.props.length}/>}
                this.setState({choose1:true,choose2:false,text:true,circle:true,star:true,type:"checkbox",option:[a]})
            }}>Multi Choice</button>

            <button className="button" onClick={()=>this.setState({type:"textarea",choose1:true,choice2:true,text:false,circle:true,star:true})}>Text Box</button>
            
            <button className="button" onClick={()=>this.setState({choose1:true,choose2:true,text:true,circle:true,star:false,type:"star"})} style={{fontSize:"20px"}} >&#9733;</button>
            <button className="button" onClick={()=>this.setState({choose1:true,choose2:true,text:true,circle:false,star:true,type:"circle"})} >&#9711;</button>



            <textarea className='texttext' rows="4" placeholder="Type here..." value={this.state.textvalue} onChange={(e)=>this.setState({textvalue:e.target.value})} hidden={this.state.text}/>
            {this.state.star?(null):(<StarRating/>)}
            {this.state.circle?(null):(<CircleRating name={this.props.qid}/>)}
            </center>

            {this.state.option.map((e)=><div  key={e["no"]}>{e["value"]}<button onClick={()=>{
                var opn=this.state.option.filter((x)=>e.no!==x.no)
                var opnarray=this.state.optionarray.filter((x)=>e.no!==x[0])
                this.setState({option:opn,optionarray:opnarray})
            }}>delete</button></div>)}


            <button hidden={this.state.choose1&&this.state.choose2} style={{marginLeft:"7%"}} onClick={()=>{
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