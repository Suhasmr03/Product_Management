//const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';
const jwtMiddleware = (req, res, next) => {
    // 1. Read the token
    const token = req.headers['authorization'];

    // 2. If no token, return error
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        // 3. Check if token is valid
        const decoded = jwt.verify(token, "your_jwt_secret");
        console.log("Decoded JWT:", decoded);   
        req.user = decoded;

        
    } catch (err) {
        // 5. Return error
        return res.status(400).json({ error: 'Invalid token.' });
    }
    // 4. Call next middleware
    next();
};

export default jwtMiddleware;