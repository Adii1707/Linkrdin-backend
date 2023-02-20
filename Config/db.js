const mongoose = require("mongoose");

require("dotenv").config();
mongoose.set('strictQuery', true);
// console.log(process.env)
const connection = mongoose.connect(process.env.MONGOURL);

module.exports = {
    connection
}