const { response } = require("express");
const User = require('../models/Users');
const bcrypt = require('bcryptjs');


const createUser = async( req, res = response )=>{

    const { email, password } = req.body;

    try {

        const isEmail = await User.findOne( { email } );
        console.log({isEmail})

        if( isEmail ){ 
            return res.status(400).json({
                ok:false,
                msg:'The email already exists',
            })
        }

const user = new User( req.body );

const salt = bcrypt.genSaltSync();

user.password = bcrypt.hashSync( password, salt );

await user.save();
return res.status(200).json({
    ok:true,
    user
    
})





        
    } catch (error) {

        return res.status(500).json({
            ok:false,
            msg:'Talk to the administrator',
        
        })
    }

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