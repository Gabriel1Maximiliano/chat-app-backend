const { response } = require("express");



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