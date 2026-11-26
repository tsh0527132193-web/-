const checkAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return next({ status: 403, message: "פעולה זו מותרת למנהל בלבד" });
    }
    next();
};

module.exports = checkAdmin;
