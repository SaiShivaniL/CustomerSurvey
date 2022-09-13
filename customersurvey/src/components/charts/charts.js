import React ,{ useState, useEffect} from "react";
import  Chart  from "react-apexcharts";

function Piechart()
{
   const [EmployeeDepartment, setEmployeeDepartment]= useState([]);
   const [EmployeeLocation, setEmployeeLocation]= useState([]);
    const [Location,setLocation]=useState([]);
    const [Value,setValue]=useState([]);
   useEffect( ()=>{
       const sDepartment=[];
       const sLocation=[];
       const getuserdata= async()=>{
       const reqData= await fetch("http://localhost:5055/api");
       const resData= await reqData.json();     
       //const resData = reqData;  
       for(let i=0; i< resData.length; i++)
       {
        sDepartment.push(resData[i].Department);
        sLocation.push(resData[i].Location);
       }
       //setEmployeeLocation(sLocation);
       //setEmployeeDepartment(sDepartment);
       
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

    getuserdata();

   },[]);

    return(
        <React.Fragment>
            {console.log(Value,Location)}
            <div className="container-fluid mb-3">
            <p className="loginname">&nbsp;Logged in by &nbsp;<br></br> {localStorage.getItem("Name")}&nbsp;&nbsp;&nbsp;</p>
              <center> 
                <h2 className="mt-3"> Analyzing Number of Employees by location </h2></center>
               
                <Chart 
                type="pie"
                width={1349}
                height={550}

                series={Value}       
                options={{
                        title:{ text:"Employee Location Details",
                        align:"center"
                        } , 
                       noData:{text:"Empty Data"},                        
                       colors:["#f90000","#f0f",'#7CDDDD',
                       '#52D726',
                       '#FFEC00',
                       '#007ED6',
                       '#FF0000',
                       '#FF7300'],
                      labels:Location             

                 }}
                >
                </Chart>
            </div>
        </React.Fragment>
    );
}
export default Piechart;