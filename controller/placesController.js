const placesModel = require("../model/placesModel")
let multer=require('multer')
let uuidv4=require('uuid/v4')
let express =require('express')
let router = express.Router()

const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// module.exports.addPlace = function (req, res) {
//     let  user = req.body.user
//     // let  placeID = parseInt(Math.random()*1000000)
//     let  activity= req.body.activity
//     let placeName = req.body.placeName
//     let lat = req.body.lat
//     let long = req.body.long
//     let isApproved = req.body.isApproved
//     let title = req.body.title
//     let description = req.body.description
//     let totalSeats = req.body.totalSeats
//     let totalPrice = req.body.totalPrice
//     let totalDay = req.body.totalDay
//     let totalNight = req.body.totalNight
//     let specialInstruction = req.body.specialInstruction
//     let isActive = req.body.isActive

//     let places = new placesModel(
//         { 
//             "user": user, 
//             // "placeID":placeID,
//             "activity":activity,
//             "placeName": placeName,
//             "lat":lat,
//             "long":long,
//              "isApproved":isApproved,
//              "title":title,
//              "description":description,
//              "totalSeats":totalSeats,
//              "totalPrice":totalPrice,
//              "totalDay":totalDay,
//              "totalNight":totalNight,
//              "specialInstruction":specialInstruction,
//              "isActive":isActive
//         }
//     )

//     places.save(function (err, data) {
//         if (err) {
//             console.log(err);
//             res.json({
//                 msg: "Place not added",
//                 status: -1,
//                 data: "Something went wrong!!"
//             })
//         } else {
//             res.json({
//                 msg: "Place added",
//                 status: 200,
//                 data: data
//             })
//         }
//     })
// }//addPlace

router.post('/', upload.single('placeImage'), (req, res,next)=> {
    const url = req.protocol + '://' + req.get('host')
    const place = new placesModel({
        user: req.body.user,
        activity:req.body.activity,
        placeName: req.body.placeName,
        lat:req.body.lat,
        long:req.body.long,
         isApproved:req.body.isApproved,
         title:req.body.title,
         description:req.body.description,
         totalSeats:req.body.totalSeats,
         totalPrice:req.body.totalPrice,
         totalDay:req.body.totalDay,
         totalNight:req.body.totalNight,
         specialInstruction:req.body.specialInstruction,
         isActive:req.body.isActive,
        placeImage: url + '/public/' + req.file.filename
    });

    place.save().then(result => {
        res.status(201).json({
            message: "Place registered successfully!",
            userCreated: {
                user: result.user,
                activity:result.activity,
                placeName: result.placeName,
                lat:result.lat,
                long:result.long,
                 isApproved:result.isApproved,
                 title:result.title,
                 description:result.description,
                 totalSeats:result.totalSeats,
                 totalPrice:result.totalPrice,
                 totalDay:result.totalDay,
                 totalNight:result.totalNight,
                 specialInstruction:result.specialInstruction,
                 isActive:result.isActive,
                placeImage: result.placeImage
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})

//getAllPlaces
// module.exports.getAllPlaces = function(req,res){
//     placesModel.find().populate("user").populate("activity").exec(function(err,data){
//         console.log(err);
//         if(err){
//             res.json({
//                 msg: "Something went wrong!!!",
//                 status: -1,
//                 data: err
//             })
//         }else{
//             res.json({
//                 msg: "Places ret...",
//                 status: 200,
//                 data: data
//             })
//         }
//     })
// }//getAllPlaces

router.get("/",(req,res,next)=>{
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
})

//deletePlaces
// module.exports.deletePlace = function(req,res){

//     // let placeID = req.body.placeID
//     placesModel.deleteOne({_id:req.params.placeId},function(err,data){
//         console.log(err);
//         if(err){
//             res.json({
//                 msg: "Something went wrong!!!",
//                 status: -1,
//                 data: placeID
//             })
//         }else{
//             res.json({
//                 msg: "Place removed...",
//                 status: 200,
//                 data: data
//             })
//         }
//     })


// }//deletePlace


router.delete("/:placeId",(req,res,next)=>{

    // let placeID = req.body.placeID
    placesModel.deleteOne({_id:req.params.placeId},function(err,data){
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
})


//updatePlaces
// module.exports.updatePlace = function(req,res){
//     let  placeid = req.body.placeid
//     let placeName = req.body.placeName
//     let lat = req.body.lat
//     let long = req.body.long
//     let isApproved = req.body.isApproved
//     let title = req.body.title
//     let description = req.body.description
//     let totalSeats = req.body.totalSeats
//     let totalPrice = req.body.totalPrice
//     let totalDay = req.body.totalDay
//     let totalNight = req.body.totalNight
//     let specialInstruction = req.body.specialInstruction
//     let isActive = req.body.isActive

//     placesModel.updateOne({_id:placeid},{placeName:placeName,lat:lat,long:long,isApproved:isApproved,title:title,description:description,totalSeats:totalSeats,totalPrice:totalPrice,totalDay:totalDay,totalNight:totalNight,specialInstruction:specialInstruction,isActive:isActive},function(err,data){
//         console.log(err);
//         if(err){
//             res.json({
//                 msg: "Something went wrong!!!",
//                 status: -1,
//                 data: placeid
//             })
//         }else{
//             res.json({
//                 msg: "Place updated...",
//                 status: 200,
//                 data: data
//             })
//         }
//     })

// }//updatePlace


router.put("/",(req,res,next)=>{
    let  placeid = req.body.placeid
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
    let placeImage=  req.file.filename

    placesModel.updateOne({_id:placeid},{placeName:placeName,lat:lat,long:long,isApproved:isApproved,title:title,description:description,totalSeats:totalSeats,totalPrice:totalPrice,totalDay:totalDay,totalNight:totalNight,specialInstruction:specialInstruction,isActive:isActive,placeImage: url + '/public/' + placeImage},function(err,data){
        console.log(err);
        if(err){
            res.json({
                msg: "Something went wrong!!!",
                status: -1,
                data: placeid
            })
        }else{
            res.json({
                msg: "Place updated...",
                status: 200,
                data: data
            })
        }
    })

})

// module.exports.getplaceByid = function(req,res){
//     let placeid = req.params.placeid;
//     placesModel.findOne({_id:placeid},function (err,data) {
//         if (err) {
//             res.json({
//                 status: -1,
//                 msg: "SME",
//                 data: err
//             })
//         } else {
//             res.json({
//                 status: 200,
//                 msg: "place retrieved..",
//                 data: data
//             })
//         }
//     })

// }

router.get("/getplacebyid/:placeid",(req,res,next)=>{
    let placeid = req.params.placeid;
    placesModel.find({user:placeid}).populate("activity").populate("user").exec(function(err,succes){
        console.log(err);
        if(err)
        {
            console.log(err);
            res.json({
                "msg":"SwR",
                status:-1,
                data:err
            })
        }
        else
        {
            res.json({
                "msg":"tours retrived",
                status:200,
                data:succes
            })
        }
    })

})
module.exports=router;