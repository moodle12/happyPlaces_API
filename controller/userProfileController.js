let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4'),
    router = express.Router();

const DIR = './profile/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
let User = require('../model/userProfileModel')
router.post('/user-profile', upload.single('profileImg'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const user = new User({
        user: req.body.user,
        profileDescription:req.body.profileDescription,
        profileImg: url + '/profile/' + req.file.filename
    });
    user.save().then(result => {
        res.status(201).json({
            message: "User profile registered successfully!",
            userCreated: {
                user: result.user,
                profileImg: result.profileImg,
                profileDescription:result.profileDescription
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})

router.get("/", (req, res, next) => {
    User.find().populate("user").then(data => {
        res.status(200).json({
            message: "User profile retrieved successfully!",
            users: data
        });
    });
});
router.get("/:userid",(req,res)=>{
    let userid = req.params.userid;
    User.findOne({user:userid},function (err,data) {
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
    }).populate("user")
})
router.put("/:userid",upload.single('profileImg'),(req,res,next)=>{
    let url = req.protocol + '://' + req.get('host')
    let userid = req.params.userid
    let profileDescription = req.body.profileDescription
    let profileImg= url + '/profile/' + req.file.filename
    User.updateOne({user:userid},{profileImg: profileImg,profileDescription:profileDescription},function(err,data){
        if(err){
            console.log(err);
            res.json({
                msg: "Something went wrong!!!",
                status: -1,
                data: userid
            })
        }else{
            res.json({
                msg: "User updated...",
                status: 200,
                data: data
            })
        }
    })

})
module.exports = router;