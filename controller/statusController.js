
const statusmodel = require("../model/statusModel")
module.exports.addStatus= function(req,res)
{
    //  let actId = parseInt((Math.random()*10000))
    let statusName= req.body.statusName

    let status = new statusmodel(
        {
            //  "actId":actId,
            "statusName":statusName
        }
    )
    status.save(function(err,sucess){
        if(err)
        {
            console.log(err);
                res.json({
                    msg:"status not added",
                    status:-1,
                    data:"SWR"
                })   
        }
        else
        {
            res.json({
                msg:"status Added  Succesfully",
                status:200,
                data:sucess
            })
        }
        })

}// Adding Activity

module.exports.getAllStatus= function (req,res)
{
    statusmodel.find(function(err,succes){
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
                "msg":"statuses retrived",
                status:200,
                data:succes
            })
        }
    })
}// end of get all activities

module.exports.updatestatus = function(req,res)
{
     let statusId = req.body.statusId
    let statusName = req.body.statusName
    

    statusmodel.updateOne({_id:statusId}, {"statusName":statusName} ,function(err,succes)
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
                "msg":"Status details Updated SucessFully",
                status:200,
                data:succes
            })
        }   
    })
}// end of  update Activity

module.exports.deleteStatus = function (req,res)
{
    // let actId = req.body.actId
    statusmodel.deleteOne({_id:req.params.statusId},function(err,data){
        console.log(err);
        if(err)
        {
            res.json({
                "msg":"SMW",
                status:-1,
                data:statusId
            })
        }
        else
        {
            res.json({
                msg:"status removed SuccesFully",
                status:200,
                data:data
            })
        }
    })
}//delete Activity

module.exports.getstatusbyid = function(req,res){
    let statusId = req.params.statusId;
    statusmodel.findOne({_id:statusId},function (err,data) {
        if (err) {
            res.json({
                status: -1,
                msg: "SME",
                data: err
            })
        } else {
            res.json({
                status: 200,
                msg: "Status retrieved..",
                data: data
            })
        }
    })

}