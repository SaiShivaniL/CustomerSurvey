const express=require('express');
const mongodb = require('./surveydb.js');
const router=express.Router();
const axios=require('axios')

var user=new mongodb("EmployeeQuestion")
var customer=new mongodb("customers")

router.get("/customer",async function(req, res){
    customer.init();
    v = await customer.find(customer.db);
    res.send(v)
})
router.get("/customer/:email",async function(req,res){
    customer.init()
    v=await customer.findbyemail(req.params.email)
    res.send(v)
})
router.post("/newcustomer",async function(req,res){
    customer.init();
    cust=await customer.findbyemail(req.body.email)
    if(cust.length===0){
        console.log("new cust")
        await customer.save(req.body)
        all=await axios.get("http://localhost:8000/user")
        survey=all.data.map((e)=>e.survey).flat()
        email=req.body.email
        console.log(email)
        customer.update({email:email},{todo:survey})
        res.send("posted")
    }
    else{
        res.send("posted")
    }
})












////////////////////////////////////////////////
router.get("/user",async function(req, res){
    user.init();
    v = await user.find(user.db);
    res.send(v)
})

router.get("/user/:name",async function(req, res){
    user.init();
    v = await user.findbyuser(req.params.name);
    res.send(v)
})

router.get("/user/:name/id/:id",async function(req, res){
    user.init();
    v = await user.findbyuser(req.params.name);
    o=v[0].survey.filter((e)=>e.id===req.params.id)
    res.send(o[0])
})

router.get("/user/:name/title/:title",async function(req, res){
    user.init();
    v = await user.findbyuser(req.params.name);
    o=v[0].survey.filter((e)=>e.title===req.params.title)
    res.send(o[0])
})

router.post("/user",async function(req, res){
    user.init();
    body=req.body;
    username=body.username;
    survey=body.survey;
    v = await user.findbyuser(username);
    if(v.length==0){
        user.save({"username":username,"survey":[survey]})
    }
    else{
        console.log(survey)
        o = [...v[0].survey,survey]
        user.update({"username":username},{"username":username, "survey":o})
    }
    res.send("Posted")
})

router.patch('/user/:id',function(req,res){
    user.init();
    user.update({"id":parseInt(req.params.id)},req.body);
    res.send("Updated")
})

router.delete('/user/:user/:id',async function(req, res){
    user.init();
    v = await user.findbyuser(req.params.user);
    o=v[0].survey.filter((e)=>e.id!==req.params.id)
    user.update({"username":req.params.user},{"username":req.params.user, "survey":o})
    res.send("Deleted")
})

module.exports=router