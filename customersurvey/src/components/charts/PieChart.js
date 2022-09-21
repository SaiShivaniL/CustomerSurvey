import Chart from "react-apexcharts";
import { React  } from "react";
import { useNavigate} from "react-router-dom";
  
function Piechart(props) {
    return (
        <>
            <div className="container-fluid mb-3">
                    <h2  style={{paddingLeft:"1%",width:"auto",borderRadius:"8px"}}>Graph for {props.title}</h2> 
                <Chart
                    type="pie"
                    width={800}
                    height={400} 
                    series={props.value}
                    options={{
                        noData: { text: "Empty Data" },
                        colors: [
                            "#FF4560",
                            "#4ECDC4",
                            "#F9C80E",
                            "#52D726",
                            "#007ED6",
                            "#FF0000",
                            "#FF7300",
                            "#FFEC00"
                        ],
                        labels: props.name
                    }}
                ></Chart>
                 </div>
        </>
    );
}
export default Piechart;