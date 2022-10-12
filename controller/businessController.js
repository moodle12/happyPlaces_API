const businessModel = require("../model/businessModel")

module.exports.addBusiness = function (req, res) {
    // let businessID = parseInt(Math.random()*1000000)
    let user = req.body.user
    let businessType = req.body.businessType
    let businessAddress = req.body.businessAddress
    let consumerContact = req.body.consumerContact
    let emailAddress = req.body.emailAddress

    let business = new businessModel(
        { 
            // "businessID": businessID, 
            "user": user,
            "businessType": businessType,
            "businessAddress": businessAddress,
            "consumerContact":consumerContact,
            "emailAddress":emailAddress
        }
    )

    business.save(function (err, data) {
        if (err) {
            console.log(err);
            res.json({
                msg: "Business not added",
                status: -1,
                data: "Something went wrong!!"
            })
        } else {
            res.json({
                msg: "Business added",
                status: 200,
                data: data
            })
        }
    })
}//addBusiness

//getAllBusiness
module.exports.getAllBusiness = function(req,res){
    businessModel.find().populate("user").exec(function(err,data){
        console.log(err);
        if(err){
            res.json({
                msg: "Something went wrong!!!",
                status: -1,
                data: err
            })
        }else{
            res.json({
                msg: "Businesses ret...",
                status: 200,
                data: data
            })
        }
    })
}//getAllBusiness


//deleteBusiness
module.exports.deleteBusiness = function(req,res){

    let businessId = req.body.businessId 
    businessModel.deleteOne({_id:businessId},function(err,data){
        console.log(err);
        if(err){
            res.json({
                msg: "Something went wrong!!!",
                status: -1,
                data: businessId
            })
        }else{
            res.json({
                msg: "Business removed...",
                status: 200,
                data: data
            })
        }
    })


}//deleteBusiness

//updateBusiness
module.exports.updateBusiness = function(req,res){
    let businessId = req.body.businessId
    let businessType = req.body.businessType
    let businessAddress = req.body.businessAddress
    let consumerContact = req.body.consumerContact
    let emailAddress = req.body.emailAddress

    businessModel.updateOne({_id:businessId},{businessType:businessType,businessAddress:businessAddress,consumerContact:consumerContact,emailAddress:emailAddress},function(err,data){
        console.log(err);
        if(err){
            res.json({
                msg: "Something went wrong!!!",
                status: -1,
                data: businessId
            })
        }else{
            res.json({
                msg: "Business updated...",
                status: 200,
                data: data
            })
        }
    })

}//updateBusiness