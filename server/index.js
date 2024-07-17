const express = require("express") ;
const app = express() ;
const cors=require('cors');
app.use(cors());

const cookieParser = require("cookie-parser") ;

require("dotenv").config() ;
const PORT = process.env.PORT || 4000 ;

// middleware to parse the objects from the req body
app.use(express.json()) ;
app.use(cookieParser()) ;
// try adding cookie parser


require("./config/connectDB").connectDB() ;

// route import and mount
const news = require("./routes/news") ;
app.use("/api/v1", news) ;

app.get("/", () => {
    console.log(`App is running on post no. {}`)
})

// activate
app.listen(PORT, () => {
    console.log(`App is currently listening at ${PORT}`) ;
})