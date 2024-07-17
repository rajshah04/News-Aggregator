const User = require("../models/User") ;
require("dotenv").config() ;

exports.auth = async(req, res, next) => {
    try{    
        
        // extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "") ;

        // console.log("token : ", token) ;

        // if token missing then return response
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token is missing" 
            }) ;
        }

        // verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET) ;
            console.log(decode) ;

            req.user = decode ;
        }catch(err){
            // verification issue
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            }) ;
        }
        next() ;
        
    }catch(err){
        return res.status(403).json({
            success: false,
            message: "Something went wrong while validating the token"
        }) ;
    }
}