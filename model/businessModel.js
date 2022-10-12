const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
    // businessID:{
    //     type:Number,
    //     required:true
    // },
    businessType:{
        type:String
    },
    businessAddress:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    consumerContact:{
        type:Number
    },
    emailAddress:{
        type:String
    }

})


module.exports = mongoose.model("Business",businessSchema)

// Type: For Business Person
	
// 	Table No: 
// 	Table Name: Businesses

// Field		DataType	Constraints	Description

// BID		integer		Primary Key	Generate Unique Business ID
// BType		varchar		not null		Hotel | Camping | Trekking | Restaurant | Multiple
// B_Address	varchar		not null		Business Address or Place
// UserID		integer		Foreign Key	Generated User ID
// consumer_contact 
// Email_Address
