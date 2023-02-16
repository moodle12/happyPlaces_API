const bookingModel = require("../model/bookingModel")

module.exports.addBooking = function(req,res){

    // let bookingId =  parseInt(Math.random()*100000)
    let place = req.body.place
    let act = req.body.act
    let user = req.body.user
    let status = req.body.status
    let noOfPerson = req.body.noOfPerson
    let dateOfBooking = req.body.dateOfBooking

    let Booking = new bookingModel(
        {
            // "bookingId":bookingId,
            "place":place,
            "act":act,
            "user":user,
            "status":status,
            "noOfPerson":noOfPerson,
            "dateOfBooking":dateOfBooking
        }
        )
        Booking.save(function(err,sucess){
        if(err)
        {
            console.log(err);
                res.json({
                    "msg":"booking  not added",
                    status:-1,
                    data:"SWR"
                })   
        }
        else
        {
            res.json({
                "msg":"Booking Added Succesfully",
                status:200,
                data:sucess
            })
        }
        })
}// adding a booking

module.exports.getAllbooking = function (req,res)
{
    bookingModel.find().populate("place").populate("act").populate("user").populate("status").exec(function(err,succes){
        console.log(err);
        if(err)
        {
            res.json({
                "msg":"SwR",
                status:-1,
                data:err
            })
        }
        else
        {
            res.json({
                "msg":"bookings retrived",
                status:200,
                data:succes
            })
        }
    })
}// end of get all bookings


module.exports.getThisMonthBookings = function (req, res) {
    let m = new Date().getMonth() + 1;
    let y = new Date().getFullYear();
    console.log(m);
    console.log(y);
    //db 
    // ExpenseModel.find($AND:{ $gt:{date}  }}
    bookingModel.find(
        {

            "$and": [
                {
                    "$expr": {
                        "$eq": [{ $month: { $dateFromString: { "dateString": "$dateOfBooking" } } }, m]
                    }
                }
                ,
                {
                    "$expr": {
                        "$eq": [{ $year: { $dateFromString: { "dateString": "$dateOfBooking" } } }, y]
                    }
                }
            ]

        }, function (err, data) {
            if (err) {

            } else {
                res.json({
                    data: data,
                    status: 200,
                    msg: "Done"
                })
            }
        }
    )
}

//end of this month booking

module.exports.updatebooking = function(req,res)
{
    let bookingid = req.body.bookingid
    let status = req.body.status
    let noOfPerson = req.body.noOfPerson
    let dateOfBooking = req.body.dateOfBooking

    bookingModel.updateOne(
        {_id:bookingid}, {"status":status,"noOfPerson":noOfPerson,"dateOfBooking":dateOfBooking},function(err,succes)
    {
        console.log(err);
        if(err)
        {
            res.json({
                "msg":"SwR",
                status:-1,
                data:err
            })
        }
        else{
            res.json({
                "msg":"booking details Updated SucessFully",
                status:200,
                data:succes
            })
        }   
    })
}// end of  update booking
module.exports.deletebooking = function (req,res)
{
    // let bookingId = req.body.bookingId
    bookingModel.deleteOne({_id:req.params.bookingId},function(err,data){
        console.log(err);
        if(err)
        {
            res.json({
                "msg":"SMW",
                status:-1,
                data:bookingId
            })
        }
        else
        {
            res.json({
                msg:"booking removed SuccesFully",
                status:200,
                data:data
            })
        }
    })
}//delete booking 
module.exports.getbookingByid = function(req,res){
    let bookingid = req.params.bookingid;
    bookingModel.findOne({_id:bookingid},function (err,data) {
        if (err) {
            res.json({
                status: -1,
                msg: "SME",
                data: err
            })
        } else {
            res.json({
                status: 200,
                msg: "booking retrieved..",
                data: data
            })
        }
    })

}
module.exports.getbookingByStatus = function(req,res){
    let statusid = req.params.statusid;
    bookingModel.find({status:statusid},function (err,data) {
        if (err) {
            res.json({
                status: -1,
                msg: "SME",
                data: err
            })
        } else {
            res.json({
                status: 200,
                msg: "booking retrieved..",
                data: data
            })
        }
    }).populate("place").populate("act").populate("user")

}