const express = require("express");
const {PostModel} = require("../Models/post.model");
const PostRouter = express.Router();
require("dotenv").config();


PostRouter.use(express.json());

PostRouter.get("/", async (req, res)=>{

    const {email, password} = req.body;

       try {
        const posts = await PostModel.find();
       res.send(posts);
       } catch (error) {
        res.send(error);
       }
})


PostRouter.post("/add", async (req, res)=>{
    const {title, body, device, no_if_comments} = req.body;

    try {
      
               const posts = new PostModel({title, body, device, no_if_comments});
               await posts.save();
               res.send("Posts Added");
            
        }
     catch (error) {
        res.send("Error while Uploading a post");
        console.log(error.errmsg);
    }
});

PostRouter.patch("/update/:id", async (req, res)=>{
    const payload = req.body;
    const  id = req.params.id;
    const post = await PostModel.findOne({"_id":id});
    const userID_in_post = post.UserID;
    const userID_making_req = req.body.UserID;

    try {
        if(userID_making_req!== userID_in_post){
            res.send({"msg":"You are Not Authorized"})
        }else{
            await PostModel.findByIdAndUpdate({"_id":id}, payload);
            res.send("Updated the Post")
        }
    } catch (error) {
        console.log(Error.errmsg);
        res.send("Somthing went wrong")
    }
})



PostRouter.delete("/delete/:id", async (req, res)=>{
    const payload = req.body;
    const  id = req.params.id;
    const post = await PostModel.findOne({"_id":id});
    const userID_in_post = post.UserID;
    const userID_making_req = req.body.UserID;

    try {
        if(userID_making_req!== userID_in_post){
            res.send({"msg":"You are Not Authorized"})
        }else{
            await PostModel.findByIdAndDelete({"_id":id}, payload);
            res.send("deleted the Post")
        }
    } catch (error) {
        console.log(Error.errmsg);
        res.send("Somthing went wrong")
    }
})





module.exports = {
    PostRouter
}