const mongoose = require("mongoose")
const activitySchema = new mongoose.Schema(
    {
        //  actId:{
        //      type:Number
        //     //  required:true
        //  },
        vendor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Business"
        },
        actType :{
            type:String
        }
    }
)// creating Activity Schema
module.exports = mongoose.model("Activity",activitySchema)