const blockDays = (closedTimes) => {
    return (req, res, next) => {
        const day = req.currentDate.getDay();
        const hour = req.currentDate.getHours();

        const isClosed = closedTimes.some(t => t.day === day && hour >= t.from && hour < t.to);

        if (isClosed) {
            return res.status(403).json({ message: "האתר סגור בשבת. נשמח לראותך במוצאי שבת!" });
        }

        next();
    };
};

module.exports = blockDays;
