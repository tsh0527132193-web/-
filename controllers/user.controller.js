const db = require('../db');

const signUp = (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return next({ status: 400, message: "חובה למלא שם משתמש, אימייל וסיסמה" });
    }

    if (db.users.some(u => u.email === email)) {
        return next({ status: 409, message: "משתמש עם אימייל זה כבר קיים" });
    }

    const code = db.users.length ? Math.max(...db.users.map(u => u.code)) + 1 : 1;
    const newUser = { code, username, email, password, borrowed_books: [] };
    db.users.push(newUser);

    res.status(201).json(newUser);
};

const signIn = (req, res, next) => {
    const { email, password } = req.body;

    const user = db.users.find(u => u.email === email && u.password === password);

    if (!user) {
        return next({ status: 401, message: "אימייל או סיסמה שגויים" });
    }

    res.json(user);
};

const getAllUsers = (req, res, next) => {
    res.json(db.users);
};

module.exports = { signUp, signIn, getAllUsers };
