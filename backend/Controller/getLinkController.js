const axios = require("axios")

exports.getYtLink = async(req,res)=>{
    try{
        // const id = req.params.id;
        // for(let i=1;i<200;i++){
        //     const response = await axios.get(`https://www.youtube.com/watch?v=1M6DG6XjVaY&list=PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB&index=${i}`);
        //     console.log("swapnil")
        //     console.log(req.params.str)
        //     const isSubstring = JSON.stringify(response.data).includes(req.params.str);
        //     console.log(isSubstring)
        //     if(isSubstring){
        //         console.log(`https://www.youtube.com/watch?v=1M6DG6XjVaY&list=PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB&index=${i}`)
        //         res.status(200).json({"message":`https://www.youtube.com/watch?v=1M6DG6XjVaY&list=PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB&index=${i}`});
        //         return ;
        //     }
        // }
        res.status(200).json({"message":`https://www.youtube.com/watch?v=1M6DG6XjVaY&list=PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB`});
        // console.log(isSubstring);

    }
    catch(error){
        console.log(error)
        req.status(400).json({"message":error})
    }
}