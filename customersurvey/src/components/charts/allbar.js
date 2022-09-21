import React,{ } from "react";
import { useEffect, useState } from "react";
import BarChart from "./barChart";
import axios from "axios";

function AllBar() {
    const [qus, setQus] = useState([]);
    const [ans, setAns] = useState([]);
    const [list, setList] = useState([]);
    useEffect(() => {
        async function getdata() {
            var d = await axios.get(
                "http://localhost:8000/showans/"+localStorage.getItem("GraphId")
            );
            setAns(d.data[0]);
            setQus(d.data[1]);
        }
        getdata();
    }, []);
    var a = qus.map((e) => {
        var ans1 = ans[e].ans;
        var o = {};
        if (ans[e].type !== "textarea") 
        
        { 
            if(ans[e].type === "checkbox"){
                ans1=ans1.flat()
            }
            for (var i = 0; i < ans1.length; i++) {
                if (ans1[i] in o) {
                    o[ans1[i]] = 1 + o[ans1[i]];
                } else {
                    o[ans1[i]] = 1;
                }
            }
            return [Object.keys(o), Object.values(o), ans[e].qn];
        }
    });
    return (
        <>
            {a.map((e, i) => {
                if (e !== undefined) {
                    return (
                        <BarChart
                            key={i}
                            value={e[1]}
                            name={e[0]}
                            title={e[2]}
                        />
                    );
                }
            })}
        </>
    );
}
export default AllBar;
