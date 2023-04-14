const mongoose = require("mongoose")
const bookingSchema = new mongoose.Schema(
    {
        // bookingId:{
        //     type:Number,
        //     required:true
        // },
        place:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Place"
            
        },
        act:{
            type:mongoose.Schema.Types.ObjectId,
                ref:"Activity"
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
             ref:"User"
        },
        vendor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Business"
        },
        status:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Status"
        },
        noOfPerson:{
            type:Number
        },
        dateOfBooking:{
            type:String
        }
    }// creating booking  Schema

)// creating schema for table 3->booking

module.exports = mongoose.model("Booking",bookingSchema)