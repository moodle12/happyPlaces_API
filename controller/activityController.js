
const activitymodel = require("../model/activityModel")
module.exports.addActivity= function(req,res)
{
    //  let actId = parseInt((Math.random()*10000))
    let actType = req.body.actType

    let activity = new activitymodel(
        {
            //  "actId":actId,
            "actType":actType
        }
    )
    activity.save(function(err,sucess){
        if(err)
        {
            console.log(err);
                res.json({
                    msg:"activity  not added",
                    status:-1,
                    data:"SWR"
                })   
        }
        else
        {
            res.json({
                msg:"Activity Added  Succesfully",
                status:200,
                data:sucess
            })
        }
        })

}// Adding Activity

module.exports.getAllActivity = function (req,res)
{
    activitymodel.find(function(err,succes){
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
                "msg":"activites retrived",
                status:200,
                data:succes
            })
        }
    })
}// end of get all activities

module.exports.updateActivity = function(req,res)
{
     let actId = req.body.actId
    let actType = req.body.actType
    

    activitymodel.updateOne({_id:actId}, {"actType":actType} ,function(err,succes)
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
                "msg":"Activity details Updated SucessFully",
                status:200,
                data:succes
            })
        }   
    })
}// end of  update Activity

module.exports.deleteActivity = function (req,res)
{
    let actId = req.body.actId
    activitymodel.deleteOne({_id:actId},function(err,data){
        console.log(err);
        if(err)
        {
            res.json({
                "msg":"SMW",
                status:-1,
                data:actId
            })
        }
        else
        {
            res.json({
                msg:"Activity removed SuccesFully",
                status:200,
                data:data
            })
        }
    })
}//delete Activity