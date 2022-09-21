import { useState } from "react";


const CircleRating = () => {
    const [rating, setRating] = useState(0);
    return (
      <div >
        <label style={{display:"inline-block"}}><input type="radio" value={1} name="rating" style={{height:"20px", width:"20px",display:"block"}}/>1 (min)</label>
        <label style={{display:"inline-block",marginLeft:"5%"}}><input type="radio" value={2} name="rating" style={{height:"20px", width:"20px",display:"block"}}/>2</label>
        <label style={{display:"inline-block",marginLeft:"5%"}}><input type="radio" value={3} name="rating" style={{height:"20px", width:"20px",display:"block"}}/>3</label>
        <label style={{display:"inline-block",marginLeft:"5%"}}><input type="radio" value={4} name="rating" style={{height:"20px", width:"20px",display:"block"}}/>4</label>
        <label style={{display:"inline-block",marginLeft:"5%"}}><input type="radio" value={5} name="rating" style={{height:"20px", width:"20px",display:"block"}}/>5 (max)</label>
      </div>
    );
  };

export default CircleRating;