const { response } = require("express");
const { validationResult } = require("express-validator");


const createUser = async( req, res = response )=>{

    const { email, password } = req.body;

   return res.json({
        ok:true,
        msg:'newUser',
        email,
        password
    })
};

const loginUser = async( req, res = response )=>{

    const errors = validationResult( req );

    if( !errors.isEmpty() ){

        return res.status(400).json({
            ok:false,
            errors:errors.mapped(),
        })
    }
   
    const { email, password } = req.body;

    return res.json({
        ok:true,
        msg:'login user',
    })
};

const renewToken = async( req, res = response )=>{

    res.json({
        ok:true,
        msg:'renewToken',
    })
};

module.exports = {

    createUser,
    loginUser,
    renewToken,


}