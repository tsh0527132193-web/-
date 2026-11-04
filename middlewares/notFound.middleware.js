const notFound = (req, res, next) => {
    // להחזיר תשובה עם סטטוס 404 והודעה, למשל "הנתיב לא נמצא"
     const status = 404;
     res.status(status).json({ error: "הנתיב לא נמצא", type: 'client error' });
};

module.exports = notFound;
