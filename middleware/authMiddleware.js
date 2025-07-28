import JWT from "jsonwebtoken"


const userAuth = async (req, res, next) => {
    try {
         const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('bearer')){
        next("Auth Failed")
    }
    const token = authHeader.split(" ")[1];
    
        const payload = JWT.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.userId }
        next();
    } catch (error) {
         next('Authentication failed')
    }
   
    
   
}
export default userAuth;