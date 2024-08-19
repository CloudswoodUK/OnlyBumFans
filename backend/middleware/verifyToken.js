import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({success: false, message: 'Unauthorized access.'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({success: false, message: 'Unauthorized access - invalid token.'});
        }
        req.userID = decoded.userID;
        next();
        
    } catch (error) {
        console.log("Error in verification.", error);
        return res.status(400).json({success: false, message: 'Error in verification.'});
    }
};