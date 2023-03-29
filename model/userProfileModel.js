const mongoose = require("mongoose")

const UserProfileSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    profileImg:{
        type:String
    },
    profileDescription:{
        type:String
    }
})

module.exports=mongoose.model("UserProfile",UserProfileSchema)