const express = require("express");
const {UserModel} = require("../Models/user.model");
const bcrypt = require("bcrypt");
const UserRouter = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
UserRouter.use(express.json());

UserRouter.post("/register", async (req, res)=>{
    const {name, email, gender, password, age, city} = req.body;

    try {
        bcrypt.hash(password, 6, async (err, secure_password)=>{
            if(err){
                 console.log(err)
            }else{
               const user = new UserModel({email,password:secure_password,name,gender,city,age});
               await user.save();
               res.send("User Registered");
            }
        })
    } catch (error) {
        res.send("Error in Registering");
        console.log(error);
    }
});


UserRouter.post("/login", async (req, res)=>{

    const {email, password} = req.body;

       try {
        user = await UserModel.find({email});
        const hashed_password = user[0].password;
        if(user.length>0){
            bcrypt.compare(password, hashed_password, (err, result)=>{
                if(result){
                     const token = jwt.sign({userID:user[0]._id}, process.env.key);
                    res.send({"msg":"Login Success","token":token})
                    }else{
                        console.log("Wrong credentiel")
                    }
            })
        }else{
            console.log("wrong credentiel")
        }
       } catch (error) {
        res.send(error);
       }
})

module.exports = {
    UserRouter
}