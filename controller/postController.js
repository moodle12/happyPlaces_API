const postModel = require("../model/postModel")
module.exports.addPost= function(req,res)
{
    // let postId = parseInt(Math.random()*100000)
    let place = req.body.place
    let likes = req.body.likes
    let isVerified = req.body.isVerified
    let post = new postModel(
        {
            // "postId":postId,
            "place":place,
            "likes":likes,
            "isVerified":isVerified
        }
    )
    post.save(function(err,sucess){
        if(err)
        {
            console.log(err);
                res.json({
                    "msg":"post not added",
                    status:-1,
                    data:"SWR"
                })   
        }
        else
        {
            res.json({
                "msg":"post Added Succesfully",
                status:200,
                data:sucess
            })
        }
        })

}// Adding post

module.exports.getAllPosts = function (req,res)
{
    postModel.find().populate("place").exec(function(err,succes){
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
                "msg":"posts retrived",
                status:200,
                data:succes
            })
        }
    })
}// end of get all posts

module.exports.updatePost = function(req,res)
{
    let postId = req.body.postId
    let place = req.body.place
    let likes = req.body.likes
    let isVerified = res.body.isVerified    

    postModel.updateOne(
        {_id:postId},
        {"place":place, "likes":likes,"isVerified":isVerified} ,function(err,succes)
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
                "msg":"Posts details Updated SucessFully",
                status:200,
                data:succes
            })
        }   
    })
}// end of  update Post

module.exports.deletePost = function (req,res)
{
    let postId = req.body.postId
    postModel.deleteOne({_id:postId},function(err,data){
        console.log(err);
        if(err)
        {
            res.json({
                "msg":"SMW",
                status:-1,
                data:postId
            })
        }
        else
        {
            res.json({
                msg:"post removed SuccesFully",
                status:200,
                data:data
            })
        }
    })
}//delete post