const express = require('express');
const {
    getAllBooks,
    getBookByCode,
    updateBook,
    borrowBook,
    returnBook,
    deleteBook
} = require('../controllers/book.controller');

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:code', getBookByCode);
router.put('/:code', updateBook);
router.post('/:code/borrow', borrowBook);
router.patch('/:code/return', returnBook);
router.delete('/:code', deleteBook);

module.exports = router;
