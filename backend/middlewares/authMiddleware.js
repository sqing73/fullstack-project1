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
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = { authenticationMiddleware };
