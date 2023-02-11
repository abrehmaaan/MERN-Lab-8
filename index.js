const mongoose = require("mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const user = require("./controllers/userController")

mongoose.connect("mongodb://localhost:27017/shopping").then(()=>{
    console.log("Connection Established...");
}).catch((err)=>{
    console.log(err);
})

const app = new express()
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post("/signup", user.insertUser)
app.post("/login", user.verifyUser)

app.listen(8080, ()=>{
    console.log("Server Started...");
})