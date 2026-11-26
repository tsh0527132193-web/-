const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next({ status: 401, message: "נדרשת התחברות" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        next({ status: 401, message: "הטוקן אינו תקין או שפג תוקפו" });
    }
};

module.exports = checkAuth;
