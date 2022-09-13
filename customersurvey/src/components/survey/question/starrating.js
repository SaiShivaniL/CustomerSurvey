import React, { useState } from "react";
import "./star.css"
const StarRating = () => {
    const [rating, setRating] = useState(0);
    return (
      <div >
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button style={{margin:"1%",width:"auto"}} key={index} className={index <= (rating) ? "on" : "off"} onClick={() => setRating(index)}>
              <span style={{fontSize:"2rem"}}>&#9733;</span> 
            </button>
          );
        })}
      </div>
    );
  };

export default StarRating;