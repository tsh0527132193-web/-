const printDate = (req, res, next) => {
    // 1. if: אם סוג הבקשה הוא GET
    if (req.method === 'GET') {
        console.log(req.currentDate);
    }
    //      להדפיס עם console.log את req.currentDate
    next(); // 2. לקרוא ל-next (מחוץ ל-if! כדי שגם בקשות שאינן GET ימשיכו)
};

module.exports = printDate;
