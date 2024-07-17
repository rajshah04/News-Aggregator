const Bookmark = require("../models/Bookmark") ;
const User = require("../models/User") ;

// store bookmarked news
exports.addToBookmarkedNews = async(req, res) => {
    try{
        // get data -- title, description, author, url
        const {userId} = req.user.id ;

        const {title, description, author, image, url} = req.body ;
        
        // validate data
        if(!userId || !title || !description || !author || !url){
            return res.status(403).json({
                success: false,
                message: "All fields are required."
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

        const bookmarkedNewsId = bookmarkedNews._id ;
        
        // store the bookmarked news id in user schema
        const updatedUserData = await User.findByIdAndUpdate({userId},
            {
                $push: {
                    bookmarkedNews: bookmarkedNewsId,
                }
            },
            {new: true}
        ) ;

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
        const {userId} = req.user.id ;

        // get the bookmarked news of the user
        const user = await User.findById({userId}) ;

        // which of the below 2 will work
        // const bookmarkedNews = user.bookmarkedNews.populate("bookmarkedNews").exec() ;
        const bookmarkedNews = user.populate("bookmarkedNews").exec() ;
        // check is bookmarkedNews[] length is 0
        // return response
        return res.status(200).json({
            success: false,
            message: "User's bookmarked news fetched.",
            bookmarkedNews
        }) ;
    }catch(err){
        console.log(err) ;
        return res.status(500).json({
            success: false,
            message: err.message
        }) ;
    }
}

// delete bookmarked news
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