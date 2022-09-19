import React,{useState, useEffect} from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";


function CustomerPolls(props) {
    const navigate=useNavigate()
    const abc = path => {
    navigate(path);
    };
    const [polls, setPolls] = useState({});
    // const handleClick = (id) => history.push(`/poll/${id}`);
    useEffect(() => {
      // Update the document title using the browser API
     const id = localStorage.getItem("cName")
     console.log(id)
      const headers = {
        "Content-Type": "application/json",
        "user_id":id
      };
      fetch("http://localhost:5055/poll", { headers })
        .then((response) => response.json())
        .then((data) => {
          setPolls(data);
          // console.log(polls
          //   )
        });
    }, []);
    const valuesArray = JSON.parse(JSON.stringify(polls));
    // console.log(Object.keys(polls[8].options));
  const containsUser = (e)=>{
    // console.log(e)
    for(var i = 0; i<e.length; i++){
        if(e[i] === localStorage.getItem("cName")){
            return true
        }
        
    }
    return false
  }
    
  
    return (
      <div>
        {/* {JSON.stringify(polls)} */}

        <nav style={{position:"fixed",top:"0",width:"100%",backgroundColor:"blue",textAlign:"center",height:"3rem"}}>
                <NavLink to="/customerPoll"   style={({ isActive }) => ({color:'white',borderBottom:isActive?'2px solid white':'',textDecoration:'none',backgroundColor:'blue'})}>
                    Polls to Complete
                </NavLink>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <NavLink to="/completedPoll"  style={({ isActive }) => ({color:'white',borderBottom:isActive?'2px solid white':'',textDecoration:'none',backgroundColor:'blue'})}>
                    Completed Poll
                </NavLink>
            </nav>
            <center>
        {Object.keys(polls).map((data) =>
          data === "user" || containsUser(polls[data].users) ? (
            <div></div>
          ) : (
            <div
              style={{
                padding: "5vh",
                width: "40vw",
                backgroundColor: "#D9D9D9",
                margin: "15vh",
                borderRadius: "20px",
              }}
            >
              <button
                style={{
                  padding: "10px",
                  backgroundColor: "#ACACAC",
                  borderRadius: "10px",
                  width: "40vw",
                  border: "0",
                  cursor: "pointer",
                }}
                onClick={() => abc(`/customerPoll/${data}`)}
              >
                {polls[data].question}
              </button>
              <div>
                {Object.keys(polls[data].options).map((data2) => (
                  <p
                    style={{
                      padding: "10px",
                      backgroundColor: "white",
                      borderRadius: "20px",
                    }}
                  >
                    {polls[data].options[data2].option}
                  </p>
                ))}
              </div>
            </div>
          )
        )}
        </center>
      </div>
    );
  }
  
  export default CustomerPolls;