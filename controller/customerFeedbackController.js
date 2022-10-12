const customerFeedbackModel = require("../model/customerFeedbackModel")

module.exports.addCustomerFeedback = function (req, res) {
    // let feedID = parseInt(Math.random()*1000000)
    let user = req.body.user
    let business = req.body.business
    let comment = req.body.comment
    let businessStars = req.body.businessStars
    let isVisible = req.body.isVisible

    let customerFeedback = new customerFeedbackModel(
        { 
            // "feedID": feedID, 
            "user": user,
            "business": business,
            "comment": comment,
            "businessStars":businessStars,
            "isVisible":isVisible
        }
    )

    customerFeedback.save(function (err, data) {
        if (err) {
            console.log(err);
            res.json({
                msg: "Customer Feedback not added",
                status: -1,
                data: "Something went wrong!!"
            })
        } else {
            res.json({
                msg: "Customer Feedback added",
                status: 200,
                data: data
            })
        }
    })
}//addCustomerFeedback

//getAllCustomerFeedback
module.exports.getAllCustomerFeedback = function(req,res){
    customerFeedbackModel.find().populate("user").populate( "business").exec(function(err,data){
        console.log(err);
        if(err){
            res.json({
                msg: "Something went wrong!!!",
                status: -1,
                data: err
            })
        }else{
            res.json({
                msg: "Customer Feedbacks ret...",
                status: 200,
                data: data
            })
        }
    })
}//getAllCustomerFeedback


//deleteCustomerFeedback
module.exports.deleteCustomerFeedback = function(req,res){

    let feedId = req.body.feedId 
    customerFeedbackModel.deleteOne({_id:feedId},function(err,data){
        console.log(err);
        if(err){
            res.json({
                msg: "Something went wrong!!!",
                status: -1,
                data: feedId
            })
        }else{
            res.json({
                msg: "Customer Feedback removed...",
                status: 200,
                data: data
            })
        }
    })


}//deleteCustomerFeedback

//updateCustomerFeedback
module.exports.updateCustomerFeedback = function(req,res){
    let feedId = req.body.feedId
    let comment = req.body.comment
    let businessStars = req.body.businessStars
    let isVisible = req.body.isVisible

    customerFeedbackModel.updateOne({_id:feedId},{comment:comment,businessStars:businessStars,isVisible:isVisible},function(err,data){
        console.log(err);
        if(err){
            res.json({
                msg: "Something went wrong!!!",
                status: -1,
                data: feedId
            })
        }else{
            res.json({
                msg: "Customer Feedback updated...",
                status: 200,
                data: data
            })
        }
    })

}//updateCustomerFeedback