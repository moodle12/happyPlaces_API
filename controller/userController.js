const userModel = require("../model/userModel")


//forgetPassword
module.exports.forgetPassword = function (req,res) {
    let email = req.body.email;

    userModel.findOne({
        "email":email
    }, function (err,data) {
        if (err) {
            res.json({
               " msg": "Something went wrong!!!",
                "status": -1,
               " data": err
            })
        }
        else {
            if (data) {
                //otp generate
                let otp= parseInt((Math.random() * 1000000));
                //mail send
                userModel.updateOne(
                    {"email":email},
                    {"otp":otp},
                    function (err,data) {
                        console.log(err);
                        console.log(data);
                    }
                     )
                res.json({
                    "msg": "OTP Successfully sent to your email",
                    "status": 200,
                    "data": email
                })
            }
            else{
                res.json({
                    "msg": "Invalid email",
                    "status": -1,
                    "data": email
                })
            }
           
        }
    })
}

//updatePassword
module.exports.updatePassword = function (req,res) {
    let email = req.body.email;
    let password= req.body.password;
    let otp = req.body.otp;
}




module.exports.addUser = function (req, res) {
    // let  userID = parseInt(Math.random()*1000000)
    let userType = req.body.userType
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email
    let mobileNo = req.body.mobileNo
    let address = req.body.address
    let gender = req.body.gender
    let dob = req.body.dob
    let password = req.body.password
    let falseAttempts = req.body.falseAttempts
    let isApproved = req.body.isApproved

    let user = new userModel(
        { 
            // "userID": userID, 
            "userType":userType,
            "firstName": firstName,
            "lastName":lastName,
            "email":email,
            "mobileNo":mobileNo,
            "address":address,
            "gender":gender,
            "dob":dob,
            "password":password,
            "falseAttempts":falseAttempts,
            "isApproved":isApproved
        }
    )

    user.save(function (err, data) {
        if (err) {
            console.log(err);
            res.json({
                msg: "User not added",
                status: -1,
                data: "Something went wrong!!"
            })
        } else {
            res.json({
                msg: "User added",
                status: 200,
                data: data
            })
        }
    })
}//addUser

//getAllUsers
module.exports.getAllUser = function(req,res){
    userModel.find().populate("userType").exec(function(err,data){
        console.log(err);
        if(err){
            res.json({
                msg: "Something went wrong!!!",
                status: -1,
                data: err
            })
        }else{
            res.json({
                msg: "Users ret...",
                status: 200,
                data: data
            })
        }
    })
}//getAllUser


//deleteUser
module.exports.deleteUser = function(req,res){

    let userID = req.body.userID 
    userModel.deleteOne({_id:userID},function(err,data){
        console.log(err);
        if(err){
            res.json({
                msg: "Something went wrong!!!",
                status: -1,
                data: userID
            })
        }else{
            res.json({
                msg: "User  removed...",
                status: 200,
                data: data
            })
        }
    })


}//deleteUser

//updateUser
module.exports.updateUser = function(req,res){
    let userID = req.body.userID
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email
    let mobileNo = req.body.mobileNo
    let address = req.body.address
    let gender = req.body.gender
    let dob = req.body.dob
    let password = req.body.password
    let falseAttempts = req.body.falseAttempts
    let isApproved = req.body.isApproved

    userModel.updateOne({_id:userID},{firstName: firstName, lastName:lastName, email:email, mobileNo:mobileNo, address:address, gender:gender, dob:dob, password:password,falseAttempts:falseAttempts,
    isApproved:isApproved},function(err,data){
        console.log(err);
        if(err){
            res.json({
                msg: "Something went wrong!!!",
                status: -1,
                data: userID
            })
        }else{
            res.json({
                msg: "User updated...",
                status: 200,
                data: data
            })
        }
    })

}