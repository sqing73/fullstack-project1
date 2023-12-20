const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors'); // Adjust the path as needed

const authenticationMiddleware = async (req, res, next) => {
    try {
        // Extract token from header
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            throw new CustomAPIError('No token provided, authorization denied', 401);
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if user information is present in the token
        if (!decoded.user || !decoded.user.id) {
            throw new CustomAPIError('Invalid token', 401);
        }

        // Set the user ID in req.user
        req.user = { _id: decoded.user.id };
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = { authenticationMiddleware };
