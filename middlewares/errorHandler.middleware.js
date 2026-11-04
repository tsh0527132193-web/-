const errorHandler = (err, req, res, next) => {
    // 1. לקבוע סטטוס: err.status אם קיים, אחרת 500
const status = err.status || 500;

    res.status(status).json({ error: err.message, type: status < 500 ? 'client error' : 'server error' });

};

module.exports = errorHandler;
