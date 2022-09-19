import React, { useState, useEffect } from "react";
import { createBrowserHistory as history } from "history";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Chart from "react-apexcharts";
const ShowGraph = (props) => {
  let { id } = useParams();
  const [graph, setGraph] = useState(false);
  const [barGraphVisible, setBarGraphVisible] = useState(false);
  const [options, setOptions] = useState({
    labels: [],

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });
  const [series, setSeries] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const user_id = localStorage.getItem("Name");
    console.log(user_id);
    const headers = {
      "Content-Type": "application/json",
      user_id: user_id,
    };
    fetch("http://localhost:5055/poll", { headers })
      .then((response) => response.json())
      .then((data) => {
        console.log(id);
        // setPoll(data[id]);
        var opt = { labels: [] };
        var ser = [];
        var poll = data[id];
        Object.keys(poll.options).forEach(function (k) {
          opt.labels.push(poll.options[k].option);
          ser.push(poll.options[k].votes);
        });
        console.log(options);
        console.log(series);
        setOptions(opt);
        setSeries(ser);
        setGraph(true);
        // alert("voted")
      });
  }, [id]);

  const barGraphButton = () => {
    setBarGraphVisible(true);
  };
  //   console.log(poll);

  return (
    <div>
      <p className="loginname">&nbsp;Logged in by &nbsp;<br></br> {localStorage.getItem("Name")}&nbsp;&nbsp;&nbsp;
        <br></br><center><button onClick={()=>{
            navigate("/login")
            localStorage.removeItem("Name")}}>LogOut</button></center>
        <br></br>
        </p>
      {graph ? (
        <div
          className="donut"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              padding: "10vh",
              width: "50vw",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <Chart
                options={options}
                series={series}
                type="donut"
                width="380"
              />
              {/* <Chart options={options} series={series} type="bar" width="500" /> */}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button onClick={barGraphButton}>Show BarGraph</button>
        </div>

        {barGraphVisible ? (
          <div
            className="app"
            style={{
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="row">
              <div className="mixed-chart">
                <Chart
                  options={{
                    chart: {
                      id: "basic-bar",
                    },
                    xaxis: {
                      categories: options.labels,
                    },
                  }}
                  series={[
                    {
                      name: "series1",
                      data: series,
                    },
                  ]}
                  type="bar"
                  width="500"
                />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ShowGraph;