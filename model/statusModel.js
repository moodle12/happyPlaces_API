const mongoose = require("mongoose")
const statusSchema = new mongoose.Schema(
    {
        statusName :{
            type:String
        }
    }
)// creating Status Schema
module.exports = mongoose.model("Status",statusSchema)