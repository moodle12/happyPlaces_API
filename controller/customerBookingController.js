const customerBookingModel = require("../model/customerBookingModel")

module.exports.addcustomerBooking = function(req,res){

    // let bookingId =  parseInt(Math.random()*100000)
    let tour = req.body.tour
    let user = req.body.user
    let noOfPerson = req.body.noOfPerson
    let dateOfBooking = req.body.dateOfBooking

    let customerBooking = new customerBookingModel(
        {
            // "bookingId":bookingId,
            "tour":tour,
            "user":user,
            "noOfPerson":noOfPerson,
            "dateOfBooking":dateOfBooking
        }
        )
        customerBooking.save(function(err,sucess){
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
    customerBookingModel.find().populate("user").populate("tour").exec(function(err,succes){
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


module.exports.getThisMonthcustomerBookings = function (req, res) {
    let m = new Date().getMonth() + 1;
    let y = new Date().getFullYear();
    console.log(m);
    console.log(y);
    //db 
    // ExpenseModel.find($AND:{ $gt:{date}  }}
    customerBookingModel.find(
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

module.exports.updatecustomerbooking = function(req,res)
{
    let bookingid = req.body.bookingid
    let status = req.body.status
    let noOfPerson = req.body.noOfPerson
    let dateOfBooking = req.body.dateOfBooking

    customerBookingModel.updateOne(
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
module.exports.deletecustomerbooking = function (req,res)
{
    // let bookingId = req.body.bookingId
    customerBookingModel.deleteOne({_id:req.params.bookingId},function(err,data){
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
module.exports.getcustomerbookingByid = function(req,res){
    let bookingid = req.params.bookingid;
    customerBookingModel.findOne({_id:bookingid},function (err,data) {
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
// module.exports.getbookingByStatus = function(req,res){
//     let statusid = req.params.statusid;
//     bookingModel.find({status:statusid},function (err,data) {
//         if (err) {
//             res.json({
//                 status: -1,
//                 msg: "SME",
//                 data: err
//             })
//         } else {
//             res.json({
//                 status: 200,
//                 msg: "booking retrieved..",
//                 data: data
//             })
//         }
//     }).populate("place").populate("act").populate("user")

// }

// module.exports.getbookingbyvendor = function(req,res){
//     let vendorid = req.params.vendorid;
//     console.log(vendorid);
//     bookingModel.find({vendor:vendorid}).populate("place").populate("act").populate("vendor").populate("status").populate("user").exec(function(err,succes){
//         console.log(err);
//         if(err)
//         {
//             console.log(err);
//             res.json({
//                 "msg":"SwR",
//                 status:-1,
//                 data:err
//             })
//         }
//         else
//         {
//             res.json({
//                 "msg":"booking retrived",
//                 status:200,
//                 data:succes
//             })
//         }
//     })

// }