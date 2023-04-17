const toursModel = require("../model/toursModel")

module.exports.addTours = function(req,res){

    let place = req.body.place
    let act = req.body.act
    let vendor = req.body.vendor
    let status = req.body.status
    let noOfPerson = req.body.noOfPerson
    let startDate = req.body.startDate
    let endDate = req.body.endDate

    let Tours = new toursModel(
        {
            
            "place":place,
            "act":act,
            "vendor":vendor,
            "status":status,
            "noOfPerson":noOfPerson,
            "startDate":startDate,
            "endDate":endDate
        }
        )
        Tours.save(function(err,sucess){
        if(err)
        {
            console.log(err);
                res.json({
                    "msg":"tour  not added",
                    status:-1,
                    data:"SWR"
                })   
        }
        else
        {
            res.json({
                "msg":"Tour Added Succesfully",
                status:200,
                data:sucess
            })
        }
        })
}// adding a booking

module.exports.getAlltours = function (req,res)
{
    toursModel.find().populate("place").populate("act").populate("vendor").populate("status").exec(function(err,succes){
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
                "msg":"tours retrived",
                status:200,
                data:succes
            })
        }
    })
}// end of get all bookings


module.exports.getThisMonthTours = function (req, res) {
    let m = new Date().getMonth() + 1;
    let y = new Date().getFullYear();
    console.log(m);
    console.log(y);
    //db 
    // ExpenseModel.find($AND:{ $gt:{date}  }}
    toursModel.find(
        {

            "$and": [
                {
                    "$expr": {
                        "$eq": [{ $month: { $dateFromString: { "dateString": "$startDate" } } }, m]
                    }
                }
                ,
                {
                    "$expr": {
                        "$eq": [{ $year: { $dateFromString: { "dateString": "$startDate" } } }, y]
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

module.exports.getdatetours = function (req,res)
{
    // let m = new Date().getMonth() + 1;
    // let y = new Date().getFullYear();
    // console.log(m);
    // console.log(y);
    let startDate=req.params.startDate
    let endDate=req.params.endDate
    console.log("=============");
    console.log(startDate);
    console.log(endDate);
    toursModel.find({
            startDate:{
                 $gte:startDate,
                 $lte: endDate
            }
             }).populate("place").populate("act").populate("vendor").populate("status").exec(function(err,succes){
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
}
// items.find({
//     created_at: {
//         $gte: ISODate("2010-04-29T00:00:00.000Z"),
//         $lt: ISODate("2010-05-01T00:00:00.000Z")
//     }
// })


module.exports.updatetour = function(req,res)
{
    let tourid = req.body.tourid
    let status = req.body.status
    let noOfPerson = req.body.noOfPerson
    let startDate = req.body.startDate
    let endDate= req.body.endDate

    toursModel.updateOne(
        {_id:tourid}, {"status":status,"noOfPerson":noOfPerson,"startDate":startDate,"endDate":endDate},function(err,succes)
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
                "msg":"tours details Updated SucessFully",
                status:200,
                data:succes
            })
        }   
    })
}// end of  update booking
module.exports.deletetour = function (req,res)
{
    // let bookingId = req.body.bookingId
    toursModel.deleteOne({_id:req.params.tourid},function(err,data){
        console.log(err);
        if(err)
        {
            res.json({
                "msg":"SMW",
                status:-1,
                data:tourid
            })
        }
        else
        {
            res.json({
                msg:"tour removed SuccesFully",
                status:200,
                data:data
            })
        }
    })
}//delete booking 
module.exports.gettourbyid = function(req,res){
    let tourid = req.params.tourid;
    toursModel.find({_id:tourid}).populate("place").populate("act").populate("vendor").populate("status").exec(function(err,succes){
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

}
module.exports.gettourByStatus = function(req,res){
    let statusid = req.params.statusid;
    toursModel.find({status:statusid},function (err,data) {
        if (err) {
            res.json({
                status: -1,
                msg: "SME",
                data: err
            })
        } else {
            res.json({
                status: 200,
                msg: "tour retrieved..",
                data: data
            })
        }
    }).populate("place").populate("act").populate("business")

}
module.exports.gettourbyvendor = function(req,res){
    let vendorid = req.params.vendorid;
    console.log(vendorid);
    toursModel.find({vendor:vendorid}).populate("place").populate("act").populate("vendor").populate("status").exec(function(err,succes){
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

}
