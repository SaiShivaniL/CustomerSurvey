const express=require('express');
const mongodb = require('./surveydb.js');
const router=express.Router();
const axios=require('axios')
const nodemailer=require('nodemailer')

var user=new mongodb("EmployeeQuestion")
var customer=new mongodb("customers")
var answers=new mongodb("answers")
var users=new mongodb("users")
var otp=new mongodb("Otp")



router.get("/users/:id",async function(req, res){
    users.init();
    v = await users.findbyid(req.params.id);
    res.send(v)
})




///////////////////////////////////////////////////////
router.get("/showans/:id",async function(req,res){
   answers.init()
   var t=await answers.findbyid(req.params.id)
   console.log(t)
   if(t.length>0){
   var ans=t[0].response.map((e)=>e.ans)
   var count= ans.length*ans[0].length
o={}
i=0
var arry = ans.flat()
for(i=0;i<arry.length;i++){
    e = arry[i]
    if(e.qid in o){
         abc=[e.ans,...o[e.qid].ans]
         o[e.qid] ={qn:e.qn,type:e.type,ans : abc}
    }
    else{
        o[e.qid] ={qn:e.qn,type:e.type,ans : [e.ans]}
    }
}
qidarry=[]
for(j=0;j<ans[0].length;j++){
    qidarry.push(ans[0][j].qid)
}
res.send([o,qidarry])
   }
   else{
    res.send([])
   }
   
})




////////////////////////////////////////////////
router.get("/showres",async function(req, res){
    answers.init()
    var r=await answers.find()
    res.send(r)
})

router.post("/addres",async function(req, res){
    answers.init()
    id=req.body.id
    nme=req.body.name
    title=req.body.title
    email=req.body.email
    ans=req.body.ans
    var b = await answers.find()
    if(b.length ===0){
        console.log("if empty")
        answers.save({id:id,name:nme,title:title,response:[{email:email,ans:ans}]})
    }
    else{
        for(var i=0; i<b.length; i++){
            console.log(b[i].id,id)
            if(b[i].id===id){
                console.log("update")
                responses=b[i].response
                new_responses=[...responses,{email:email,ans:ans}]
                answers.update({id:id},{response:new_responses})
                break
            }
            if(i==b.length-1){
                console.log("add")
                answers.save({id:id,name:nme,title:title,response:[{email:email,ans:ans}]})
            }
            }
        }
        // console.log(i)
    res.send("Post")
})
router.delete("/delans/id/:id",async function(req,res){
  answers.init()
  await answers.deletebyid(req.params.id)
  res.send("Deleted answers")
})







////////////////////////////////////////////////////
//////////////////////////////////////////////////
router.get("/customer",async function(req, res){
    customer.init();
    v = await customer.find(customer.db);
    res.send(v)
})
router.get("/getemails",async function(req,res){
    customer.init()
    v=await customer.find()
    e=v.map((e)=>e.email)
    res.send(e)
})
router.get("/getnames",async function(req,res){
    customer.init()
    v=await customer.find()
    e=v.map((e)=>e.name)
    res.send(e)
})
router.get("/customer/:email",async function(req,res){
    customer.init()
    v=await customer.findbyemail(req.params.email)
    res.send(v)
})
router.post("/custdatbase",async function(req,res){
        customer.init()
        await customer.save(req.body)
        all=await axios.get("http://localhost:8000/user")
        survey=all.data.map((e)=>e.survey).flat()
        email=req.body.email
        console.log(email)
        customer.update({email:email},{todo:survey})
        res.send({message:"posted"})
})
router.post("/newcustomer",async function(req,res){
    customer.init();
    cust=await customer.findbyemail(req.body.email)
    //console.log(cust)
    //res.send(cust[0].name)
    console.log(req.body.email)
   if(cust.length===0){
       axios.post("http://localhost:5055/otp",{email:req.body.email})
       res.send({message:"new user"})
        /*console.log("new cust")
        await customer.save(req.body)
        all=await axios.get("http://localhost:8000/user")
        survey=all.data.map((e)=>e.survey).flat()
        email=req.body.email
        console.log(email)
        customer.update({email:email},{todo:survey})
        res.send({message:"posted"})*/
    }
    else if(cust[0].name===req.body.name){
        res.send({message:"posted"})
    }
    else{
        res.send({message:"*user with this email already exists"})
    }
})

router.post('/addquestion',async function(req, res) {
    customer.init()
    survey=req.body.survey;
    var user= await customer.find(customer.db);
    user.map(async (e)=>{
        var utodo = [survey,...e.todo]
        await customer.update({email:e.email},{todo:utodo})

    })
    res.send("ok")
})

router.patch('/:email/addtocomp',async function(req, res){
    customer.init()
    v=await customer.findbyemail(req.params.email)
    todo=v[0].todo.filter((e)=>e.id!==req.body.id)
    c=v[0].todo.filter((e)=>e.id===req.body.id)
    comp=[c[0],...v[0].complete]
    customer.update({email:email},{todo:todo,complete:comp})
    res.send("updated")
})

router.delete('/deltc/eid/:eid',async function(req,res){
    customer.init()
    var user= await customer.find(customer.db);
    user.map(async (e)=>{
        var utodo = e.todo.filter((t)=>t.id!=req.params.eid)
        //console.log(e.complete)
        var ucomplete=e.complete.filter((t)=>t.id!=req.params.eid)
        //console.log(ucomplete)
       await customer.update({email:e.email},{todo:utodo,complete:ucomplete})
    })
    await axios.delete("http://localhost:8000/delans/id/"+req.params.eid)
    res.send("Deleted")
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
    console.log(body)
    username=body.username;
    survey=body.survey;
    
    v = await user.findbyuser(username);
    if(v.length==0){
        user.save({"username":username,"survey":[survey]})
    }
    else{
        
        o = [...v[0].survey,survey]
        user.update({"username":username},{"username":username, "survey":o})
    }

    let title=survey.title
    let email1=await axios.get("http://localhost:8000/getemails")
    let name1=await axios.get("http://localhost:8000/getnames")
    let email=email1.data
    let name=name1.data
     for(var i=0;i<email.length;i++){
            var transporter=nodemailer.createTransport({
            service:'gmail',
            port:587,
            secure:false,
            auth:{
                user:'saishivani.wnp@gmail.com',
                pass:'ctghifedvjojtntg'
            }
        })
        
        var mailOptions={
            from:'saishivani.wnp@gmail.com',
            to:email[i],
            subject:'Survey Update',
            text:'Hi '+name[i]+','+'\nNew Survey present in application !!!'+'\nTitle:'+title
        }
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error)
            }
            else{
                console.log('Email sent'+info.response)
            }
        })
    }
    res.send("Posted")

})

router.patch('/user/:name/id/:id',async function(req,res){
    user.init();
    username=req.params.name
    qid=req.params.id
    survey=req.body.survey
    v = await user.findbyuser(username)
    o = v[0].survey.filter((e)=>e.id!==qid)
    vo = [survey,...o]
    console.log(vo)
    user.update({"username":username},{"username":username, "survey":vo})
    res.send("Posted")
})

router.post("/newtheory/eid/:eid",async function(req,res){
    customer.init()
    survey=req.body.survey;
    var user= await customer.find(customer.db);
    user.map(async (e)=>{
        var utodo=e.todo.filter((t)=>t.id!=req.params.eid)

        var utodo = [survey,...utodo]
        //console.log(e.complete)
        var ucomplete=e.complete.filter((t)=>{t.id!=req.params.eid})
        //console.log(ucomplete)
        
       await customer.update({email:e.email},{todo:utodo,complete:ucomplete})
    })
    await axios.delete("http://localhost:8000/delans/id/"+req.params.eid)
  res.send("check")
})

router.delete('/user/:user/:id',async function(req, res){
    user.init();
    v = await user.findbyuser(req.params.user);
    o=v[0].survey.filter((e)=>e.id!==req.params.id)
    await axios.delete("http://localhost:8000/deltc/eid/"+req.params.id)
    user.update({"username":req.params.user},{"username":req.params.user, "survey":o})
    res.send("Deleted")
})

module.exports=router