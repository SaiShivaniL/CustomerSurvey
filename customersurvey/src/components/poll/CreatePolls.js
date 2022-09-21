import React, { Component, Fragment, useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { Link, withRouter, useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
function CreatePolls() {
  const navigate = useNavigate();
  const [options_element, setOptions_Element] = useState(null);
  const [state, setState] = useState({
    question: "",
    options: ["", ""],
  });

  const handleSubmit = (e) => {
    const postURL = "http://localhost:5055/poll";
    const id = localStorage.getItem("Name");
    fetch(postURL, {
      method: "POST",
      headers: {
        user_id: id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: state.question,
        options: state.options,
      }),
    })
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
    navigate("/pollhomepage",{ state: {code:"secret"} });
  };

  const handleChangeQuestion = (e) => {
    // setState({ ...state, [e.target.name]: e.target.value });
    const question2 =e.target.value;
    // question2.push("");
    setState({ question:question2, options:state.options });
    console.log(state)
    // updateOption();
  };

  const addAnswer = () => {
    // setState({ ...state, options: [...state.options, ""] });
    const options2 =state.options;
    options2.push("");
    setState({ question:state.question, options:options2 });
    console.log(state)
    // updateOption();
  };

  const handleAnswer = (e, index) => {
    // const options = [...state.options];
    // options[index] = e.target.value;
    // setState({ ...state, options });

    const options2 =state.options;
    options2[index] = e.target.value
    setState({ question:state.question, options:options2 });
    console.log(state)
    // updateOption();
  };

  const handleDelete = (e, index) => {
    const options2 =state.options;
    options2.splice(index, 1);
    setState({ question:state.question, options:options2 });
    console.log(state)
    // updateOption();
  };

  

  useEffect(() => {

    const temp = state.options.map((option, i) => (
      <Fragment key={i}>
        <label className="form-label">Option</label>

        <input
          className="form-input"
          required
          type="text"
          value={option}
          key={i}
          onChange={(e) => handleAnswer(e, i)}
          style={{
            backgroundColor: "#FFFFFF",
            border: "0",
            borderRadius: "20px",
            fontSize: "16px",
            padding: "15px",
            margin: "20px",
            
          }}
        />

        <MdDelete
          onClick={(e) => handleDelete(e, i)} //delete
          style={{ height: "25px", width: "25px" ,cursor:"pointer"}}
        />
        <br />
      </Fragment>
    ));
    setOptions_Element(temp);
  }, [state]);

  

  return (
    <div >
      <p className="loginname">&nbsp;Logged in by &nbsp;<br></br> {localStorage.getItem("Name")}&nbsp;&nbsp;&nbsp;
        <br></br><center><button onClick={()=>{
            navigate("/")
            localStorage.removeItem("Name")}}>LogOut</button></center>
        <br></br>
        </p>
    <center >
    <div >
      <h1 style={{backgroundColor:"rgb(32,177,255)"}}>Create Your Poll</h1>
      <div
        style={{
          backgroundColor: "#D9D9D9",
          width: "70vh",
          marginTop: "10vh",
          padding: "30px",
          borderRadius: "20px",
        }}
      >
        <form className="form" onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="question">
            Enter Your Question
          </label>
          <br />
          <input
            className="form-input"
            required
            type="text"
            name="question"
            value={state.question}
            onChange={handleChangeQuestion}
            style={{
              backgroundColor: "#ACACAC",
              border: "0",
              borderRadius: "10px",
              fontSize: "16px",
              padding: "15px",
              margin: "10px",
              width: "300px",
            }}
          />
          <div className="container" >{options_element}</div>
          <div className="buttons_center">
            <button
              className="button"
              type="button"
              onClick={addAnswer}
              style={{
                background: "white",
                border: "0",
                borderRadius: "10px",
                marginRight: "20px",
                padding: "10px",
                width:"20vw",
                fontSize: "16px",
                cursor:"pointer"
              }}
            >
              Add Options
            </button>
            <button
              className="button"
              type="submit"
              style={{
                background: "white",
                border: "0",
                borderRadius: "10px",
                marginRight: "20px",
                padding: "10px",
                width:"20vw",
                fontSize: "16px",
                cursor:"pointer"
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    </center>
    </div>
  );
}

export default CreatePolls;
