const mongoose = require("mongoose")
const customerbookingSchema = new mongoose.Schema(
    {
        tour:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Tour"     
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
             ref:"User"
        },
        noOfPerson:{
            type:Number
        },
        dateOfBooking:{
            type:String
        }
    }// creating booking  Schema

)// creating schema for table->customerbooking

module.exports = mongoose.model("CustomerBooking",customerbookingSchema)