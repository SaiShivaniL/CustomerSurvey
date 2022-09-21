import Chart from "react-apexcharts";
import { useEffect, useState, React } from "react";
import Piechart from "./PieChart";
import './chart.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function All() {
    const navigate = useNavigate();
    const [qus, setQus] = useState([]);
    const [ans, setAns] = useState([]);
    const [list, setList] = useState([]);
    const [msg,setMsg]=useState();
    useEffect(() => {
        async function getdata() {
            var d = await axios.get(
                "http://localhost:8000/showans/"+localStorage.getItem("GraphId")
            );
            if(d.data.length===0){
            setMsg("No user has responded to this quiz")}
           else{ setAns(d.data[0]);
            setQus(d.data[1]);}
        }
        getdata();
    }, []);
    if(msg!=="No user has responded to this quiz"){
    var a = qus.map((e) => {
        var ans1 = ans[e].ans;
        var o = {};
        if (ans[e].type === "textarea") {
            return (
                <div style={{backgroundColor:"rgb(243,243,243)",width:"74%",height:"auto",margin:"1%",borderRadius:"16px",padding:"1%"}}>
                  {/*<center>*/}
                    <h2 style={{paddingLeft:"1%",width:"auto",borderRadius:"8px"}}>{ans[e].qn}</h2>
                    <center>
                    <div
                        style={{
                            backgroundColor: "rgb(230,230,230)",
                            height: "150px",
                            width: "70%",
                            overflowY: "scroll",
                        }}
                    >
                       
                        {ans[e].ans.map((e) => {
                            return <h2 style={{borderBottom:"1px solid black"}}>{e}</h2>;
                        })}
                        
                    </div>
                    </center>
                    {/*</center>*/}
                </div>
            );
        } else if (ans[e].type !== "textarea" && ans[e].type !== "checkbox") {
            for (var i = 0; i < ans1.length; i++) {
                if (ans1[i] in o) {
                    o[ans1[i]] = 1 + o[ans1[i]];
                } else {
                    o[ans1[i]] = 1;
                }
            }
            return (
                <div style={{backgroundColor:"rgb(243,243,243)",width:"75%",height:"auto",borderRadius:"16px",margin:"1%",justifyContent:"center",alignItems:"center"}}>
            
                <Piechart
                    key={i}
                    value={Object.values(o)}
                    name={Object.keys(o)}
                    title={ans[e].qn}
                />
                
                </div>
            );
        }
    });
    return (
        <div style={{alignItems:"center",justifyContent:"center",display:"flex",flexDirection:"column"}}>
            <div>
                 <div >
                 <center> <h2>Graphical Representation of Survey Results </h2> </center>
                 <div >
                <center> 
                <button  onClick={() => {
                        navigate("/BarGraph");
                      }} > View as Bar Graph 
                      </button> 
                      </center>
                    </div>
                </div>
                </div>
                {a.map((e, i) => {
                    if (e !== undefined) {
                        return e;
                    }
                })}
        </div>
    );
            }
            else{
                return(
                    <div>
                        <center>
                        <h1 style={{color:"red"}}>{msg}</h1>
                        </center>
                    </div>
                )
            }
}
export default All;
