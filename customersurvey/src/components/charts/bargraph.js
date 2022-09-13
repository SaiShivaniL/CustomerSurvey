import React, {useState, useEffect } from "react";
import Chart from "react-apexcharts";


function Barchart() {
  const [Location, setLocation]= useState([]);
  const [Value, setValue]= useState([]);

  useEffect( ()=>{

    const sDepartment=[];
    const sLocation=[];

    const getEmployeerecord= async()=>{
      const dataReq= await fetch("http://localhost:5055/api");
      const dataRes= await dataReq.json();
      //console.log(dataRes);

      for(let i=0; i<dataRes.length; i++)
      {
        sDepartment.push(dataRes[i].Department);
        sLocation.push(dataRes[i].Location);

      }
      var location=sLocation;
        var data={Bangalore:0,Hyderabad:0,Pune:0}

        location.forEach(e => {
            if(e=="Bangalore"){
                data.Bangalore+=1
            }
            else if(e=="Hyderabad"){
                data.Hyderabad+=1
            }
            else if(e=="Pune"){
                data.Pune+=1
            }
        });
        var l=Object.keys(data)
        var v=Object.values(data)
        setValue(v)
        setLocation(l)
        //setEmployeeLocation([l,v])
        console.log(data,l,v)
        //console.log(sLocation); 
       }

     // setLocation(sLocation);
     // setValue(sDepartment);

      getEmployeerecord();


  },[]);
  
  return (
    <React.Fragment>
      <div className="container-fluid mb-5">
        <h3 className="text-center mt-3 mb-3">Bar Chart of Employee Location</h3>
      
        <Chart
          type="bar"
          width={1380}
          height={700}
          series={[
            {
              name: "Department",
              data: Value,
            },
          ]}
          options={{
            title: {
              text: "Employee Location",
              style: { fontSize: 30 },
            },

            colors: ["#f90000"],
            theme: { mode: "light" },

            xaxis: {
              tickPlacement: "on",
              categories: Location,
              title: {
                text: "Location",
                style: { color: "#f90000", fontSize: 30 },
              },
            },

            yaxis: {
                labels: {
                  formatter: (val) => {
                  return `${val}`;
                  },
                style: { fontSize: "15", colors: ["#f90000"] },
              },
                 title: {
                 text: "User In (K)",
                 style: { color: "#f90000", fontSize: 15 },
              },
            },

            legend: {
              show: true,
              position: "right",
            },

            dataLabels: {
              formatter: (val) => {
                return `${val}`;
              },
              style: {
                colors: ["#f4f4f4"],
                fontSize: 15,
              },
            },
          }}
        ></Chart>
      </div>
    </React.Fragment>
  );
}

export default Barchart;