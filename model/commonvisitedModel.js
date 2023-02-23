const mongoose = require("mongoose");

const commonvisitedSchema = new mongoose.Schema({
    placeName:{
        type:String
    },
    lat:{
        type:String
    },
    long:{
        type:String
    },
    title:{
        type:String
    },
    description:{
        type:String
    }
})


module.exports = mongoose.model("Commonvisited",commonvisitedSchema)

