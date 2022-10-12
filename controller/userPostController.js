const UserPostModel = require("../model/userPostModel")

module.exports.addUserPost = function (req, res) {
    let  user = req.body.user
    let  post = req.body.post
    let postCount = req.body.postCount

    let userPost = new UserPostModel(
        { 
            "user": user,
            "post": post,  
            "postCount": postCount
        }
    )

    userPost.save(function (err, data) {
        if (err) {
            console.log(err);
            res.json({
                msg: "User Post not added",
                status: -1,
                data: "Something went wrong!!"
            })
        } else {
            res.json({
                msg: "User Post added",
                status: 200,
                data: data
            })
        }
    })
}//addUserPost

//getAllUserPosts
module.exports.getAllUserPosts = function(req,res){
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
}//getAllUserPosts


//deleteUserPosts
module.exports.deleteUserPosts = function(req,res){

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


}//deleteUserPost

//updateUserPost
module.exports.updateUserPosts = function(req,res){
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

}//updateUserPost