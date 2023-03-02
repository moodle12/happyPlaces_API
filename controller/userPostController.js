let multer=require('multer')
let uuidv4=require('uuid/v4')
let express =require('express')
let router = express.Router()
const UserPostModel = require("../model/userPostModel")

const DIR = './public/';
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

// module.exports.addUserPost = function (req, res) {
//     let  user = req.body.user
//     let  post = req.body.post
//     let postCount = req.body.postCount

//     let userPost = new UserPostModel(
//         { 
//             "user": user,
//             "post": post,  
//             "postCount": postCount
//         }
//     )

//     userPost.save(function (err, data) {
//         if (err) {
//             console.log(err);
//             res.json({
//                 msg: "User Post not added",
//                 status: -1,
//                 data: "Something went wrong!!"
//             })
//         } else {
//             res.json({
//                 msg: "User Post added",
//                 status: 200,
//                 data: data
//             })
//         }
//     })
// }//addUserPost



router.post('/user-post', upload.single('postImage'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const user = new UserPostModel({
        user: req.body.user,
        post:req.body.post,
        postCount:req.body.postCount,
        postImage: url + '/public/' + req.file.filename
    });
    user.save().then(result => {
        res.status(201).json({
            message: "User Post registered successfully!",
            userpostCreated: {
                user: result.user,
                post:result.post,
                postCount:result.postCount,
                postImage: result.postImage
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})

//getAllUserPosts
// module.exports.getAllUserPosts = function(req,res){
//     UserPostModel.find().populate("user").populate("post").exec(function(err,data){
//         console.log(err);
//         if(err){
//             res.json({
//                 msg: "Something went wrong!!!",
//                 status: -1,
//                 data: err
//             })
//         }else{
//             res.json({
//                 msg: "User Posts ret...",
//                 status: 200,
//                 data: data
//             })
//         }
//     })
// }//getAllUserPosts
router.get("/",(req,res,next)=>{
    UserPostModel.find().populate("user").populate("post").exec(function(err,data){
        console.log(err);
        if(err){
            res.json({
                msg: "Something went wrong!!!",
                status: -1,
                data: err
            })
        }else{
            res.json({
                msg: "User Posts ret...",
                status: 200,
                data: data
            })
        }
    })
})

//deleteUserPosts
// module.exports.deleteUserPosts = function(req,res){

//     let postID = req.body.postID 
//     UserPostModel.deleteOne({_id:postID},function(err,data){
//         console.log(err);
//         if(err){
//             res.json({
//                 msg: "Something went wrong!!!",
//                 status: -1,
//                 data: postID
//             })
//         }else{
//             res.json({
//                 msg: "User Post removed...",
//                 status: 200,
//                 data: data
//             })
//         }
//     })


// }//deleteUserPost


router.delete("/delete",(req,res,next)=>{

    let postID = req.body.postID 
    UserPostModel.deleteOne({_id:postID},function(err,data){
        console.log(err);
        if(err){
            res.json({
                msg: "Something went wrong!!!",
                status: -1,
                data: postID
            })
        }else{
            res.json({
                msg: "User Post removed...",
                status: 200,
                data: data
            })
        }
    })
})



//updateUserPost
// module.exports.updateUserPosts = function(req,res){
//     let postID = req.body.postID
//     let postCount  = req.body.postCount

//     UserPostModel.updateOne({_id:postID},{postCount:postCount},function(err,data){
//         console.log(err);
//         if(err){
//             res.json({
//                 msg: "Something went wrong!!!",
//                 status: -1,
//                 data: postID
//             })
//         }else{
//             res.json({
//                 msg: "User Post updated...",
//                 status: 200,
//                 data: data
//             })
//         }
//     })

// }//updateUserPost

router.put("/edit",(req,res,next)=>{
    let postID = req.body.postID
    let postCount  = req.body.postCount

    UserPostModel.updateOne({_id:postID},{postCount:postCount},function(err,data){
        console.log(err);
        if(err){
            res.json({
                msg: "Something went wrong!!!",
                status: -1,
                data: postID
            })
        }else{
            res.json({
                msg: "User Post updated...",
                status: 200,
                data: data
            })
        }
    })

})

module.exports=router;