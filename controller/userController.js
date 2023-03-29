const userModel = require("../model/userModel")
const nodemailer = require("nodemailer")

// const sendMail = async (req, res) => {
//   let testAccount = await nodemailer.createTestAccount();

//   // connect with the smtp
//   let transporter = await nodemailer.createTransport({
//     service:'gmail',
//     auth: {
//         user: 'topiwalamahmood@gmail.com',
//         pass: 'wtkoafswhdduiwji'
//     },
//   });
//   let info = await transporter.sendMail({
//     from: '"Happy Places 👻" <happyplaces@gmail.com>', // sender address
//     to: "topiwalamahmood@gmail.com", // list of receivers
//     subject: "Hello Mahmood", // Subject line
//     text: "Hello User Check Your otp", // plain text body
//     html: "<b>Your OTP is:612791 (Don't Share it with anyone)</b>", // html body
//   });
//     console.log("Message sent: %s", info.messageId);
//   res.json(info);
//     callback(info);
//     console.log(`The mail has beed send 😃 and the otp is ${otp}`);
//     res.send(info); 
// }
// module.exports.sendM=function (req, res){
//     console.log("request came");
//     let user = req.body.user;
//     sendMail(user, info => {
//       console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
//       res.send(info);
//     });
//   }
//forgetPassword
module.exports.forgetPassword =async function (req,res) {
    let email = req.body.email
    let isCorrect = false;
    let otp = parseInt(Math.random() * 1000000);
    let transporter = await nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: 'happyplaces565@gmail.com',
            pass: 'bgevkuvvkflgjwnx'
        },
      });
      let info =await transporter.sendMail({
        from: '"Happy Places 👻" <happyplaces@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Hello User", // Subject line
        text: "Hello User Check Your otp", // plain text body
        html: `<b>Your OTP is:${otp} (Don't Share it with anyone)</b>`, // html body
      });
    //authenticate 

    userModel.findOne({ "email": email }, function (err, user) {
        if (err) {
            console.log("Error" + err)

        } else {

            if (user == null || user == undefined) {
                res.json({
                    data: req.body,
                    msg: "Invalid Email",
                    status: -1
                })
            } else {

                //send mail - otp 
                //user - otp update 
                userModel.updateOne({ "email": email }, { "otp": otp }, function (err, data) {
                    if (err)
                        console.log(err)
                    else
                        console.log(data)
                })
                //   res.send(info)
                res.json({
                    data: "Please Check Your email",
                    msg: "Otp Sent Please Check Your email",
                    status: 200
                })
                
            }
        }
    })
}

//updatePassword
module.exports.resetPassword = function (req,res) {
    let email = req.body.email;
    let password= req.body.password;
    let isCorrect = false;
    let otp = req.body.otp;

    userModel.findOne({"email":email}, function (err,user) {
        if(err)
        {
            console.log(err);
        }
        else{
            if (user == null || user == undefined) {
                res.json({
                    data: req.body,
                    msg: "Invalid Data",
                    status: -1
                })
            } else {

                if (user.otp == otp) {
                    userModel.updateOne({"email":email},{"password":password,"otp":""},function(err,data){
                        if(err)
                            console.log(err)
                        else{
                            res.json({
                                data:"User Modified",
                                msg:"Password Reset Successfully....",
                                status:200
                            })
                        }    
                    })
                } else {
                    res.json({
                        data: req.body,
                        msg: "Invalid OTP",
                        status: -1
                    })
                }
            }
        }
    })
    if (isCorrect == true) {
        res.json({
            data: req.body,
            msg: "Password Successfully modified",
            status: 200
        })
    } else {
        console.log("password not modified");
    }
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

    // let userID = req.body.userID 
    userModel.deleteOne({_id:req.params.userId},function(err,data){
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
    let userid = req.body.userid
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

    userModel.updateOne({_id:userid},{firstName: firstName, lastName:lastName, email:email, mobileNo:mobileNo, address:address, gender:gender, dob:dob, password:password,falseAttempts:falseAttempts,
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
module.exports.getuserByid = function(req,res){
    let userid = req.params.userid;
    userModel.findOne({_id:userid},function (err,data) {
        if (err) {
            res.json({
                status: -1,
                msg: "SME",
                data: err
            })
        } else {
            res.json({
                status: 200,
                msg: "user reterieved..",
                data: data
            })
        }
    })

}