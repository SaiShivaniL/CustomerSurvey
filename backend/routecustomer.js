const express=require('express');
const mongodb = require('./surveydb.js');
const crouter=express.Router();
const axios=require('axios')

var customer=new mongodb("customers")

crouter.get("/customer",async function(req, res){
    customer.init();
    v = await customer.find(customer.db);
    res.send(v)
})

crouter.get("/customer/:email",async function(req,res){
    customer.init()
    v=await customer.findbyemail(req.params.email)
    res.send(v)
})

crouter.post("/addtodo",async function(req,res){
      customer.init()
      all=await axios.get("http://localhost:8000/user")
      survey=all.data.map((e)=>e.survey)
      res.send(survey)
})

crouter.post("/newcustomer",async function(req,res){
    cust=await customer.findbyemail(req.body.email)
    if(cust.length>0){
        customer.save(req.body)
        res.send("posted")
    }
})

module.exports=crouter