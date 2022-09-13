const express=require('express');
const cors=require('cors');
const app= express();
const routes = require('./routecustomer')
app.use(express.json())
app.use(cors())
app.use('/', routes)


app.listen(8001, () => {
    console.log("Server runing on port 8001")
})