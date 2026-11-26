const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');

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
        const token = generateToken(newUser);
        res.status(201).json({ user: newUser, token });
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

        const token = generateToken(user);
        res.json({ user, token });
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

const updateUser = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            return next({ status: 403, message: "ניתן לעדכן רק את המשתמש שלך" });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return next({ status: 404, message: "משתמש לא נמצא" });
        }

        const { username, email, password } = req.body;
        if (username) user.username = username;
        if (email) user.email = email;
        if (password) user.password = password;

        await user.save();
        res.json(user);
    } catch (err) {
        next({ status: 400, message: err.message });
    }
};

module.exports = { signUp, signIn, getAllUsers, updateUser };
