const mongoose = require("mongoose")
const activitySchema = new mongoose.Schema(
    {
        //  actId:{
        //      type:Number
        //     //  required:true
        //  },
        actType :{
            type:String
        }
    }
)// creating Activity Schema
module.exports = mongoose.model("Activity",activitySchema)