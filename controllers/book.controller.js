const db = require('../db');

const getAllBooks = (req, res) => {
    let { limit = 10, page = 1, name } = req.query;

    limit = parseInt(limit);
    page = parseInt(page);

    let filteredBooks = db.books;

    if (name) {
        filteredBooks = filteredBooks.filter(book => book.name.includes(name));
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    res.json(filteredBooks.slice(startIndex, endIndex));
};

const getBookByCode = (req, res) => {
    const code = parseInt(req.params.code);
    const book = db.books.find(b => b.code === code);

    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: "ספר לא נמצא" });
    }
};

const updateBook = (req, res) => {
    const code = parseInt(req.params.code);
    const updateData = req.body;

    const bookIndex = db.books.findIndex(b => b.code === code);

    if (bookIndex === -1) {
        return res.status(404).json({ message: "ספר לא נמצא" });
    }

    db.books[bookIndex] = {
        ...db.books[bookIndex],
        ...updateData,
        is_borrowed: db.books[bookIndex].is_borrowed,
        borrowing_info: db.books[bookIndex].borrowing_info
    };

    res.json(db.books[bookIndex]);
};

const borrowBook = (req, res) => {
    const code = parseInt(req.params.code);
    const { userCode } = req.body;

    const book = db.books.find(b => b.code === code);
    if (!book) {
        return res.status(404).json({ message: "ספר לא נמצא" });
    }

    const user = db.users.find(u => u.code === userCode);
    if (!user) {
        return res.status(404).json({ message: "משתמש לא נמצא" });
    }

    if (book.is_borrowed) {
        return res.status(400).json({ message: "הספר כבר מושאל, לא ניתן לבצע השאלה" });
    }

    book.is_borrowed = true;
    book.borrowing_info.push({
        borrow_date: new Date().toLocaleDateString(),
        customer_code: userCode
    });

    user.borrowed_books.push(book.code);

    res.json({ book, user });
};

const returnBook = (req, res) => {
    const code = parseInt(req.params.code);

    const book = db.books.find(b => b.code === code);
    if (!book) {
        return res.status(404).json({ message: "ספר לא נמצא" });
    }

    if (!book.is_borrowed) {
        return res.status(400).json({ message: "הספר אינו מושאל" });
    }

    book.is_borrowed = false;

    const user = db.users.find(u => u.borrowed_books.includes(code));
    if (user) {
        user.borrowed_books = user.borrowed_books.filter(c => c !== code);
    }

    res.json({ book, user });
};

const deleteBook = (req, res) => {
    const code = parseInt(req.params.code);
    const bookIndex = db.books.findIndex(b => b.code === code);

    if (bookIndex === -1) {
        return res.status(404).json({ message: "ספר לא נמצא" });
    }

    db.books.splice(bookIndex, 1);

    res.json({ message: "הספר נמחק בהצלחה" });
};

module.exports = { getAllBooks, getBookByCode, updateBook, borrowBook, returnBook, deleteBook };
