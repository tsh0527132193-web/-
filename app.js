// app.js

const express = require('express');
const bookRouter = require('./routes/book.route');
const userRouter = require('./routes/user.route');

const app = express();
app.use(express.json());

const PORT = 5000;

// --- סעיף 8: הפעלת הניתובים ---
app.use('/books', bookRouter);
app.use('/users', userRouter);

// הפעלת השרת
app.listen(PORT, () => {
    console.log(`השרת רץ בהצלחה על פורט ${PORT}`);
});
