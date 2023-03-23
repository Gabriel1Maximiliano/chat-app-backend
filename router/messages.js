

const { Router } = require('express');
const getChat = require('../controllers/getChat');
const validateJwt = require('../middlewares/validateJwt');

const router = Router();

router.get('/getCaht/:from',validateJwt,getChat)

module.exports = router;

