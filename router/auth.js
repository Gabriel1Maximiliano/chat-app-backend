/**
 * path:api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, renewToken, loginUser } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');
const validateJwt = require('../middlewares/validateJwt')

const router = Router();
 
router.post('/newUser',[
    check('name','The name is required').not().isEmpty(),
    check('name','At least 2 characters in name field').isLength({ min: 2 }),
    check('email','The name is required').isEmail(),
    check('password','The password is required').not().isEmpty(),
    check('password','At least 3 characters').isLength({ min: 3 }),
    validateFields 
] ,createUser)

router.post('/loginUser',[
    check('email','The name is required').isEmail(),
    check('password','The password is required').not().isEmpty(),
    check('password','At least 3 characters').isLength({ min: 3 }),
    validateFields
] ,loginUser );

router.get('/renewToken', validateJwt , renewToken);





module.exports = router;