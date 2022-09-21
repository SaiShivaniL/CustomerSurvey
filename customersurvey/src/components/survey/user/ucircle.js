import React from "react";


export default class UCircleRating extends React.Component {
  consturctor(){
    this.getvalue=this.getvalue.bind(this);
  }

  getvalue(e){
    this.props.getcircle(e.target.value)
  }

  render(){
    return <div >
    <label style={{display:"inline-block",textAlign:"center"}}><input type="radio" value={1} name={this.props.name} onClick={(e)=>this.getvalue(e)} style={{height:"20px", width:"20px",display:"block"}}/>1 (min)</label>
    <label style={{display:"inline-block",marginLeft:"5%",textAlign:"center"}}><input type="radio" value={2} onClick={(e)=>this.getvalue(e)} name={this.props.name} style={{height:"20px", width:"20px",display:"block"}}/>2</label>
    <label style={{display:"inline-block",marginLeft:"5%",textAlign:"center"}}><input type="radio" value={3} onClick={(e)=>this.getvalue(e)} name={this.props.name} style={{height:"20px", width:"20px",display:"block"}}/>3</label>
    <label style={{display:"inline-block",marginLeft:"5%",textAlign:"center"}}><input type="radio" value={4} onClick={(e)=>this.getvalue(e)} name={this.props.name} style={{height:"20px", width:"20px",display:"block"}}/>4</label>
    <label style={{display:"inline-block",marginLeft:"5%",textAlign:"center"}}><input type="radio" value={5} onClick={(e)=>this.getvalue(e)} name={this.props.name} style={{height:"20px", width:"20px",display:"block"}}/>5 (max)</label>
  </div>
  }
}
    
  
    

      

