const UserModel = require("../model/userModel")


module.exports.login = function (req, res) {

    //login
    let email = req.body.email
    let password = req.body.password

    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = '';
    for (var i = 16; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    UserModel.findOne({
        $and: [
            { "email": email },
            { "password": password }
        ]
    }).populate("userType").exec(function (err, data) {
        if (data == "" || data == undefined) {
            res.json({
                status: -1,
                msg: "Invalid Credentails",
                data: req.body
            })
        }  else {
            data.token=result
            data.save(function(err,data2){
                if(err)
                {

                }
                else
                {
                    res.json({
                        status: 200,
                        msg: "Login done...",
                        data: data
                    })
                }
            })
        }
    });
}
module.exports.signup = function (req, res) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let userType = req.body.userType
    console.log(req.body);
    let u = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password,
        "userType": userType
    }


    let user = new UserModel(u)

    user.save(function (err, success) {
        if (err) {
            res.json({
                status: -1,
                msg: "SME",
                data: err
            })
        } else {
            res.json({
                status: 200,
                msg: "user added",
                data: success
            })
        }
    })
}


module.exports.getAllUsers = function (req, res) {
    UserModel.find().populate("userType").exec(function (err, data) {
        if (err) {
            res.json({
                status: -1,
                msg: "SME",
                data: err
            })
        } else {
            res.json({
                status: 200,
                msg: "User Reter....",
                data: data
            })
        }
    })
}



