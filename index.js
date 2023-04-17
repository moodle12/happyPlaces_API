const express = require("express");
const userTypeController = require("./controller/userTypeController")
const userController = require("./controller/userController")
const customerFeedbackController = require("./controller/customerFeedbackController")
const businessController = require("./controller/businessController")
const userPostController = require("./controller/userPostController")
const placesController = require("./controller/placesController")
const commonplacesController = require("./controller/commonvisitedController")
const activityController = require("./controller/activityController")
const postController = require("./controller/postController")
const bookingController = require("./controller/bookingController")
const tourController = require("./controller/toursController")
const sessionController = require("./controller/sessionController")
const statusController=require("./controller/statusController")
const customerBookingController=require("./controller/customerBookingController")
const api = require('./controller/userProfileController')
const mongoose = require("mongoose");
const cors = require('cors');
const app = express()
const bodyParser =require("body-parser");
const sendMail = require("./controller/userController");
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors())
app.use(express.json())  //body
app.use(express.urlencoded({extended:true})) //body -- extended true because of plus or any other symbol
app.use(bodyParser.json());
//mongodb://localhost:27017/happyPlaces
mongoose.connect("mongodb+srv://topiwalamahmood:root@cluster0.ctso0mc.mongodb.net/HappyPlaces",function (err) {

    if (err) {
        console.log("OH NO!! Something went wrong!");
        console.log(err);
    }
    else{
        console.log("db Connected Successfully...");
    }
    
})


//userTypes --api
app.get('/userType',userTypeController.getAllUserTypes)
app.post('/userType',userTypeController.addUserType)
app.delete('/userType',userTypeController.deleteUserTypes)
app.put('/userType',userTypeController.updateUserTypes)
//userTypes --api


//user--api
app.get('/user',userController.getAllUser)
app.post('/user',userController.addUser)
app.post('/forgetPassword',userController.forgetPassword)
// app.post('/sendmail',userController.sendM)
app.put('/resetPassword',userController.resetPassword);
app.delete('/user/:userId',userController.deleteUser)
app.put('/user',userController.updateUser)
app.get("/getuserbyid/:userid",userController.getuserByid)
//user--api

//login,signup api
app.post('/login',sessionController.login)
app.post('/signup',sessionController.signup)


//table 3 booking
app.post("/booking",bookingController.addBooking)
app.delete("/booking/:bookingId",bookingController.deletebooking)
app.put("/booking",bookingController.updatebooking)
app.get("/booking",bookingController.getAllbooking)
app.get("/getthismonthbooking", bookingController.getThisMonthBookings)
app.get("/getbookingbyid/:bookingid",bookingController.getbookingByid)
app.get("/getbookingbystatus/:statusid",bookingController.getbookingByStatus)
app.get("/getbookingbyvendor/:vendorid",bookingController.getbookingbyvendor)
// table 4 Activity
app.post("/activity",activityController.addActivity)
app.delete("/activity/:activityId",activityController.deleteActivity)
app.put("/activity",activityController.updateActivity)
app.get("/activity",activityController.getAllActivity)
app.get("/getactivitybyid/:activityId",activityController.getactivityByid)
app.get("/getactivitybyvendor/:vendorid",activityController.getactivitybyvendor)
//Activity

//customerbooking
app.post("/customerbooking",customerBookingController.addcustomerBooking)
app.delete("/customerbooking/:bookingId",customerBookingController.deletecustomerbooking)
app.put("/customerbooking",customerBookingController.updatecustomerbooking)
app.get("/customerbooking",customerBookingController.getAllbooking)
app.get("/getthismonthcustomerbooking", customerBookingController.getThisMonthcustomerBookings)
app.get("/getcustomerbookingbyid/:bookingid",customerBookingController.getcustomerbookingByid)


//tours
app.post("/tour",tourController.addTours)
app.delete("/tour/:tourId",tourController.deletetour)
app.put("/tour",tourController.updatetour)
app.get("/tour",tourController.getAlltours)
app.get("/getthismonthtours", tourController.getThisMonthTours)
app.get("/gettourbyid/:tourid",tourController.gettourbyid)
app.get("/gettourbydate/:startDate/:endDate",tourController.getdatetours)
app.get("/gettourbystatus/:statusid",tourController.gettourByStatus)
app.get("/gettourbyvendor/:vendorid",tourController.gettourbyvendor)
//customerFeedback--api
app.get('/customerFeedback',customerFeedbackController.getAllCustomerFeedback)
app.post('/customerFeedback',customerFeedbackController.addCustomerFeedback)
app.delete('/customerFeedback',customerFeedbackController.deleteCustomerFeedback)
app.put('/customerFeedback',customerFeedbackController.updateCustomerFeedback)
app.get("/getfeedbackbyvendor/:vendorid",customerFeedbackController.getfeedbackbyvendor)
//customerFeedback--api


//business--api
app.get('/business',businessController.getAllBusiness)
app.post('/business',businessController.addBusiness)
app.delete('/business/:businessId',businessController.deleteBusiness)
app.put('/business',businessController.updateBusiness)
//business--api

// table 5 posts
app.post("/post",postController.addPost)
app.delete("/post/:postId",postController.deletePost)
app.put("/post",postController.updatePost)
app.get("/post",postController.getAllPosts)
app.get("/getpostbyid/:postId",postController.getpostByid)
//posts

//userPost--api
// app.get('/userPost',userPostController.getAllUserPosts)
// app.post('/userPost',userPostController.addUserPost)
// app.delete('/userPost',userPostController.deleteUserPosts)
// app.put('/userPost',userPostController.updateUserPosts)
//userPost--api


//places--api
// app.get('/place',placesController.getAllPlaces)
// app.post('/place',placesController.addPlace)
// app.delete('/place/:placeId',placesController.deletePlace)
// app.put('/place',placesController.updatePlace)
// app.get("/getplacebyid/:placeid",placesController.getplaceByid)
//places--api

//common-places--api
app.get('/commonplace',commonplacesController.getAllCommonPlaces)
app.post('/commonplace',commonplacesController.addCommonPlace)
app.delete('/commonplace/:commonvisitedId',commonplacesController.deleteCommonPlace)
app.put('/commonplace',commonplacesController.updateCommonPlace)
app.get("/getcommonplacebyid/:commonvisitedId",commonplacesController.getcommonplaceByid)
//common-places--api

//status--api
app.post("/status",statusController.addStatus)
app.delete("/status/:statusId",statusController.deleteStatus)
app.put("/status",statusController.updatestatus)
app.get("/status",statusController.getAllStatus)
app.get("/getstatusbyid/:statusId",statusController.getstatusbyid)


//imageuserpost--api
app.use('/public', express.static('public'));
app.use('/profile', express.static('profile'));
app.use('/api', api)
app.use("/userpost",userPostController)
app.use("/place",placesController)
app.use((req, res, next) => {
    // Error goes via `next()` method
    setImmediate(() => {
        next(new Error('Something went wrong-- url not found'));
    });
});
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

app.listen(9909,function(err){
    if(err){
        console.log("Server not connected....");
    }else{
        console.log("server started....at 9909");
    }
});