import React, { useState, useEffect } from "react";
import { createBrowserHistory as history } from "history";
 import { useNavigate } from 'react-router-dom';
import Navigation from "../login/navigation";

function ShowAllPolls(props) {
  const navigate=useNavigate()
  const abc = path => {
  navigate(path);
  };
  const [polls, setPolls] = useState({});
  // const handleClick = (id) => history.push(`/poll/${id}`);
  useEffect(() => {
    // Update the document title using the browser API
   const id = localStorage.getItem("Name")
    const headers = {
      "Content-Type": "application/json",
      "user_id":id
    };
    fetch("https://backendnodejscs1.herokuapp.com/poll", { headers })
      .then((response) => response.json())
      .then((data) => {
        setPolls(data);

      });
  }, []);
  const valuesArray = JSON.parse(JSON.stringify(polls));
  

  

  return (
    <div>
      
        <Navigation/>
      {/* {JSON.stringify(polls)} */}
      <center>
      {Object.keys(polls).map((data) =>
        data === "user" ? (
          <div></div>
        ) : (
          <div
            style={{
              padding: "5vh",
              width: "40vw",
              backgroundColor: "#D9D9D9",
              margin: "15px",
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
              onClick={() => abc(`/poll/${data}`)}
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

export default ShowAllPolls;
