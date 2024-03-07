const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"creator"
    }
})


module.exports= mongoose.model("user",UserSchema)