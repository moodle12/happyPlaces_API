const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
         ref:"User"
    },
    // placeID:{
    //     type:Number,
    //     required:true
    // },

    placeName:{
        type:String
    },
    lat:{
        type:String
    },
    long:{
        type:String
    },
    isApproved:{
        type:Boolean
    },
    activity:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Activity"
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    totalSeats:{
        type:Number
    },
    totalPrice:{
        type:Number
    },
    totalDay:{
        type:Number
    },
    totalNight:{
        type:Number
    },
    specialInstruction:{
        type:String
    },
    isActive:{
        type:Boolean
    }
})


module.exports = mongoose.model("Place",placeSchema)







// 	Table No: 
// 	Table Name: Places

// Field		DataType	Constraints	Description
// user_id
// PlaceID		integer		Primary Key	Generate Unique Place ID
// PlaceName	varchar		not null		Enter Place Name
// lat		varchar		not null		Mapping Place Location
// long
// is_approved 
// activity_id			f,k(activity_table)
// title		varchar		
// description 				day wise itenary
// total_seats	number			
// price		number			
// totalDayNight_8/9  number	
// Special Instruction varchar
// is_Active		boolean