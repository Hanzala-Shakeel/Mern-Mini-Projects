const mongoose = require("../db/index")

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    url:String
})

module.exports = mongoose.model("users",userSchema);