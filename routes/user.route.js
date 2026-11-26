const express = require('express');
const { signUp, signIn, getAllUsers, updateUser } = require('../controllers/user.controller');
const checkAuth = require('../middlewares/checkAuth.middleware');
const checkAdmin = require('../middlewares/checkAdmin.middleware');


const router = express.Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.get('/', checkAuth, checkAdmin, getAllUsers);
router.put('/:id', checkAuth, updateUser);
module.exports = router;
