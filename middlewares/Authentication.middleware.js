const jwt = require("jsonwebtoken");

require("dotenv").config();

const Authentication = (req, res, next)=>{
   // const token = req.headers.authorization;
    console.log(token)
    if(token){
        const decoded = jwt.verify(token, process.env.key);
      
        if(decoded){
            const UserID = decoded.UserID;
            console.log(decoded);
            req.body.UserID = UserID;
            next();
        }else{
            res.send("Please Login First");
        }
    }else{
        res.send("Please Login First");

    }
}


module.exports = {
    Authentication
}