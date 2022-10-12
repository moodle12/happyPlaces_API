const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    // userID:{
    //     type:Number,
    //      required:true
    // },
    userType:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Usertype"
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    mobileNo:{
        type:Number
    },
    address:{
        type:String
    },
    gender:{
        type:String
    },
    dob:{
        type:Date
    },
    password:{
        type:String,
        required:true,
        min: [6, 'Must be at least 6, got {VALUE}'],
        max: 12
    },
    falseAttempts:{
        type:Number
    },
    isApproved:{
        type:Boolean
    },
    otp:{
        type:Number
    }
})


module.exports = mongoose.model("User",UserSchema)


// Table No: 2
// Table Name: User

// Field		DataType	Constraints	Description

// UserID		integer		Primary Key	Generate Unique User ID
// UserTypeID	integer		Foreign Key	(Which table)	1 | 2 | 3
// First Name	varchar		not null		Enter First Name
// Last Name	varchar		not null		Enter Last Name
// Email		varchar		not null		Enter Email
// Mobile No.	integer		not null		Enter Mobile Number
// SubID*		integer		Foreign Key	Generated Subscription ID
// Address		varchar				Enter Address
// Gender		varchar				Male | Female
// DOB		date				DD/MM/YYYY
// Password		varchar		not null		Password
// FalseAttempts	integer		not null		Counting Number of Wrong Attempts
// AccountLock*	boolean		not null	False | True
// TimerCount	time		not null	HH:MM:SS, How long will an Account be locked?//if we have time
// is_Approved*	booelan