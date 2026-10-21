const express = require('express');
const bookRouter = require('./routes/book.route');
const userRouter = require('./routes/user.route');

const app = express();
app.use(express.json());

const PORT = 5000;

app.use('/books', bookRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`השרת רץ בהצלחה על פורט ${PORT}`);
});
