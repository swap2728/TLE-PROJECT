// import axios from "axios";
// import axios from "axios";
const axios = require("axios")
exports.getContest = async(req,res)=>{
    try{
        console.log("swapnil")
        const response = await axios.get("https://codeforces.com/api/contest.list?");
        console.log(response.data.result);
        res.json({"message":response.data.result})
    }
    catch(error){
        console.log(error)
        res.status(400).json({"message":error});
    }
}