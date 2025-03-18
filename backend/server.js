
const express = require("express");
const app = express();
const cors =  require("cors");
const bodyParser = require("body-parser")
const constestRoute = require("./Router/PastContesRouter/pastcontest")
app.use(express.json());
// app.use()
app.use(cors());
app.use(bodyParser.json());
app.use("/api/pastContest",constestRoute);
app.use("/",(req,res)=>{
    console.log("success");
})
app.listen(3000,()=>{
    console.log("server listening to port 3000")
})