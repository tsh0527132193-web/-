const express = require('express');
const { signUp, signIn, getAllUsers } = require('../controllers/user.controller');

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.get('/', getAllUsers);

module.exports = router;
