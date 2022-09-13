import cors from "cors"
import mongoose from "mongoose"
import express from "express"
import bcrypt, { hash } from "bcrypt"
import { hashPassword,comparePassword } from "./hash.js"
import nodemailer from "nodemailer"
import bodyParser  from "body-parser"

//const bcrypt = require("bcrypt")
//var hash=require('./hash')
const app=express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb+srv://vamshimanyam:Vams%40123@survey.dbgqyrx.mongodb.net/EmployeeDB",{
    useNewUrlParser: true,
    useUnifiedTopology: true
},()=>{
    console.log("DB Connected")
})

const optionSchema = new mongoose.Schema({
    option: String,
    votes: {
      type: Number,
      default: 0,
    },
  });
  const pollSchema = new mongoose.Schema({
    question: { type: String, default: null },
    options: [optionSchema],
    users: [],
    // voted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  });

const userSchema= new mongoose.Schema({
    id:String,
    email:String,
    password:String
})
const customerSchema= new mongoose.Schema({
    name:String,
    email:String,
    todo:Array,
    completed:Array
})
const otp=new mongoose.Schema({
    email:String,
    otp:Number,
    expireIn:Number
})
const User=new mongoose.model("User",userSchema)
const Customer=new mongoose.model("Customer",customerSchema)
const Otp=new mongoose.model("Otp",otp)
const Poll =  mongoose.model("polls", pollSchema);

//Routes
/*const mailer=(email,otp)=>{

}*/




// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// var bodyParser = require("body-parser");
// var user2=new mongodb("EmployeeQuestion")


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// import {user as User} from "./model/user.js"
// const User = require("./model/user");
// const Poll = require("./model/poll");





app.get("/poll", async (req, res) => {
  const id = req.headers["user_id"];
  console.log(id);
  if (!id) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const user = await User.findOne({'id':id});
    const temp3 = await Poll.find();
    console.log(temp3);
    var poll = [];
    for (var i = 0; i < temp3.length; i++) {
      const temp = await Poll.findById(temp3[i]._id.toString()); //toString returns a string
      poll.push(temp);
    }
    return res.status(201).json({ ...poll, user: user._id });
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      message: err.message,
    };
  }
});

app.post("/poll", async (req, res, next) => {
  const id = req.headers["user_id"];
  console.log(id);
  if (!id) {
    return res.status(403).send("A token is required for authentication");
  }
  const { question, options } = req.body;
  try {
    const user = await User.findOne({'id':id});
    console.log(user);
    const poll = await Poll.create({
      question,
      user,
      options: options.map((option) => ({ option, votes: 0 })),
      users: [],
    });
    // user.polls.push(poll._id);
    // await user.save();
    return res.status(201).json({ ...poll._doc, user: user._id });
  } catch (err) {
    console.log(err);
    return next({
      status: 400,
      message: err.message,
    });
  }
});

app.post("/vote/:id", async (req, res, next) => {
  const id = req.headers["user_id"];
  console.log(id);
  if (!id) {
    return res.status(403).send("A token is required for authentication");
  }
  const { id: pollId } = req.params;
  console.log(id);
  const { answer } = req.body;
  try {
    if (answer) {
      const poll = await Poll.findById(pollId);
      if (!poll) throw new Error("No poll found");
      var isVoted = false;
      for (var i = 0; i < poll.users.length; i++) {
        if (poll.users[i] == id) {
          isVoted = true;
          break;
        }
      }
      if (isVoted) {
        var response = { poll: poll, isVoted: isVoted };
        return res.status(202).json(response);
      } else {
        const vote = poll.options.map((option) =>
          option.option === answer
            ? {
                option: option.option,
                _id: option._id,
                votes: option.votes + 1,
              }
            : option
        );
        var userlist = poll.users;
        userlist.push(id);
        poll.users = userlist;
        poll.options = vote;
        await poll.save();
        var response = { poll: poll, isVoted: isVoted };
        return res.status(202).json(response);
      }
    } else {
      throw new Error("No Answer Provided");
    }
  } catch (err) {
    console.log(err);
    return next({
      status: 400,
      message: err.message,
    });
  }
});










app.get('/api',(req,res)=>{
    User.find({},(err,user)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json(user)
        }
    })
})
app.post("/login",async (req,res)=>{
    const {id,password} = req.body
    
    console.log(req.body.password)
    User.findOne({id:id},async (err,user)=>{
        if(user){
            var a=await comparePassword(password,user.password)
            if(a){
                res.send({message:"Login Successfull",user:user})
            }
            else{
                res.send({message:"Incorrect Password"})
            }
        }else{
            res.send({message:"User not Found"})
        }
    })
})
app.post("/register",async (req,res)=>{
    var {id,email,password} = req.body
    password=await hashPassword(password,10)
    console.log(password)
    User.findOne({id: id},(err,user)=>{
        if(user){
          res.send({message:"User already registered"})
        }else{
            const user = new User({
                id,
                email,
                password
            })
            user.save( err=>{
                if(err){
                    res.send(err)
                } else{
                    res.send({ message : "Successfully Registered"})
                }
            })
        }
    })
    
})
app.post("/addcustomer",async (req,res)=>{
    var {name,email} = req.body
    var todo=[]
    var completed=[]
    Customer.findOne({email: email},(err,user)=>{
        if(user){
          res.send("Success")
        }else{
            const customer = new Customer({
                name,
                email,
                todo,
                completed
            })
            customer.save( err=>{
                if(err){
                    res.send(err)
                } else{
                    res.send({ message : "Success"})
                }
            })
        }
    })
    
})

app.post("/forgot",async (req,res)=>{
    var {email}=req.body
    User.findOne({email: email},async (err,user)=>{
        if(user){
        let otpcode=Math.floor((Math.random()*10000)+1);
        let otpData=new Otp({email:req.body.email,otp:otpcode,expireIn:new Date().getTime()+300*1000
        })

        let otpresponse=await otpData.save();
        //var nodemailer=require('nodemailer')
        var transporter=nodemailer.createTransport({
            service:'gmail',
            port:587,
            secure:false,
            auth:{
                user:'saishivani.wnp@gmail.com',
                pass:'ctghifedvjojtntg'
            }
        });
        var mailOptions={
            from:'saishivani.wnp@gmail.com',
            to:email,
            subject:'OTP',
            text:'OTP for updating password  in Survey Application is : '+otpcode+'OTP will expire in 5 mins'
        }
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error)
            }
            else{
                console.log('Email sent'+info.response)
            }
        })
        res.send({message:"Please Check your email id"})
        console.log(otpcode)
        }
        else{
            res.send({message:"Email is not present"})
        }
    })
})
app.post("/change",async (req,res)=>{
    let data=await Otp.findOne({email:req.body.email,otp:req.body.otp})
    console.log(data)
    console.log(req.body.otp)
    const response={}
    if(data!=null){
        let currentTime=new Date().getTime();
        console.log("expire : "+data.expireIn+" current : "+currentTime)
        let diff=data.expireIn-currentTime
        console.log(diff)
        if(diff<0){
            res.send({message:"OTP Expired"})
            Otp.deleteOne({email:req.body.email,otp:req.body.otp},function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Deleted User : ",docs);
                }
            })
        }
        else{
            let us=await User.findOne({email:req.body.email})
            console.log(req.body.password)
            us.password=await hashPassword(req.body.password,10)
            console.log(us.password)
            us.save()
            res.send({message:"Updated Successfully"})
            Otp.deleteOne({email:req.body.email,otp:req.body.otp},function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Deleted User : ",docs);
                }
            })
        }
    }else{
        res.send({message:"invalid otp"})
    }
})
app.listen(5055,()=>{
    console.log("server Started at port 5055")
})

