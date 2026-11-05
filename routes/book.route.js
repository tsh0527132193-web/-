const express = require('express');
const {
    getAllBooks,
    getBookById,
    updateBook,
    borrowBook,
    returnBook,
    deleteBook,
    addBook
} = require('../controllers/book.controller');

const router = express.Router();

router.post('/', addBook);
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.post('/:id/borrow', borrowBook);
router.patch('/:id/return', returnBook);
router.delete('/:id', deleteBook);

module.exports = router;
