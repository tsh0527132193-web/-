const Book = require('../models/book.model');
const db = require('../db');

const getAllBooks = async (req, res, next) => {
    try {
        let { limit = 10, page = 1, name } = req.query;
        limit = parseInt(limit);
        page = parseInt(page);

        const filter = name ? { name: { $regex: name } } : {};
        const books = await Book.find(filter).skip((page - 1) * limit).limit(limit);

        res.json(books);
    } catch (err) {
        next({ status: 500, message: err.message });
    }
};

const getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return next({ status: 404, message: "ספר לא נמצא" });
        }
        res.json(book);
    } catch (err) {
        next({ status: 400, message: "מזהה ספר לא תקין" });
    }
};

const updateBook = async (req, res, next) => {
    try {
        const { is_borrowed, borrowing_info, ...updateData } = req.body;

        const book = await Book.findByIdAndUpdate(req.params.id, updateData, {
            returnDocument: 'after',
            runValidators: true
        });

        if (!book) {
            return next({ status: 404, message: "ספר לא נמצא" });
        }
        res.json(book);
    } catch (err) {
        next({ status: 400, message: err.message });
    }
};

const borrowBook = async (req, res, next) => {
    try {
        const { userCode } = req.body;

        const book = await Book.findById(req.params.id);
        if (!book) {
            return next({ status: 404, message: "ספר לא נמצא" });
        }

        const user = db.users.find(u => u.code === userCode);
        if (!user) {
            return next({ status: 404, message: "משתמש לא נמצא" });
        }

        if (book.is_borrowed) {
            return next({ status: 400, message: "הספר כבר מושאל, לא ניתן לבצע השאלה" });
        }

        book.is_borrowed = true;
        book.borrowing_info.push({ borrow_date: req.currentDate, customer_code: userCode });
        await book.save();

        user.borrowed_books.push(book._id.toString());

        res.json({ book, user });
    } catch (err) {
        next({ status: 400, message: err.message });
    }
};

const returnBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return next({ status: 404, message: "ספר לא נמצא" });
        }

        if (!book.is_borrowed) {
            return next({ status: 400, message: "הספר אינו מושאל" });
        }

        book.is_borrowed = false;
        await book.save();

        const id = book._id.toString();
        const user = db.users.find(u => u.borrowed_books.includes(id));
        if (user) {
            user.borrowed_books = user.borrowed_books.filter(c => c !== id);
        }

        res.json({ book, user });
    } catch (err) {
        next({ status: 400, message: err.message });
    }
};

const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return next({ status: 404, message: "ספר לא נמצא" });
        }
        res.json({ message: "הספר נמחק בהצלחה" });
    } catch (err) {
        next({ status: 400, message: err.message });
    }
};

const addBook = async (req, res, next) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (err) {
        next({ status: 400, message: err.message });
    }
};

module.exports = { getAllBooks, getBookById, updateBook, borrowBook, returnBook, deleteBook, addBook };
