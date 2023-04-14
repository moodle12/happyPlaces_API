const mongoose = require("mongoose")
const toursSchema = new mongoose.Schema(
    {
        place:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Place"
            
        },
        act:{
            type:mongoose.Schema.Types.ObjectId,
                ref:"Activity"
        },
        startDate:{
            type:Date
        },
        endDate:{
            type:Date
        },
        status:{ 
            type:mongoose.Schema.Types.ObjectId,
            ref:"Status"
        },
        vendor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Business"
        },
        noOfPerson:{
            type:Number
        }
    }// creating booking  Schema

)// creating schema for table tours

module.exports = mongoose.model("Tours",toursSchema)