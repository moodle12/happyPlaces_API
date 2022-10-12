const placesModel = require("../model/placesModel")

module.exports.addPlace = function (req, res) {
    let  user = req.body.user
    // let  placeID = parseInt(Math.random()*1000000)
    let  activity= req.body.activity
    let placeName = req.body.placeName
    let lat = req.body.lat
    let long = req.body.long
    let isApproved = req.body.isApproved
    let title = req.body.title
    let description = req.body.description
    let totalSeats = req.body.totalSeats
    let totalPrice = req.body.totalPrice
    let totalDay = req.body.totalDay
    let totalNight = req.body.totalNight
    let specialInstruction = req.body.specialInstruction
    let isActive = req.body.isActive

    let places = new placesModel(
        { 
            "user": user, 
            // "placeID":placeID,
            "activity":activity,
            "placeName": placeName,
            "lat":lat,
            "long":long,
             "isApproved":isApproved,
             "title":title,
             "description":description,
             "totalSeats":totalSeats,
             "totalPrice":totalPrice,
             "totalDay":totalDay,
             "totalNight":totalNight,
             "specialInstruction":specialInstruction,
             "isActive":isActive
        }
    )

    places.save(function (err, data) {
        if (err) {
            console.log(err);
            res.json({
                msg: "Place not added",
                status: -1,
                data: "Something went wrong!!"
            })
        } else {
            res.json({
                msg: "Place added",
                status: 200,
                data: data
            })
        }
    })
}//addPlace

//getAllPlaces
module.exports.getAllPlaces = function(req,res){
    placesModel.find().populate("user").populate("activity").exec(function(err,data){
        console.log(err);
        if(err){
            res.json({
                msg: "Something went wrong!!!",
                status: -1,
                data: err
            })
        }else{
            res.json({
                msg: "Places ret...",
                status: 200,
                data: data
            })
        }
    })
}//getAllPlaces


//deletePlaces
module.exports.deletePlace = function(req,res){

    let placeID = req.body.placeID
    placesModel.deleteOne({_id:placeID},function(err,data){
        console.log(err);
        if(err){
            res.json({
                msg: "Something went wrong!!!",
                status: -1,
                data: placeID
            })
        }else{
            res.json({
                msg: "Place removed...",
                status: 200,
                data: data
            })
        }
    })


}//deletePlace

//updatePlaces
module.exports.updatePlace = function(req,res){
    let  placeID = req.body.placeID
    let placeName = req.body.placeName
    let lat = req.body.lat
    let long = req.body.long
    let isApproved = req.body.isApproved
    let title = req.body.title
    let description = req.body.description
    let totalSeats = req.body.totalSeats
    let totalPrice = req.body.totalPrice
    let totalDay = req.body.totalDay
    let totalNight = req.body.totalNight
    let specialInstruction = req.body.specialInstruction
    let isActive = req.body.isActive

    placesModel.updateOne({_id:placeID},{placeName:placeName,lat:lat,long:long,isApproved:isApproved,title:title,description:description,totalSeats:totalSeats,totalPrice:totalPrice,totalDay:totalDay,totalNight:totalNight,specialInstruction:specialInstruction,isActive:isActive},function(err,data){
        console.log(err);
        if(err){
            res.json({
                msg: "Something went wrong!!!",
                status: -1,
                data: placeID
            })
        }else{
            res.json({
                msg: "Place updated...",
                status: 200,
                data: data
            })
        }
    })

}//updatePlace