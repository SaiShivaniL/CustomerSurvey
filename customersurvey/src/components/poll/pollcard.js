import React, { useState, useEffect } from "react";
import { createBrowserHistory as history } from "history";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Pollcard = (props) => {
  let { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [isVoted, setIsVoted] = useState(false);
  const [newVote, setNewVote] = useState(false);
  const navigate=useNavigate()
  const abc = (path) => {
   navigate(path);
  };

  // const handleClick = (id) => history.push(`/poll/${id}`);
  useEffect(() => {
    // Update the document title using the browser API
    // console.log(props)
    const user_id = localStorage.getItem("Name");

    console.log("here");
    console.log(user_id);
    const headers = {
      "Content-Type": "application/json",
      user_id: user_id,
    };
    fetch("http://localhost:5055/poll", { headers })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPoll(data[id]);
      });
  }, [id]);
  console.log({ poll });

  const deletePoll = (id) =>{

    const user_id = localStorage.getItem("Name");

    const postURL = `http://localhost:5055/poll/${poll._id}`; //Our previously set up route in the backend
    console.log("here");
    fetch(postURL, {
      method: "DELETE",
      headers: {
        user_id: user_id,
        "Content-Type": "application/json",
      },
    })

      .then((response) => {response.json()

      console.log(response)

      alert("deleted")

      navigate("/showallpolls")

      })

  }

  const handleVote = (key) => {
    const user_id = localStorage.getItem("Name");
    const postURL = `http://localhost:5055/vote/${poll._id}`; //Our previously set up route in the backend
    console.log("here");
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
        //  console.log(data)
        if (data.isVoted) {
          // alert("already voted")
          setIsVoted(true);
        } else {
          setNewVote(true);
          // alert("voted");
        }
      });

    // setGraph(true);
  };

  return (
    <div>
      <p className="loginname">&nbsp;Logged in by &nbsp;<br></br> {localStorage.getItem("Name")}&nbsp;&nbsp;&nbsp;
        <br></br><center><button onClick={()=>{
            navigate("/login")
            localStorage.removeItem("Name")}}>LogOut</button></center>
        <br></br>
        </p>
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
              <p
                style={{
                  padding: "10px",
                  backgroundColor: "white",
                  borderRadius: "20px",
                }}
              >
                <button
                  style={{
                    backgroundColor: "white",
                    borderRadius: "20px",
                    paddingLeft: "10vh",
                    paddingRight: "10vh",
                    border: "0",
                    cursor: "pointer",
                  }}
                  onClick={() => handleVote(data2)}
                >
                  {" "}
                  {poll.options[data2].option}
                </button>
              </p>
            ))}
          </div>
          <button
            style={{
              padding: "10px",
              backgroundColor: "#ACACAC",
              borderRadius: "10px",
              width: "40vw",
              border: "0",
              cursor: "pointer",
            }}
            onClick={() => abc(`/graph/${id}`)}
          >
            view votes
          </button>
          <button style={{padding: "10px",backgroundColor: "#fe5059", borderRadius: "10px",
  width: "40vw",
  border: "0",
  cursor: "pointer",
}}
onClick={() => deletePoll(id)}>delete poll</button>
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

export default Pollcard;
