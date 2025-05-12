import jwt from "jsonwebtoken"
export const authMiddleware = (req, res , next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(403).json("Token Exipired");
        }
        const token = authHeader.split(' ')[1];
        const decodeToke = jwt.verify(token , process.env.JWT_SECRET);
        if(!decodeToke.userId){
            return res.status(403).json("Token expired  / unauthenticated")
        }
        req.userId = decodeToke.userId;
        next();
    } catch (error) {
        console.log(error ,  "middleware");
    }
}