const mongoose = require("mongoose");

const UserTypeSchema = new mongoose.Schema({
    // userTypeID:{
    //     type:Number,
    //      required:true
    // },
    userTypeName:{
        type:String
    }
})


module.exports = mongoose.model("Usertype",UserTypeSchema)