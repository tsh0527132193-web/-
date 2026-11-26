const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number },
    categories: [String],
    author: {
        name: { type: String },
        phone: { type: String },
        email: { type: String }
    },
    is_borrowed: { type: Boolean, default: false },
    borrowing_info: [{
        borrow_date: { type: Date },
        customer_code: { type: String }
    }]
});

const Book = model('Book', bookSchema);

module.exports = Book;
