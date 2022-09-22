import React, { useState, useEffect } from "react";
import { createBrowserHistory as history } from "history";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PollCardCustomer = (props) => {
  let { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [isVoted, setIsVoted] = useState(false);
  const [newVote, setNewVote] = useState(false);
  const navigate = useNavigate();
  const abc = (path) => {
    navigate(path);
  };

  // const handleClick = (id) => history.push(`/poll/${id}`);
  useEffect(() => {
    // Update the document title using the browser API
    
    const user_id = localStorage.getItem("cName");

   
    const headers = {
      "Content-Type": "application/json",
      user_id: user_id,
    };
    fetch("https://backendnodejscs1.herokuapp.com/poll", { headers })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPoll(data[id]);
      });
  }, [id]);


  const handleVote = (key) => {
    const user_id = localStorage.getItem("cName");
    const postURL = `https://backendnodejscs1.herokuapp.com/vote/${poll._id}`; //Our previously set up route in the backend
  
    fetch(postURL, {
      method: "POST",
      headers: {
        user_id: user_id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // We should keep the fields consistent for managing this data later
        // question: this.state.question,
        // options: this.state.options,
        answer: poll.options[key].option,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // setPolls(data);
        if (data.isVoted) {
          // alert("already voted")
          setIsVoted(true);
        } else {
          setNewVote(true);
          window.location.reload(false)

          // alert("voted");
        }
      });

    // setGraph(true);
  };

  const checkOptionVoted=(data2)=>{
    for(var i=0;i<poll.options[data2].votedBy.length;i++){
      if(poll.options[data2].votedBy[i]==localStorage.getItem("cName")){
          return true;
      }
    }
    return false;
  }

  return (
    <div>
      <center>
        {poll ? (
          <div
            style={{
              padding: "5vh",
              width: "40vw",
              backgroundColor: "#D9D9D9",
              margin: "15px",
              borderRadius: "20px",
            }}
          >
            <p
              style={{
                padding: "10px",
                backgroundColor: "#ACACAC",
                borderRadius: "10px",
                width: "40vw",
                border: "0",
              }}
              //   onClick={() => abc(`/poll/${data}`)}
            >
              {poll.question}
            </p>
            <div>
              {Object.keys(poll.options).map((data2) => (
                checkOptionVoted(data2)
                ? <p>
                  <button
                    style={{
                      backgroundColor: "#b5e550",
                      borderRadius: "20px",
                      paddingLeft: "10vh",
                      paddingRight: "10vh",
                      border: "0",
                      cursor: "pointer",
                      height: "6vh",
                      width: "20vw",
                    }}
                    onClick={() => handleVote(data2)}
                  >
                    {" "}
                    {poll.options[data2].option}
                  </button>
                </p>
              
                :
                <p>
                  <button
                    style={{
                      backgroundColor: "white",
                      borderRadius: "20px",
                      paddingLeft: "10vh",
                      paddingRight: "10vh",
                      border: "0",
                      cursor: "pointer",
                      height: "6vh",
                      width: "20vw",
                    }}
                    onClick={() => handleVote(data2)}
                  >
                    {" "}
                    {poll.options[data2].option}
                  </button>
                </p>
              ))}
            </div>

            {isVoted ? (
              <p style={{ color: "red" }}>you have already voted</p>
            ) : (
              <></>
            )}
            {newVote && !isVoted ? (
              <p style={{ color: "green" }}>your vote has been submitted</p>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </center>
    </div>
  );
};

export default PollCardCustomer;