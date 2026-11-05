const mongoose = require('mongoose');

const DB_URL = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log('מחובר למסד הנתונים');
    } catch (err) {
        console.log('שגיאה בחיבור למסד הנתונים:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
