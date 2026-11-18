const User = require('../models/user.model');

const signUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return next({ status: 400, message: "חובה למלא שם משתמש, אימייל וסיסמה" });
        }

        const exists = await User.findOne({ email });
        if (exists) {
            return next({ status: 409, message: "משתמש עם אימייל זה כבר קיים" });
        }

        const newUser = await User.create({ username, email, password });
        res.status(201).json(newUser);
    } catch (err) {
        next({ status: 400, message: err.message });
    }
};

const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next({ status: 400, message: "חובה למלא אימייל וסיסמה" });
        }

        const user = await User.login(email, password);
        if (!user) {
            return next({ status: 401, message: "אימייל או סיסמה שגויים" });
        }

        res.json(user);
    } catch (err) {
        next({ status: 500, message: err.message });
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        next({ status: 500, message: err.message });
    }
};

module.exports = { signUp, signIn, getAllUsers };
