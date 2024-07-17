const express = require("express") ;
const router = express.Router() ;

const {signup, login} = require("../controllers/Auth") ;

const {addToBookmarkedNews, getAllBookmarkedNews, deleteBookmarkedNews} = require("../controllers/Bookmark") ;

// api route
router.post("/signup", signup) ;
router.post("/login", login) ;

// bookmarked news route
router.post("/addToBookmarkedNews", addToBookmarkedNews) ;
router.get("/getAllBookmarkedNews", getAllBookmarkedNews) ;
router.delete("/deleteBookmarkedNews", deleteBookmarkedNews) ;

module.exports = router ;