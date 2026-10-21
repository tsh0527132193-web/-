const books = [
    {
        code: 101,
        name: "שם הספר לדוגמה",
        category: "קודש / היסטוריה",
        price: 85,
        is_borrowed: false,
        questions: [],
        borrowing_info: [
            {
                borrow_date: "2026-10-08",
                customer_code: 555
            }
        ]
    }
];

// --- סעיף 6: מערך משתמשים ---
const users = [
    {
        code: 555,
        username: "sara",
        email: "sara@example.com",
        password: "1234",
        borrowed_books: [] // קודים של ספרים מושאלים
    }
];

module.exports = { books, users };
