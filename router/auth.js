/**
 * path:
 */

const { Router } = require('express');

const router = Router();

router.post('/newUser', (req,res)=>{

    res.json({
        ok:true,
        msg:'newUser',
    })
});

router.post('/loginUser', (req,res)=>{

    res.json({
        ok:true,
        msg:'loginUser',
    })
});

router.get('/renewToken', (req,res)=>{

    res.json({
        ok:true,
        msg:'renewToken',
    })
})
module.exports = router;