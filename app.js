const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const addCurrentDate = require('./middlewares/currentDate.middleware.js');
const printDate = require('./middlewares/printDate.middleware.js');
const blockDays = require('./middlewares/blockDays.middleware.js');
const bookRouter = require('./routes/book.route');
const userRouter = require('./routes/user.route');
const notFound = require('./middlewares/notFound.middleware.js');
const errorHandler = require('./middlewares/errorHandler.middleware.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(addCurrentDate);
app.use(printDate);
app.use(blockDays([
    { day: 5, from: 12, to: 24 },
    { day: 6, from: 0, to: 22 }
]));
if(app.get('env') === 'development') {
    app.use(morgan('dev'));
}

const PORT = 5000;

app.use('/books', bookRouter);
app.use('/users', userRouter);
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`השרת רץ בהצלחה על פורט ${PORT}`);
});
