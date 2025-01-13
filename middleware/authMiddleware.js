const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: 'Server error: JWT secret is not defined.' });
    }

    const token = req.header('Authorization')?.match(/^Bearer\s(\S+)$/)?.[1];
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Token verification error:', err.message);
        res.status(401).json({ message: 'Token is not valid.' });
    }
};

module.exports = { protect };
