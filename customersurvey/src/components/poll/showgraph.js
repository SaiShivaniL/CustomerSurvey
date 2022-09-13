import React, { useState, useEffect } from "react";
import { createBrowserHistory as history } from "history";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Chart from 'react-apexcharts'
 const ShowGraph = (props) => {
  let { id } = useParams();
  // console.log(id)
//   const [poll, setPoll] = useState(null);
  const [graph, setGraph] = useState(false);
  // const options = ;
  // const series = [];
  const [options, setOptions] = useState({labels:[]});
  const [series, setSeries] = useState([]);
  const navigate=useNavigate()


  // const handleClick = (id) => history.push(`/poll/${id}`);
  useEffect(() => {
    // Update the document title using the browser API
    // console.log(props)
    const user_id = localStorage.getItem("Name")
   console.log(user_id)
    const headers = {
      "Content-Type": "application/json",
      "user_id":user_id
    };
    fetch("http://localhost:5055/poll", { headers })
      .then((response) => response.json())
      .then((data) => {
        console.log(id);
        // setPoll(data[id]);
        var opt = {labels:[]};
        var ser = [];
        var poll = data[id]
        Object.keys(poll.options).forEach (function(k){
          opt.labels.push(poll.options[k].option)
          ser.push(poll.options[k].votes)
        } )
        console.log(options)
        console.log(series)
        setOptions(opt)
        setSeries(ser)
        setGraph(true)
        // alert("voted")
      });
  }, [id]);
//   console.log(poll);



  return (
    

   <div>
    <center>
      {graph ? (
        <div className="donut">
    <Chart options={options} series={series} type="pie" width="380" />
  </div>
      ) : (
        <></>
      )}
      </center>
   </div>















    
  );
};

 export default ShowGraph;
