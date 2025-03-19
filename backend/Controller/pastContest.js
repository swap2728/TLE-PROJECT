// import axios from "axios";
// import axios from "axios";
const axios = require("axios")
exports.getContest = async(req,res)=>{
    try{
        const val = req.params.selectedPlatform
        // console.log(val)
        // let rep;
        if(val=="codeforces"){
            url ="https://codeforces.com/api/contest.list";
            const response = await axios.get(url);
            // rep=response.data.result
            res.json({"message":response.data.result})
            return 
        }
        else if(val=="codechef"){
            url = "https://www.codechef.com/api/list/contests/all";
            const response = await axios.get(url);
            res.json({"message":response.data})
            return 
            // res=response.data
        }
        
        // console.log(res);
        res.status(200).json({"message":[]});
        
    }
    catch(error){
        console.log(error)
        res.status(400).json({"message":error});
    }
}