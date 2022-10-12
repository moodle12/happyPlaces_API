const mongoose = require("mongoose")
const postSchema = new mongoose.Schema(
    {
        // postId:{
        //     type:Number,
        //     required:true
        // },
        place :{
            type:mongoose.Schema.Types.ObjectId,
             ref:"Place"
        },
        likes:{
            type:Number
        },
        isVerified:{
            type:Boolean
        }
    }
)// creating post Schema
module.exports = mongoose.model("Post",postSchema)