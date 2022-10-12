const mongoose = require("mongoose");

const UserPostSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
         ref:"Post"
    },
    postCount:{
        type:Number
    }
})


module.exports = mongoose.model("Userpost",UserPostSchema)


// Table No.:
// 	Table Name: User_Posts

// Field		DataType	Constraints	Description

// UserID		integer		Foreign Key	Generated User ID
// PostID		integer		Foreign Key	Generated Post ID
// PostCount	boolean		Not Null		Initial Value = 0	
