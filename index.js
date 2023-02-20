require("dotenv").config();
const express = require("express");
const {connection} = require("./Config/db");
const { Authentication } = require("./middlewares/Authentication.middleware");
const { PostRouter } = require("./Routes/post.router");
const { UserRouter } = require("./Routes/user.route");
const app = express();

app.use(express.json());

// console.log(process.env.MONGOURL)

app.get("/", (req, res)=>{
    res.send("<h1>Home Page</h1>")
});

app.use("/users", UserRouter);

//app.use(Authentication());

app.use("/posts", PostRouter)

app.listen(process.env.PORT, async ()=>{

    try {
        await connection;
        console.log("Connected To DB")
    } catch (error) {
        console.log(error);
        console.log("There is some error connecting to db")
    }

    console.log(`server is running in port ${process.env.PORT}`);
});