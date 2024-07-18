const { default: mongoose } = require("mongoose");
const Bookmark = require("../models/Bookmark") ;
const User = require("../models/User") ;

// store bookmarked news
exports.addToBookmarkedNews = async(req, res) => {
    try{
        // get data -- title, description, author, url
        console.log(req.user.id) ;
        let userId = req.user.id ;
        console.log("User id : ", userId) ;
        console.log("Type of User id : ", typeof(userId)) ;

        const {title, description, author, image, url} = req.body ;
        
        // validate data
        if(!userId || !title || !description || !url){
            return res.status(403).json({
                success: false,
                message: "All fields are required.",
                userId,
                title,
                description,
                url
            }) ;    
        }

        // store news in Bookmark
        const bookmarkedNews = await Bookmark.create({title: title,
            description: description,
            author: author,
            image: image,
            url: url,
            // user: userId
        }) ;

        console.log("Newly created bookmarked news data : ", bookmarkedNews) ;

        const bookmarkedNewsId = bookmarkedNews._id ;

        console.log(bookmarkedNewsId) ;
        
        // store the bookmarked news id in user schema
        const updatedUserData = await User.findByIdAndUpdate(userId,
            {
                $push: {
                    bookmarkedNews: bookmarkedNewsId,
                }
            },
            {new: true}
        ) ;

        console.log("Updated User Data : ", updatedUserData) ;

        return res.status(200).json({
            success: true,
            message: "News Bookmarked Successfully",
            updatedUserData
        }) ;
    }catch(err){
        console.log(err) ;
        return res.status(500).json({
            success: false,
            message: err.message
        }) ;
    }
}

// get all bookmarked news
exports.getAllBookmarkedNews = async(req, res) => {
    try{
        // get user id
        const userId = req.user.id ;

        // get the bookmarked news of the user
        const userData = await User.findById({_id: userId}).populate("bookmarkedNews").exec() ;

        // which of the below 2 will work
        // const bookmarkedNews = user.bookmarkedNews.populate("bookmarkedNews").exec() ;
        const bookmarkedNews = userData.bookmarkedNews ;

        // check is bookmarkedNews[] length is 0
        if(bookmarkedNews.length == 0){
            return res.status(200).json({
                success: true,
                message: "No news liked yet."
            }) ;
        }

        // return response
        return res.status(200).json({
            success: false,
            message: "User's bookmarked news fetched.",
            bookmarkedNews
        }) ;
    }catch(err){
        console.log(err) ;
        console.log(err.message) ;
        return res.status(500).json({
            success: false,
            message: err.message
        }) ;
    }
}

// TODO: delete bookmarked news
exports.deleteBookmarkedNews = async(req, res) => {
    try{
        // get user id
        const userId = req.user.id ;

        // get news id
        const {newsId} = req.body ;
        
        // update in DB
        // return response
        
    }catch(err){
        console.log(err) ;
        return res.status(500).json({
            success: false,
            message: err.message
        }) ;
    }
}