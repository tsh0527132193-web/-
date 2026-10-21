const db = require('../db');

const signUp = (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "חובה למלא שם משתמש, אימייל וסיסמה" });
    }

    if (db.users.some(u => u.email === email)) {
        return res.status(409).json({ message: "משתמש עם אימייל זה כבר קיים" });
    }

    const code = db.users.length ? Math.max(...db.users.map(u => u.code)) + 1 : 1;
    const newUser = { code, username, email, password, borrowed_books: [] };
    db.users.push(newUser);

    res.status(201).json(newUser);
};

const signIn = (req, res) => {
    const { email, password } = req.body;

    const user = db.users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "אימייל או סיסמה שגויים" });
    }

    res.json(user);
};

const getAllUsers = (req, res) => {
    res.json(db.users);
};

module.exports = { signUp, signIn, getAllUsers };
