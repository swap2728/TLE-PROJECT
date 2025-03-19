
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors =  require("cors");
const bodyParser = require("body-parser")
const constestRoute = require("./Router/PastContesRouter/pastcontest")
const YtlinkRoute = require("./Router/getLinkRouter")
const contestRoutes = require("./Router/contests")
app.use(express.json());
// app.use()
mongoose
  .connect("mongodb://127.0.0.1:27017/contestDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(bodyParser.json());
app.use("/api/pastContest",constestRoute);
app.use("/api/getYtLink",YtlinkRoute)
app.use("/api/addedContest",contestRoutes)
app.use("/",(req,res)=>{
    console.log("success");
})
app.listen(3000,()=>{
    console.log("server listening to port 3000")
})