import UserData from "../models/user.ts";
import jwt from 'jsonwebtoken'
export const authCheck = async(req,res,next)=>{
    if(req.method === 'OPTIONS'){
        return next()
    }else{
        try{
            const token = req.headers.authorization.split(' ') [1]
            if(!token){
                console.log("authentication failed");
                
            }else{
                const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
                const validUser = await UserData.findOne({_id: decodedToken.userId}
                )
                if(!validUser) {
                    console.log("Invalid credentials..!");
                    
                }else{
                    req.userDetails = { userId: decodedToken.userId}
                    next()
                }

            }
        }catch(err){
            console.log("Authentication Failed",err);
            
        }
    }
}