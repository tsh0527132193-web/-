const addCurrentDate = (req, res, next) => {
    // 1. להוסיף ל-req שדה בשם currentDate עם התאריך של עכשיו
    req.currentDate = new Date();
    // 2. לקרוא ל-next כדי להמשיך הלאה
    next();
};

module.exports = addCurrentDate;
