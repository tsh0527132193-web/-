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
const checkAuth = require('../middlewares/checkAuth.middleware');

const router = express.Router();

router.post('/', checkAuth, addBook);
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.put('/:id', checkAuth, updateBook);
router.post('/:id/borrow', checkAuth, borrowBook);
router.patch('/:id/return', checkAuth, returnBook);
router.delete('/:id', checkAuth, deleteBook);


module.exports = router;
