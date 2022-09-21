
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart(props) {
  var options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: props.title,
      },
    },
  };

  var data = {
    labels: props.name,
    datasets: [
      {
        data: props.value,
        label: "Quiz data for " + props.name ,
        backgroundColor: [ "#FF4560",
        "#4ECDC4",
        "#F9C80E",
        "#52D726",
        "#FFEC00",
        "#007ED6",
        "#FF0000",
        "#FF7300"], 
      },
    ],
  };
  return (
    <>
    <center>
      <div style={{ backgroundColor:"rgb(243,243,243)",width:"75%",height:"auto",borderRadius:"16px",margin:"1%",justifyContent:"center",alignItems:"center" }}>
        <Bar options={options} data={data} />
      </div>
      </center>
    </>
  );
}

export default BarChart;