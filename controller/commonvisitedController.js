const commonvisitedmodel = require("../model/commonvisitedModel")

module.exports.addCommonPlace = function (req, res) {
    let placeName = req.body.placeName
    let lat = req.body.lat
    let long = req.body.long
    let title = req.body.title
    let description = req.body.description

    let commonplaces = new commonvisitedmodel(
        { 
            "placeName": placeName,
            "lat":lat,
            "long":long,
             "title":title,
             "description":description
        }
    )

    commonplaces.save(function (err, data) {
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
module.exports.getAllCommonPlaces = function(req,res){
    commonvisitedmodel.find().exec(function(err,data){
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
module.exports.deleteCommonPlace = function(req,res){

    // let placeID = req.body.placeID
    commonvisitedmodel.deleteOne({_id:req.params.commonvisitedId},function(err,data){
        console.log(err);
        if(err){
            res.json({
                msg: "Something went wrong!!!",
                status: -1,
                data: commonvisitedId
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
module.exports.updateCommonPlace = function(req,res){
    let placeName = req.body.placeName
    let lat = req.body.lat
    let long = req.body.long
    let title = req.body.title
    let description = req.body.description
    let commonvisitedId = req.body.commonvisitedId

    commonvisitedmodel.updateOne({_id:commonvisitedId},{placeName:placeName,lat:lat,long:long,title:title,description:description},function(err,data){
        console.log(err);
        if(err){
            res.json({
                msg: "Something went wrong!!!",
                status: -1,
                data: commonvisitedId
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

module.exports.getcommonplaceByid = function(req,res){
    let commonvisitedId = req.params.commonvisitedId;
    commonvisitedmodel.findOne({_id:commonvisitedId},function (err,data) {
        if (err) {
            res.json({
                status: -1,
                msg: "SME",
                data: err
            })
        } else {
            res.json({
                status: 200,
                msg: "place retrieved..",
                data: data
            })
        }
    })

}