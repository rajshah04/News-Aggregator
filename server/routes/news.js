const express = require("express") ;
const router = express.Router() ;

const {signup, login} = require("../controllers/Auth") ;
const {auth} = require("../middlewares/auth") ;
const {addToBookmarkedNews, getAllBookmarkedNews, deleteBookmarkedNews} = require("../controllers/Bookmark") ;

// api route
router.post("/signup", signup) ;
router.post("/login", login) ;

// bookmarked news route
// put or post
router.post("/addToBookmarkedNews", auth, addToBookmarkedNews) ;
// router.put("/addToBookmarkedNews", auth, addToBookmarkedNews) ;
router.get("/getAllBookmarkedNews", auth, getAllBookmarkedNews) ;
router.delete("/deleteBookmarkedNews", deleteBookmarkedNews) ;

module.exports = router ;