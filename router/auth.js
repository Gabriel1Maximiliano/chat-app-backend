/**
 * path:api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, renewToken, loginUser } = require('../controllers/auth');

const router = Router();

router.post('/newUser', createUser)

router.post('/loginUser',[
    check('email','The name is required').isEmail(),
    check('password','The password is required').not().isEmpty(),
] ,loginUser );

router.get('/renewToken', renewToken);





module.exports = router;