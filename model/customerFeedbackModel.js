const mongoose = require("mongoose");

const customerFeedbackSchema = new mongoose.Schema({
    // feedID:{
    //     type:Number,
    //     required:true
    // },
    user:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"
    },
    business:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Business"
    },
    comment:{
        type:String
    },
    businessStars:{
        type:Number
    },
    isVisible:{
        type:Boolean
    }

})


module.exports = mongoose.model("Customerfeedback",customerFeedbackSchema)



// Table No.:
// 	Table Name: Customer_Feedbacks

// Field		DataType	Constraints	Description

// FeedID		integer		Primary Key	Generate Unique Feedback ID
// UserID		integer		Foreign Key	Generated User ID
// VendorID 	integer		Foreign Key/User	Generated Business ID
// Comment	varchar		Not Null 		Review
// B_Stars		integer		Not Null	Staring	Business
// is_visible		boolean			
// ---------------------------------